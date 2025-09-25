import { useCallback } from 'react';
import { LoggingService } from '../services/LoggingService';
import { ExceptionHandler } from '../middleware/ExceptionHandler';
import { LogCategory } from '../types/LogTypes';

export const useLogger = () => {
  const logger = LoggingService.getInstance();
  const exceptionHandler = ExceptionHandler.getInstance();

  const logUserAction = useCallback((action: string, details?: any) => {
    logger.logUser(action);
    if (details) {
      console.debug(`User action: ${action}`, details);
    }
  }, [logger]);

  const logCoachAction = useCallback((action: string, details?: any) => {
    logger.logCoach(action);
    if (details) {
      console.debug(`Coach action: ${action}`, details);
    }
  }, [logger]);

  const logSessionEvent = useCallback((event: string, details?: any) => {
    logger.logSession(event);
    if (details) {
      console.debug(`Session event: ${event}`, details);
    }
  }, [logger]);

  const handleError = useCallback((
    error: Error,
    category: LogCategory,
    operation: string,
    userId?: string,
    sessionId?: string
  ) => {
    return exceptionHandler.handleException(error, {
      category,
      operation,
      userId,
      sessionId,
    });
  }, [exceptionHandler]);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    category: LogCategory,
    operationName: string,
    userId?: string,
    sessionId?: string
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      const handledException = exceptionHandler.handleException(error as Error, {
        category,
        operation: operationName,
        userId,
        sessionId,
      });
      throw handledException;
    }
  }, [exceptionHandler]);

  return {
    logUserAction,
    logCoachAction,
    logSessionEvent,
    handleError,
    handleAsyncOperation,
    logger,
    exceptionHandler,
  };
};