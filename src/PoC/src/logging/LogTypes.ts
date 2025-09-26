export type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

export type LogCategory = 'SESSION' | 'PAYMENT' | 'USER' | 'COACH' | 'MATCHING' | 'VIDEO' | 'SECURITY';

export interface BaseLog {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  event_type: string;
  location: string;
  type_info: Record<string, any>;
}

export interface StandardLog extends BaseLog {
  type_info: {};
}

export interface PaymentLog extends BaseLog {
  category: 'PAYMENT';
  type_info: {
    user_id: string;
    package_type: string;
    amount: number;
    currency: string;
    payment_method: string;
    transaction_id: string;
    remaining_sessions: number;
    country: string;
  };
}

export interface MatchingLog extends BaseLog {
  category: 'MATCHING';
  type_info: {
    user_id: string;
    requested_specialty: string;
    matched_coaches: string[];
    matched_coach: string;
    matching_duration_ms: number;
    matching_criteria: {
      rating: number;
      proximity: number;
      response_time: number;
    };
  };
}

export interface VideoLog extends BaseLog {
  category: 'VIDEO';
  type_info: {
    session_id: string;
    metrics: {
      bitrate_kbps: number;
      packet_loss: number;
      jitter_ms: number;
      resolution: string;
      audio_level: number;
    };
    participants: string[];
  };
}

export interface SecurityLog extends BaseLog {
  category: 'SECURITY';
  type_info: {
    user_id?: string;
    ip_address: string;
    user_agent: string;
    attempt_type: string;
    success: boolean;
    risk_score?: number;
  };
}

export type ComplexLog = PaymentLog | MatchingLog | VideoLog | SecurityLog;
export type LogEntry = StandardLog | ComplexLog;

export interface LoggerConfig {
  environment: 'development' | 'production' | 'test';
  batchSize: number;
  flushInterval: number;
  enableConsole: boolean;
  elasticsearchEndpoint?: string;
  s3Config?: {
    bucket: string;
    region: string;
  };
}