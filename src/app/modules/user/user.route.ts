import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createAdmin,
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete('/:id', UserControllers.deleteUser);
router.get('/:id', UserControllers.getSingleUser);
router.get('/', UserControllers.getAllUser);

export const UserRoutes = router;
