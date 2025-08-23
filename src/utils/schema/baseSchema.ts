import { z } from 'zod';

export const baseSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .refine((value) => /^[A-ZА-Я]/.test(value), {
      message: 'First letter must be uppercase',
    }),
  age: z
    .string()
    .refine((value) => value && !isNaN(Number(value)), {
      message: 'Enter your age',
    })
    .refine((value) => Number(value) > 0, {
      message: 'No negative values',
    }),
  email: z.email(),
  gender: z
    .nullable(z.string())
    .refine((val) => !!val && ['male', 'female'].includes(val), {
      message: 'Please select a gender option',
    }),
  'accept Terms and Conditions': z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  country: z.string().min(1, 'Please select a country'),
  'upload file': z
    .any()
    .refine((files) => files && files.length > 0, {
      message: 'File is required',
    })
    .refine((files) => files && files[0]?.size <= 5_242_800, {
      message: 'File must be less than 5MB',
    })
    .refine(
      (files) => files && ['image/png', 'image/jpeg'].includes(files[0]?.type),
      {
        message: 'File must be in .png or .jpeg format',
      }
    ),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Should be at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Should be at least one lowercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Should be at least one number',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Should be at least one special symbol (!@#$% etc.)',
    }),
  'password confirmation': z
    .string()
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Should be at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Should be at least one lowercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Should be at least one number',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Should be at least one special symbol (!@#$% etc.)',
    }),
});

export const fullSchema = z
  .object({
    ...baseSchema.shape,
    ...passwordSchema.shape,
  })
  .refine(
    (data) => {
      return data.password === data['password confirmation'];
    },
    {
      message: 'Passwords do not match',
      path: ['password confirmation'],
    }
  );
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type FullSchemaData = z.infer<typeof fullSchema>;
