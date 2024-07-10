import express, {   } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post('/create-user',validateRequest(UserValidation.createUserValidationSchema), UserControllers.createAdmin);

export const UserRoutes = router;
