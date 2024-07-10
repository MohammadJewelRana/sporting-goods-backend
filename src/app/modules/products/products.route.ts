import express from 'express';
import { ProductController,   } from './products.controller';
import { ProductValidation } from './products.validation';
import validateRequest from '../../middleware/validateRequest';
 
 
 

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post(
  '/add-products',
  validateRequest(ProductValidation.productSchema),
  ProductController.createProducts,
);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct,
);

router.delete('/:id', ProductController.deleteProduct);
router.get('/:id', ProductController.getSingleProduct);
router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
