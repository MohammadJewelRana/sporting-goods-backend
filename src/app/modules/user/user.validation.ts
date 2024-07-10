import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().max(20, 'First Name cannot be more than 20 characters'),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'Last Name cannot be more than 20 characters'),
});

const createUserValidationSchema = z.object({
  body: z.object({
    name: userNameSchema,
    email: z.string().email(),
    password: z.string().max(20),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    contactNo: z.string(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const updateUserNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot be more than 20 characters')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20, 'Last Name cannot be more than 20 characters')
    .optional(),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: updateUserNameSchema.optional(),

    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
