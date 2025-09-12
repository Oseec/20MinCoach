export interface ErrorResponse {
  message: string;
  code: string;
  details?: any;
  timestamp: string;
}

export class ErrorMiddleware {
  static handleApiError(error: any): ErrorResponse {
    const timestamp = new Date().toISOString();

    // Network errors
    if (!navigator.onLine) {
      return {
        message: 'Sin conexión a internet. Verifica tu conexión.',
        code: 'NETWORK_ERROR',
        timestamp,
      };
    }

    // HTTP errors
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 400:
          return {
            message: 'Datos inválidos en la solicitud.',
            code: 'BAD_REQUEST',
            details: error.response.data,
            timestamp,
          };
        
        case 401:
          return {
            message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
            code: 'UNAUTHORIZED',
            timestamp,
          };
        
        case 403:
          return {
            message: 'No tienes permisos para realizar esta acción.',
            code: 'FORBIDDEN',
            timestamp,
          };
        
        case 404:
          return {
            message: 'Recurso no encontrado.',
            code: 'NOT_FOUND',
            timestamp,
          };
        
        case 409:
          return {
            message: 'Conflicto con el estado actual del recurso.',
            code: 'CONFLICT',
            details: error.response.data,
            timestamp,
          };
        
        case 422:
          return {
            message: 'Error de validación en los datos enviados.',
            code: 'VALIDATION_ERROR',
            details: error.response.data,
            timestamp,
          };
        
        case 429:
          return {
            message: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.',
            code: 'RATE_LIMIT',
            timestamp,
          };
        
        case 500:
          return {
            message: 'Error interno del servidor. Intenta de nuevo más tarde.',
            code: 'SERVER_ERROR',
            timestamp,
          };
        
        case 503:
          return {
            message: 'Servicio temporalmente no disponible.',
            code: 'SERVICE_UNAVAILABLE',
            timestamp,
          };
        
        default:
          return {
            message: `Error inesperado (${status}). Contacta al soporte.`,
            code: 'UNKNOWN_ERROR',
            details: error.response.data,
            timestamp,
          };
      }
    }

    // Request timeout
    if (error.code === 'ECONNABORTED') {
      return {
        message: 'La solicitud tardó demasiado. Intenta de nuevo.',
        code: 'TIMEOUT',
        timestamp,
      };
    }

    // Generic error
    return {
      message: error.message || 'Error inesperado. Intenta de nuevo.',
      code: 'GENERIC_ERROR',
      details: error,
      timestamp,
    };
  }

  static logError(error: ErrorResponse, context?: string): void {
    console.error(`[${error.timestamp}] ${context || 'Error'}:`, {
      message: error.message,
      code: error.code,
      details: error.details,
    });

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      this.sendToErrorTracking(error, context);
    }
  }

  private static sendToErrorTracking(error: ErrorResponse, context?: string): void {
    // Implementation for error tracking service
    // Example: Sentry.captureException(error);
  }

  static createErrorHandler(context: string) {
    return (error: any) => {
      const errorResponse = this.handleApiError(error);
      this.logError(errorResponse, context);
      return errorResponse;
    };
  }
}