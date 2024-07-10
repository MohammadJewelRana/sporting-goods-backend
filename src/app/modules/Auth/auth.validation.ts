import { z } from 'zod';
 
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string({ invalid_type_error: 'password must be string' }),
  }),
});


const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidations = {
 
  loginValidationSchema,
  refreshTokenValidationSchema,
 
};
