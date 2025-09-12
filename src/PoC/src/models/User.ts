export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  COACH = 'COACH',
  ADMIN = 'ADMIN'
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  videoSettings: VideoSettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  sessionReminders: boolean;
  coachUpdates: boolean;
}

export interface VideoSettings {
  preferredCamera: string;
  preferredMicrophone: string;
  autoJoinAudio: boolean;
  autoJoinVideo: boolean;
}