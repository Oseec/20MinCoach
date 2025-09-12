export interface Session {
  id: string;
  clientId: string;
  coachId: string;
  packageId?: string;
  title: string;
  description?: string;
  scheduledAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  duration: number; // minutes
  status: SessionStatus;
  sessionType: SessionType;
  connectionData: SessionConnection;
  notes: SessionNote[];
  recording?: SessionRecording;
  payment: SessionPayment;
  rating?: SessionRating;
  createdAt: Date;
  updatedAt: Date;
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum SessionType {
  INSTANT = 'INSTANT',
  SCHEDULED = 'SCHEDULED'
}

export interface SessionConnection {
  roomId: string;
  joinUrl: string;
  clientToken: string;
  coachToken: string;
  recordingEnabled: boolean;
  maxDuration: number;
}

export interface SessionNote {
  id: string;
  authorId: string;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
}

export interface SessionRecording {
  id: string;
  url: string;
  duration: number;
  size: number;
  isAvailable: boolean;
  expiresAt: Date;
}

export interface SessionPayment {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: PaymentStatus;
  transactionId: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface SessionRating {
  id: string;
  rating: number; // 1-5
  comment?: string;
  ratedBy: string;
  ratedAt: Date;
}