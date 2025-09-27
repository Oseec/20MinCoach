import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { LoggingService } from '../logging/LoggingService';
import { LoggerConfig } from '../logging/LogTypes';

interface LoggingContextType {
  logger: LoggingService;
}

const LoggingContext = createContext<LoggingContextType | undefined>(undefined);

interface LoggingProviderProps {
  children: ReactNode;
  config?: LoggerConfig;
}

export const LoggingProvider: React.FC<LoggingProviderProps> = ({
  children,
  config,
}) => {
  const logger = LoggingService.getInstance(config);

  useEffect(() => {
    // Log application start
    logger.logUser('app_initialized');

    // Cleanup on unmount
    return () => {
      logger.destroy();
    };
  }, [logger]);

  // Global error handler
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      logger.logError(
        new Error(event.message),
        'USER',
        `Global error at ${event.filename}:${event.lineno}:${event.colno}`
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logger.logError(
        new Error(String(event.reason)),
        'USER',
        'Unhandled promise rejection'
      );
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
    };
  }, [logger]);

  const value: LoggingContextType = {
    logger,
  };

  return (
    <LoggingContext.Provider value={value}>{children}</LoggingContext.Provider>
  );
};

export const useLoggingContext = (): LoggingContextType => {
  const context = useContext(LoggingContext);
  if (context === undefined) {
    throw new Error('useLoggingContext must be used within a LoggingProvider');
  }
  return context;
};
