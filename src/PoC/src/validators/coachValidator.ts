import { z } from 'zod';

const timeSlotSchema = z.object({
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:mm)'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:mm)'),
});

const weeklyScheduleSchema = z.object({
  monday: z.array(timeSlotSchema),
  tuesday: z.array(timeSlotSchema),
  wednesday: z.array(timeSlotSchema),
  thursday: z.array(timeSlotSchema),
  friday: z.array(timeSlotSchema),
  saturday: z.array(timeSlotSchema),
  sunday: z.array(timeSlotSchema),
});

const availabilitySchema = z.object({
  timezone: z.string().min(1, 'Zona horaria es requerida'),
  weeklySchedule: weeklyScheduleSchema,
  instantAvailable: z.boolean(),
});

const certificationSchema = z.object({
  name: z.string().min(1, 'Nombre de certificación es requerido'),
  issuer: z.string().min(1, 'Emisor es requerido'),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  certificateUrl: z.string().url('URL inválida').optional(),
});

const educationSchema = z.object({
  institution: z.string().min(1, 'Institución es requerida'),
  degree: z.string().min(1, 'Título es requerido'),
  field: z.string().min(1, 'Campo de estudio es requerido'),
  startYear: z.number().min(1900).max(new Date().getFullYear()),
  endYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
  description: z.string().optional(),
});

export const createCoachSchema = z.object({
  bio: z.string().min(50, 'La biografía debe tener al menos 50 caracteres').max(1000, 'La biografía no puede exceder 1000 caracteres'),
  headline: z.string().min(10, 'El titular debe tener al menos 10 caracteres').max(100, 'El titular no puede exceder 100 caracteres'),
  specialties: z.array(z.string()).min(1, 'Debe seleccionar al menos una especialidad').max(5, 'Máximo 5 especialidades'),
  experience: z.number().min(0, 'La experiencia no puede ser negativa').max(50, 'Experiencia máxima: 50 años'),
  pricePerSession: z.number().min(10, 'Precio mínimo: $10').max(500, 'Precio máximo: $500'),
  availability: availabilitySchema,
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(z.string()).min(1, 'Debe seleccionar al menos un idioma'),
  education: z.array(educationSchema).optional(),
});

export const updateCoachSchema = z.object({
  bio: z.string().min(50).max(1000).optional(),
  headline: z.string().min(10).max(100).optional(),
  specialties: z.array(z.string()).min(1).max(5).optional(),
  experience: z.number().min(0).max(50).optional(),
  pricePerSession: z.number().min(10).max(500).optional(),
  availability: availabilitySchema.optional(),
  status: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE', 'AWAY']).optional(),
});

export const coachSearchSchema = z.object({
  specialties: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).optional(),
  rating: z.number().min(1).max(5).optional(),
  isOnline: z.boolean().optional(),
  languages: z.array(z.string()).optional(),
});

export type CreateCoachInput = z.infer<typeof createCoachSchema>;
export type UpdateCoachInput = z.infer<typeof updateCoachSchema>;
export type CoachSearchInput = z.infer<typeof coachSearchSchema>;