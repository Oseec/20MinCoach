import { 
  CreateSessionDTO, 
  SessionResponseDTO, 
  UpdateSessionDTO,
  CreateRatingDTO 
} from '../dtos/SessionDTO';
import { AuthService } from './AuthService';

export class SessionService {
  private static instance: SessionService;
  private baseUrl = '/api/sessions';
  private authService = AuthService.getInstance();

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
      'Authorization': `Bearer ${token}`,
    };
  }

  async createSession(sessionData: CreateSessionDTO): Promise<SessionResponseDTO> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    return response.json();
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

  async updateSession(id: string, updates: UpdateSessionDTO): Promise<SessionResponseDTO> {
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
    const response = await fetch(`${this.baseUrl}/${id}/join`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to join session');
    }

    return response.json();
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

  async cancelSession(id: string, reason?: string): Promise<SessionResponseDTO> {
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