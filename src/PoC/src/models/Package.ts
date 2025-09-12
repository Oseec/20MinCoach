export interface SessionPackage {
  id: string;
  name: string;
  description: string;
  totalMinutes: number;
  price: number;
  currency: string;
  validityDays: number;
  discountPercentage?: number;
  isActive: boolean;
  features: PackageFeature[];
  restrictions: PackageRestriction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageFeature {
  id: string;
  name: string;
  description: string;
  isIncluded: boolean;
}

export interface PackageRestriction {
  type: RestrictionType;
  value: string;
  description: string;
}

export enum RestrictionType {
  MAX_SESSIONS_PER_DAY = 'MAX_SESSIONS_PER_DAY',
  COACH_SPECIALTY = 'COACH_SPECIALTY',
  TIME_OF_DAY = 'TIME_OF_DAY',
  SESSION_DURATION = 'SESSION_DURATION'
}

export interface UserPackage {
  id: string;
  userId: string;
  packageId: string;
  purchasedAt: Date;
  expiresAt: Date;
  remainingMinutes: number;
  usedMinutes: number;
  isActive: boolean;
  sessionsUsed: string[]; // session IDs
}