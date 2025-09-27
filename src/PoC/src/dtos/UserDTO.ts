export interface CreateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'CLIENT' | 'COACH';
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  profilePictureUrl?: string;
  preferences?: UserPreferencesDTO;
}

export interface UserPreferencesDTO {
  language?: string;
  timezone?: string;
  notifications?: NotificationSettingsDTO;
  videoSettings?: VideoSettingsDTO;
}

export interface NotificationSettingsDTO {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  sessionReminders?: boolean;
  coachUpdates?: boolean;
}

export interface VideoSettingsDTO {
  preferredCamera?: string;
  preferredMicrophone?: string;
  autoJoinAudio?: boolean;
  autoJoinVideo?: boolean;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
