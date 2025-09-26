import { LoggingService } from '../logging/LoggingService';

// Utility functions for common logging patterns
export const loggerUtils = {
  // User journey logging
  trackUserJourney: (step: string, metadata?: any) => {
    const logger = LoggingService.getInstance();
    logger.logUser(`journey_${step}`, 'INFO');
    
    if (metadata) {
      console.debug(`User Journey: ${step}`, metadata);
    }
  },

  // Performance logging
  trackPerformance: (operation: string, startTime: number, metadata?: any) => {
    const logger = LoggingService.getInstance();
    const duration = performance.now() - startTime;
    
    logger.logUser('performance_metric', 'DEBUG');
    console.debug(`Performance: ${operation} took ${duration.toFixed(2)}ms`, metadata);
  },

  // Business metrics logging
  trackBusinessMetric: (metric: string, value: number, category: 'SESSION' | 'PAYMENT' | 'COACH' | 'USER' = 'USER') => {
    const logger = LoggingService.getInstance();
    
    switch (category) {
      case 'SESSION':
        logger.logSession(`metric_${metric}`, 'INFO');
        break;
      case 'PAYMENT':
        // This would be handled through specific payment logging
        break;
      case 'COACH':
        logger.logCoach(`metric_${metric}`, 'INFO');
        break;
      default:
        logger.logUser(`metric_${metric}`, 'INFO');
    }
    
    console.debug(`Business Metric: ${metric} = ${value}`);
  },

  // Error context enhancement
  enrichErrorContext: (error: Error, context: Record<string, any>): Error => {
    const enrichedError = new Error(error.message);
    enrichedError.name = error.name;
    enrichedError.stack = error.stack;
    
    // Add context to error for better debugging
    (enrichedError as any).context = context;
    
    return enrichedError;
  },

  // Create performance wrapper for functions
  withPerformanceLogging: <T extends (...args: any[]) => any>(
    fn: T,
    operationName: string
  ): T => {
    return ((...args: any[]) => {
      const startTime = performance.now();
      const result = fn(...args);
      
      // Handle both sync and async functions
      if (result instanceof Promise) {
        return result.finally(() => {
          loggerUtils.trackPerformance(operationName, startTime);
        });
      } else {
        loggerUtils.trackPerformance(operationName, startTime);
        return result;
      }
    }) as T;
  },
};

export default loggerUtils;