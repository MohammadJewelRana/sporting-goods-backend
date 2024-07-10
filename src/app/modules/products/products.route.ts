import express from 'express';
import { ProductController,   } from './products.controller';
 
 
 

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post(
  '/add-products',
  // validateRequest(UserValidation.createUserValidationSchema),
  ProductController.createProducts,
);

router.patch(
  '/:id',
  // validateRequest(UserValidation.updateUserValidationSchema),
  ProductController.updateProduct,
);

router.delete('/:id', ProductController.deleteProduct);
router.get('/:id', ProductController.getSingleProduct);
router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
