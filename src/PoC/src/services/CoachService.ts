import { CoachResponseDTO, CreateCoachDTO, UpdateCoachDTO } from '../dtos/CoachDTO';
import { AuthService } from './AuthService';
import { ExceptionHandler } from '../middleware/ExceptionHandler';
import { LoggingService } from '../logging/LoggingService';

export interface CoachSearchFilters {
  specialties?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  isOnline?: boolean;
  availability?: {
    date: string;
    timeSlot?: string;
  };
  languages?: string[];
}

export class CoachService {
  private static instance: CoachService;
  private baseUrl = '/api/coaches';
  private authService = AuthService.getInstance();
  private exceptionHandler = ExceptionHandler.getInstance();
  private logger = LoggingService.getInstance();

  static getInstance(): CoachService {
    if (!CoachService.instance) {
      CoachService.instance = new CoachService();
    }
    return CoachService.instance;
  }

  private getAuthHeaders() {
    const token = this.authService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async searchCoaches(filters: CoachSearchFilters): Promise<CoachResponseDTO[]> {
    const queryParams = new URLSearchParams();
    
    if (filters.specialties?.length) {
      queryParams.append('specialties', filters.specialties.join(','));
    }
    if (filters.priceRange) {
      queryParams.append('minPrice', filters.priceRange.min.toString());
      queryParams.append('maxPrice', filters.priceRange.max.toString());
    }
    if (filters.rating) {
      queryParams.append('minRating', filters.rating.toString());
    }
    if (filters.isOnline !== undefined) {
      queryParams.append('isOnline', filters.isOnline.toString());
    }
    if (filters.languages?.length) {
      queryParams.append('languages', filters.languages.join(','));
    }

    const response = await fetch(`${this.baseUrl}/search?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to search coaches');
    }

    return response.json();
  }

  async getCoachById(id: string): Promise<CoachResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get coach');
    }

    return response.json();
  }

  async createCoachProfile(coachData: CreateCoachDTO): Promise<CoachResponseDTO> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      throw new Error('Failed to create coach profile');
    }

    return response.json();
  }

  async updateCoachProfile(id: string, updates: UpdateCoachDTO): Promise<CoachResponseDTO> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update coach profile');
    }

    return response.json();
  }

  async getOnlineCoaches(): Promise<CoachResponseDTO[]> {
    return this.searchCoaches({ isOnline: true });
  }

  async toggleOnlineStatus(isOnline: boolean): Promise<void> {
    const response = await fetch(`${this.baseUrl}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ isOnline }),
    });

    if (!response.ok) {
      throw new Error('Failed to update online status');
    }
  }
}