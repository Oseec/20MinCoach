import { LoggingService } from '../services/LoggingService';
import { ExceptionHandler, HandledException } from './ExceptionHandler';

export interface ErrorResponse {
  message: string;
  code: string;
  details?: any;
  timestamp: string;
  correlationId?: string;
}

export class ErrorMiddleware {
  private static instance: ErrorMiddleware;
  private logger: LoggingService;
  private exceptionHandler: ExceptionHandler;

  private constructor() {
    this.logger = LoggingService.getInstance();
    this.exceptionHandler = ExceptionHandler.getInstance();
  }

  static getInstance(): ErrorMiddleware {
    if (!ErrorMiddleware.instance) {
      ErrorMiddleware.instance = new ErrorMiddleware();
    }
    return ErrorMiddleware.instance;
  }
  static handleApiError(error: any, category: string = 'USER', operation: string = 'unknown'): HandledException {
    const instance = ErrorMiddleware.getInstance();
    
    return instance.exceptionHandler.handleException(error, {
      category: category as any,
      operation,
    });
  }

  static logError(error: HandledException | ErrorResponse, context?: string): void {
    const instance = ErrorMiddleware.getInstance();
    
    console.error(`[${error.timestamp}] ${context || 'Error'}:`, {
      message: error.message,
      code: error.code,
      details: error.details,
      correlationId: 'correlationId' in error ? error.correlationId : undefined,
    });

    // Already logged through ExceptionHandler, no need to log again
  }

  static createErrorHandler(context: string, category: string = 'USER') {
    return (error: any) => {
      const errorResponse = this.handleApiError(error, category, context);
      this.logError(errorResponse, context);
      return errorResponse;
    };
  }
}