import {
  CreateSessionDTO,
  SessionResponseDTO,
  UpdateSessionDTO,
  CreateRatingDTO,
} from '../dtos/SessionDTO';
import { AuthService } from './AuthService';
import { ExceptionHandler } from '../exceptionHandling/ExceptionHandler';
import { LoggingService } from '../logging/LoggingService';

export class SessionService {
  private static instance: SessionService;
  private baseUrl = '/api/sessions';
  private authService = AuthService.getInstance();
  private exceptionHandler = ExceptionHandler.getInstance();
  private logger = LoggingService.getInstance();

  static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  private getAuthHeaders() {
    const token = this.authService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  async createSession(
    sessionData: CreateSessionDTO
  ): Promise<SessionResponseDTO> {
    try {
      this.logger.logSession('session_creation_attempt');

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to create session`);
      }

      const result = await response.json();
      this.logger.logSession('session_created');

      return result;
    } catch (error) {
      throw this.exceptionHandler.handleSessionException(
        error as Error,
        sessionData.coachId || 'unknown',
        'create_session'
      );
    }
  }

  async getSessionById(id: string): Promise<SessionResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get session');
    }

    return response.json();
  }

  async getUserSessions(): Promise<SessionResponseDTO[]> {
    const response = await fetch(`${this.baseUrl}/user`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get user sessions');
    }

    return response.json();
  }

  async updateSession(
    id: string,
    updates: UpdateSessionDTO
  ): Promise<SessionResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update session');
    }

    return response.json();
  }

  async joinSession(id: string): Promise<{ joinUrl: string; token: string }> {
    try {
      this.logger.logSession('session_join_attempt');

      const response = await fetch(`${this.baseUrl}/${id}/join`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to join session`);
      }

      const result = await response.json();
      this.logger.logSession('session_joined');

      return result;
    } catch (error) {
      throw this.exceptionHandler.handleSessionException(
        error as Error,
        id,
        'join_session'
      );
    }
  }

  async endSession(id: string): Promise<SessionResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}/end`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to end session');
    }

    return response.json();
  }

  async cancelSession(
    id: string,
    reason?: string
  ): Promise<SessionResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}/cancel`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel session');
    }

    return response.json();
  }

  async rateSession(ratingData: CreateRatingDTO): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) {
      throw new Error('Failed to rate session');
    }
  }
}
