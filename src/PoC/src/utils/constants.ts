// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3001/api',
  WS_URL: process.env.VITE_WS_URL || 'ws://localhost:3001',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Session Configuration
export const SESSION_CONFIG = {
  DEFAULT_DURATION: 20, // minutes
  MIN_DURATION: 15,
  MAX_DURATION: 60,
  PREPARATION_TIME: 2, // minutes before session starts
  WARNING_TIME: 5, // minutes before session ends
} as const;

// Coach Status
export const COACH_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  IN_SESSION: 'IN_SESSION',
  OFFLINE: 'OFFLINE',
  AWAY: 'AWAY',
} as const;

// Session Status
export const SESSION_STATUS = {
  SCHEDULED: 'SCHEDULED',
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const;

// User Roles
export const USER_ROLES = {
  CLIENT: 'CLIENT',
  COACH: 'COACH',
  ADMIN: 'ADMIN',
} as const;

// Specialty Categories
export const SPECIALTY_CATEGORIES = {
  HEALTH: 'HEALTH',
  PSYCHOLOGY: 'PSYCHOLOGY',
  BUSINESS: 'BUSINESS',
  TECHNOLOGY: 'TECHNOLOGY',
  LAW: 'LAW',
  ARTS: 'ARTS',
  AGRICULTURE: 'AGRICULTURE',
  MECHANICS: 'MECHANICS',
  EDUCATION: 'EDUCATION',
  OTHER: 'OTHER',
} as const;

// Payment Configuration
export const PAYMENT_CONFIG = {
  CURRENCY: 'USD',
  MIN_PACKAGE_AMOUNT: 10,
  MAX_PACKAGE_AMOUNT: 1000,
  PACKAGE_OPTIONS: [50, 100, 200, 500], // minutes
} as const;

// WebRTC Configuration
export const WEBRTC_CONFIG = {
  ICE_SERVERS: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
  MEDIA_CONSTRAINTS: {
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      frameRate: { ideal: 30 },
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  },
} as const;

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SESSION_INVITATION: 'SESSION_INVITATION',
  SESSION_REMINDER: 'SESSION_REMINDER',
  SESSION_STARTED: 'SESSION_STARTED',
  SESSION_ENDED: 'SESSION_ENDED',
  COACH_AVAILABLE: 'COACH_AVAILABLE',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
} as const;

// App Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COACHES: '/coaches',
  SESSIONS: '/sessions',
  PACKAGES: '/packages',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
  COACH: {
    DASHBOARD: '/coach/dashboard',
    SCHEDULE: '/coach/schedule',
    SESSIONS: '/coach/sessions',
    CLIENTS: '/coach/clients',
    ANALYTICS: '/coach/analytics',
    AVAILABILITY: '/coach/availability',
    PROFILE: '/coach/profile',
  },
} as const;