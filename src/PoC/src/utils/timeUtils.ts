import {
  format,
  formatDistanceToNow,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import { es } from 'date-fns/locale';

export const formatSessionTime = (date: Date): string => {
  if (isToday(date)) {
    return `Hoy a las ${format(date, 'HH:mm')}`;
  }
  if (isTomorrow(date)) {
    return `Mañana a las ${format(date, 'HH:mm')}`;
  }
  if (isYesterday(date)) {
    return `Ayer a las ${format(date, 'HH:mm')}`;
  }
  return format(date, 'dd/MM/yyyy HH:mm');
};

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
};

export const calculateRemainingMinutes = (
  totalMinutes: number,
  usedMinutes: number
): string => {
  const remaining = totalMinutes - usedMinutes;
  if (remaining <= 0) {
    return '0min restantes';
  }
  return `${formatDuration(remaining)} restantes`;
};

export const isWithinBusinessHours = (
  date: Date,
  timezone: string = 'America/Mexico_City'
): boolean => {
  const hour = new Date(
    date.toLocaleString('en-US', { timeZone: timezone })
  ).getHours();
  return hour >= 8 && hour <= 22; // 8 AM to 10 PM
};

export const getNextAvailableSlot = (
  availability: any,
  timezone: string
): Date | null => {
  // This would calculate the next available time slot based on coach availability
  // Implementation would depend on the specific business logic
  const now = new Date();
  const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
  nextHour.setMinutes(0, 0, 0);
  return nextHour;
};

export const formatTimeSlot = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};

export const convertToUserTimezone = (
  date: Date,
  userTimezone: string
): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: userTimezone }));
};
