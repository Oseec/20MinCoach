export interface CreateCoachDTO {
  bio: string;
  headline: string;
  specialties: string[];
  experience: number;
  pricePerSession: number;
  availability: AvailabilityDTO;
  certifications?: CertificationDTO[];
  languages: string[];
  education?: EducationDTO[];
}

export interface UpdateCoachDTO {
  bio?: string;
  headline?: string;
  specialties?: string[];
  experience?: number;
  pricePerSession?: number;
  availability?: AvailabilityDTO;
  status?: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'AWAY';
}

export interface AvailabilityDTO {
  timezone: string;
  weeklySchedule: WeeklyScheduleDTO;
  instantAvailable: boolean;
}

export interface WeeklyScheduleDTO {
  monday: TimeSlotDTO[];
  tuesday: TimeSlotDTO[];
  wednesday: TimeSlotDTO[];
  thursday: TimeSlotDTO[];
  friday: TimeSlotDTO[];
  saturday: TimeSlotDTO[];
  sunday: TimeSlotDTO[];
}

export interface TimeSlotDTO {
  startTime: string;
  endTime: string;
}

export interface CertificationDTO {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  certificateUrl?: string;
}

export interface EducationDTO {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

export interface CoachResponseDTO {
  id: string;
  userId: string;
  bio: string;
  headline: string;
  specialties: SpecialtyResponseDTO[];
  experience: number;
  rating: number;
  totalSessions: number;
  pricePerSession: number;
  status: string;
  isVerified: boolean;
  isOnline: boolean;
  lastActiveAt: string;
}

export interface SpecialtyResponseDTO {
  id: string;
  name: string;
  category: string;
}
