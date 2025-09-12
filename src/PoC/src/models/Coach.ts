export interface Coach {
  id: string;
  userId: string;
  bio: string;
  headline: string;
  specialties: Specialty[];
  experience: number; // years
  rating: number;
  totalSessions: number;
  pricePerSession: number;
  availability: Availability;
  status: CoachStatus;
  certifications: Certification[];
  languages: string[];
  education: Education[];
  isVerified: boolean;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Specialty {
  id: string;
  name: string;
  category: SpecialtyCategory;
  description?: string;
}

export enum SpecialtyCategory {
  HEALTH = 'HEALTH',
  PSYCHOLOGY = 'PSYCHOLOGY',
  BUSINESS = 'BUSINESS',
  TECHNOLOGY = 'TECHNOLOGY',
  LAW = 'LAW',
  ARTS = 'ARTS',
  AGRICULTURE = 'AGRICULTURE',
  MECHANICS = 'MECHANICS',
  EDUCATION = 'EDUCATION',
  OTHER = 'OTHER'
}

export interface Availability {
  timezone: string;
  weeklySchedule: WeeklySchedule;
  exceptions: AvailabilityException[];
  instantAvailable: boolean;
}

export interface WeeklySchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface AvailabilityException {
  date: Date;
  isAvailable: boolean;
  customSlots?: TimeSlot[];
  reason?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateUrl?: string;
  verified: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
}

export enum CoachStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  IN_SESSION = 'IN_SESSION',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY'
}