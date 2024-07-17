import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createAdmin,
);

router.patch(
  '/:id',
  auth('admin','customer'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete('/:id',auth('admin'), UserControllers.deleteUser);
router.get('/:id',auth('admin','customer'), UserControllers.getSingleUser);
router.get('/',auth('admin'), UserControllers.getAllUser);

export const UserRoutes = router;
