export interface CreateSessionDTO {
  coachId: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  sessionType: 'INSTANT' | 'SCHEDULED';
  packageId?: string;
}

export interface UpdateSessionDTO {
  title?: string;
  description?: string;
  scheduledAt?: string;
  status?: 'SCHEDULED' | 'WAITING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export interface SessionResponseDTO {
  id: string;
  clientId: string;
  coachId: string;
  title: string;
  description?: string;
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  duration: number;
  status: string;
  sessionType: string;
  connectionData?: SessionConnectionDTO;
  rating?: SessionRatingDTO;
  createdAt: string;
}

export interface SessionConnectionDTO {
  roomId: string;
  joinUrl: string;
  token: string;
  maxDuration: number;
}

export interface SessionRatingDTO {
  rating: number;
  comment?: string;
  ratedAt: string;
}

export interface CreateRatingDTO {
  sessionId: string;
  rating: number;
  comment?: string;
}