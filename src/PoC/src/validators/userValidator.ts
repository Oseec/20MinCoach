import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
    ),
  role: z.enum(['CLIENT', 'COACH']),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .optional(),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  profilePictureUrl: z.string().url('URL inválida').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const userPreferencesSchema = z.object({
  language: z.string().optional(),
  timezone: z.string().optional(),
  notifications: z
    .object({
      emailNotifications: z.boolean().optional(),
      smsNotifications: z.boolean().optional(),
      pushNotifications: z.boolean().optional(),
      sessionReminders: z.boolean().optional(),
      coachUpdates: z.boolean().optional(),
    })
    .optional(),
  videoSettings: z
    .object({
      preferredCamera: z.string().optional(),
      preferredMicrophone: z.string().optional(),
      autoJoinAudio: z.boolean().optional(),
      autoJoinVideo: z.boolean().optional(),
    })
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
