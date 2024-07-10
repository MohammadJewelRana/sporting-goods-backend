
import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validation';

 

const router=express.Router();


router.post('/login',validateRequest(AuthValidations.loginValidationSchema),AuthController.loginUser)


router.post('/refresh-token',validateRequest(AuthValidations.refreshTokenValidationSchema),AuthController.refreshToken)



export const AuthRoute=router;