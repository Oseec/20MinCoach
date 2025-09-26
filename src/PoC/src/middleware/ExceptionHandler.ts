import { LoggingService } from '../logging/LoggingService';
import { LogCategory } from '../logging/LogTypes';

export interface ExceptionContext {
  category: LogCategory;
  operation: string;
  userId?: string;
  sessionId?: string;
  additionalInfo?: Record<string, any>;
}

export interface HandledException {
  message: string;
  code: string;
  details?: any;
  timestamp: string;
  correlationId: string;
}

export class ExceptionHandler {
  private static instance: ExceptionHandler;
  private logger: LoggingService;

  private constructor() {
    this.logger = LoggingService.getInstance();
  }

  static getInstance(): ExceptionHandler {
    if (!ExceptionHandler.instance) {
      ExceptionHandler.instance = new ExceptionHandler();
    }
    return ExceptionHandler.instance;
  }

  handleException(
    error: Error | any,
    context: ExceptionContext
  ): HandledException {
    const correlationId = this.generateCorrelationId();
    const timestamp = new Date().toISOString();

    // Log the exception with appropriate category
    this.logger.logError(error, context.category, JSON.stringify({
      operation: context.operation,
      userId: context.userId,
      sessionId: context.sessionId,
      correlationId,
      ...context.additionalInfo,
    }));

    // Create standardized exception response
    const handledException: HandledException = {
      message: this.getErrorMessage(error, context),
      code: this.getErrorCode(error, context),
      details: this.getErrorDetails(error),
      timestamp,
      correlationId,
    };

    // Log security events for authentication/authorization errors
    if (this.isSecurityRelated(error)) {
      this.logger.logSecurity('security_exception', {
        ip_address: 'unknown', // Would be provided by backend
        user_agent: navigator.userAgent,
        attempt_type: context.operation,
        success: false,
        user_id: context.userId,
      });
    }

    return handledException;
  }

  // Specific handlers for different types of operations
  handleSessionException(error: Error, sessionId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'SESSION',
      operation,
      sessionId,
    });
  }

  handlePaymentException(error: Error, userId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'PAYMENT',
      operation,
      userId,
    });
  }

  handleVideoException(error: Error, sessionId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'VIDEO',
      operation,
      sessionId,
    });
  }

  handleMatchingException(error: Error, userId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'MATCHING',
      operation,
      userId,
    });
  }

  handleUserException(error: Error, userId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'USER',
      operation,
      userId,
    });
  }

  handleCoachException(error: Error, coachId: string, operation: string): HandledException {
    return this.handleException(error, {
      category: 'COACH',
      operation,
      userId: coachId,
    });
  }

  // Error classification and message generation
  private getErrorMessage(error: any, context: ExceptionContext): string {
    // Network errors
    if (!navigator.onLine) {
      return 'Sin conexión a internet. Verifica tu conexión y vuelve a intentar.';
    }

    // HTTP errors
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 400:
          return this.getBadRequestMessage(context);
        case 401:
          return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        case 403:
          return 'No tienes permisos para realizar esta acción.';
        case 404:
          return this.getNotFoundMessage(context);
        case 409:
          return this.getConflictMessage(context);
        case 422:
          return 'Los datos proporcionados no son válidos. Revisa la información e intenta nuevamente.';
        case 429:
          return 'Demasiadas solicitudes. Por favor, espera unos momentos antes de intentar de nuevo.';
        case 500:
          return 'Error interno del servidor. Nuestro equipo ha sido notificado.';
        case 503:
          return 'El servicio está temporalmente no disponible. Intenta más tarde.';
        default:
          return `Error inesperado (${status}). Si el problema persiste, contacta al soporte.`;
      }
    }

    // Timeout errors
    if (error.code === 'ECONNABORTED') {
      return 'La operación tardó demasiado tiempo. Verifica tu conexión e intenta nuevamente.';
    }

    // Category-specific error messages
    return this.getCategorySpecificMessage(error, context);
  }

  private getErrorCode(error: any, context: ExceptionContext): string {
    const prefix = context.category.toLowerCase();
    
    if (!navigator.onLine) return `${prefix}_network_error`;
    if (error.response) return `${prefix}_http_${error.response.status}`;
    if (error.code === 'ECONNABORTED') return `${prefix}_timeout`;
    
    return `${prefix}_${error.name?.toLowerCase() || 'unknown'}_error`;
  }

  private getErrorDetails(error: any): any {
    if (error.response?.data) {
      return error.response.data;
    }
    
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  private isSecurityRelated(error: any): boolean {
    const securityStatuses = [401, 403];
    return error.response && securityStatuses.includes(error.response.status);
  }

  private getBadRequestMessage(context: ExceptionContext): string {
    switch (context.category) {
      case 'SESSION':
        return 'Los datos de la sesión no son válidos. Verifica la información e intenta nuevamente.';
      case 'PAYMENT':
        return 'La información de pago no es válida. Revisa los datos e intenta nuevamente.';
      case 'USER':
        return 'Los datos del usuario no son válidos. Completa correctamente el formulario.';
      case 'COACH':
        return 'Los datos del coach no son válidos. Revisa la información del perfil.';
      default:
        return 'Los datos enviados no son válidos. Revisa la información e intenta nuevamente.';
    }
  }

  private getNotFoundMessage(context: ExceptionContext): string {
    switch (context.category) {
      case 'SESSION':
        return 'La sesión solicitada no fue encontrada o ya no está disponible.';
      case 'COACH':
        return 'El coach solicitado no fue encontrado o no está disponible.';
      case 'USER':
        return 'El usuario no fue encontrado.';
      default:
        return 'El recurso solicitado no fue encontrado.';
    }
  }

  private getConflictMessage(context: ExceptionContext): string {
    switch (context.category) {
      case 'SESSION':
        return 'Ya tienes una sesión activa. Finaliza la sesión actual antes de iniciar una nueva.';
      case 'COACH':
        return 'El coach ya está ocupado en otra sesión.';
      default:
        return 'Conflicto con el estado actual. Actualiza la página e intenta nuevamente.';
    }
  }

  private getCategorySpecificMessage(error: any, context: ExceptionContext): string {
    switch (context.category) {
      case 'VIDEO':
        return 'Error en la conexión de video. Verifica tu cámara, micrófono y conexión a internet.';
      case 'PAYMENT':
        return 'Error procesando el pago. Verifica tu método de pago e intenta nuevamente.';
      case 'MATCHING':
        return 'No pudimos encontrar un coach disponible en este momento. Intenta más tarde.';
      default:
        return error.message || 'Ha ocurrido un error inesperado. Intenta nuevamente.';
    }
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Async wrapper for promises
  async handleAsync<T>(
    operation: () => Promise<T>,
    context: ExceptionContext
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      const handledException = this.handleException(error, context);
      throw handledException;
    }
  }

  // Wrapper for synchronous operations
  handleSync<T>(
    operation: () => T,
    context: ExceptionContext
  ): T {
    try {
      return operation();
    } catch (error) {
      const handledException = this.handleException(error, context);
      throw handledException;
    }
  }
}