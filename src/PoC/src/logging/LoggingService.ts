import {
  LogEntry,
  LogLevel,
  LogCategory,
  LoggerConfig,
  PaymentLog,
  MatchingLog,
  VideoLog,
  SecurityLog,
  StandardLog,
} from './LogTypes';

export class LoggingService {
  private static instance: LoggingService;
  private config: LoggerConfig;
  private logBuffer: LogEntry[] = [];
  private flushTimer?: number;

  private constructor(config: LoggerConfig) {
    this.config = config;
    this.startFlushTimer();
  }

  static getInstance(config?: LoggerConfig): LoggingService {
    if (!LoggingService.instance) {
      const defaultConfig: LoggerConfig = {
        environment: 'development',
        batchSize: 100,
        flushInterval: 5000, // 5 seconds
        enableConsole: true,
      };
      LoggingService.instance = new LoggingService(config || defaultConfig);
    }
    return LoggingService.instance;
  }

  private createBaseLog(
    level: LogLevel,
    category: LogCategory,
    event_type: string,
    type_info: Record<string, any> = {}
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      category,
      event_type,
      location: this.getLocation(),
      type_info,
    } as LogEntry;
  }

  private getLocation(): string {
    // In a real app, this would be determined by geolocation or server config
    // For now, return a default location
    return 'CO-BOG'; // Colombia - Bogotá
  }

  // Standard logs (SESSION, USER, COACH)
  logSession(event_type: string, level: LogLevel = 'INFO'): void {
    const log = this.createBaseLog(level, 'SESSION', event_type) as StandardLog;
    this.addLog(log);
  }

  logUser(event_type: string, level: LogLevel = 'INFO'): void {
    const log = this.createBaseLog(level, 'USER', event_type) as StandardLog;
    this.addLog(log);
  }

  logCoach(event_type: string, level: LogLevel = 'INFO'): void {
    const log = this.createBaseLog(level, 'COACH', event_type) as StandardLog;
    this.addLog(log);
  }

  // Complex logs
  logPayment(
    event_type: string,
    paymentInfo: PaymentLog['type_info'],
    level: LogLevel = 'INFO'
  ): void {
    const log: PaymentLog = {
      ...this.createBaseLog(level, 'PAYMENT', event_type),
      category: 'PAYMENT',
      type_info: paymentInfo,
    };
    this.addLog(log);
  }

  logMatching(
    event_type: string,
    matchingInfo: MatchingLog['type_info'],
    level: LogLevel = 'DEBUG'
  ): void {
    const log: MatchingLog = {
      ...this.createBaseLog(level, 'MATCHING', event_type),
      category: 'MATCHING',
      type_info: matchingInfo,
    };
    this.addLog(log);
  }

  logVideo(
    event_type: string,
    videoInfo: VideoLog['type_info'],
    level: LogLevel = 'INFO'
  ): void {
    const log: VideoLog = {
      ...this.createBaseLog(level, 'VIDEO', event_type),
      category: 'VIDEO',
      type_info: videoInfo,
    };
    this.addLog(log);
  }

  logSecurity(
    event_type: string,
    securityInfo: SecurityLog['type_info'],
    level: LogLevel = 'WARN'
  ): void {
    const log: SecurityLog = {
      ...this.createBaseLog(level, 'SECURITY', event_type),
      category: 'SECURITY',
      type_info: securityInfo,
    };
    this.addLog(log);
  }

  logError(error: Error, category: LogCategory, context?: string): void {
    const log = this.createBaseLog('ERROR', category, 'error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context: context || 'unknown',
      error_name: error.name,
    });
    this.addLog(log);
  }

  private addLog(log: LogEntry): void {
    this.logBuffer.push(log);

    // Console logging in development
    if (
      this.config.enableConsole &&
      this.config.environment === 'development'
    ) {
      this.logToConsole(log);
    }

    // Flush if buffer is full
    if (this.logBuffer.length >= this.config.batchSize) {
      this.flush();
    }
  }

  private logToConsole(log: LogEntry): void {
    const logMessage = `[${log.timestamp}] ${log.level} [${log.category}] ${log.event_type}`;

    switch (log.level) {
      case 'ERROR':
        console.error(logMessage, log.type_info);
        break;
      case 'WARN':
        console.warn(logMessage, log.type_info);
        break;
      case 'DEBUG':
        console.debug(logMessage, log.type_info);
        break;
      default:
        console.info(logMessage, log.type_info);
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = window.setInterval(() => {
      if (this.logBuffer.length > 0) {
        this.flush();
      }
    }, this.config.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.logBuffer.length === 0) return;

    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    try {
      await this.sendLogsToBackend(logsToFlush);
    } catch (error) {
      console.error('Failed to send logs to backend:', error);
      // In a real app, you might want to retry or store locally
    }
  }

  private async sendLogsToBackend(logs: LogEntry[]): Promise<void> {
    // In production, this would send to ElasticSearch or your logging endpoint
    if (this.config.environment === 'production') {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send logs: ${response.statusText}`);
      }
    } else {
      // In development, just log to console
      console.group('📊 Batch Logs Flush');
      logs.forEach((log) => this.logToConsole(log));
      console.groupEnd();
    }
  }

  // Utility methods for specific use cases
  logUserLogin(userId: string, method: string): void {
    this.logSecurity('user_login', {
      user_id: userId,
      ip_address: this.getClientIP(),
      user_agent: navigator.userAgent,
      attempt_type: method,
      success: true,
    });
  }

  logUserLogout(userId: string): void {
    this.logUser('user_logout');
  }

  logSessionStart(sessionId: string): void {
    this.logSession('session_started');
  }

  logSessionEnd(sessionId: string, duration: number): void {
    this.logSession('session_ended');
  }

  logCoachAvailabilityChange(coachId: string, isAvailable: boolean): void {
    this.logCoach(`coach_${isAvailable ? 'online' : 'offline'}`);
  }

  private getClientIP(): string {
    // In a real app, this would be determined by the backend or a service
    return 'unknown';
  }

  // Cleanup method
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush(); // Final flush
  }
}
