import express, { NextFunction, Request, Response } from 'express';
import { ProductController,   } from './products.controller';
import { ProductValidation } from './products.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { upload, uploadMultiple } from '../../utils/sendImageToCloudinary';
 
 
 

const router = express.Router();

 
 
 
router.post(
  '/add-products',
  auth('admin'),
  uploadMultiple,
  (req: Request, res: Response, next: NextFunction) => {
    // Log req.body and req.files before processing
    // console.log('Before parsing:', req.body);
    // console.log('Files:', req.files);

    if (req.body.data) {
      try {
        req.body = { ...req.body, ...JSON.parse(req.body.data) };
        delete req.body.data; // Remove the original data field to avoid confusion
      } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON in body data' });
      }
    }

    // console.log('After parsing:', req.body);
    next();
  },
  // validateRequest(ProductValidation.productSchema),
  ProductController.createProducts
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
router.post('/order',auth('admin','customer'), validateRequest(ProductValidation.cartSchema), ProductController.createCart);

export const ProductRoutes = router;
