import express from 'express';
import { ProductController,   } from './products.controller';
import { ProductValidation } from './products.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
 
 
 

const router = express.Router();

// router.post('/create-user', UserControllers.createAdmin);

router.post(
  '/add-products',
  auth('admin'),
  validateRequest(ProductValidation.productSchema),
  ProductController.createProducts,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct,
);

router.delete('/:id',  auth('admin'), ProductController.deleteProduct);
router.get('/:id',   ProductController.getSingleProduct);
router.get('/', ProductController.getAllProducts);
router.post('/cart',auth('admin','customer'), validateRequest(ProductValidation.cartSchema), ProductController.createCart);

export const ProductRoutes = router;
