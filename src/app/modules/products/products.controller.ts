import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

import { catchAsync } from '../../utils/catchAsync';
import { ProductServices } from './products.service';

// const createProducts = catchAsync(async (req, res) => {
//   //   const { password, admin: adminData } = req.body;

//   const result = await ProductServices.createProductsIntoDB(req.files,req.body);
//   console.log(req.files);
//   // console.log(req.body);
  

//   // const result = await ProductServices.createProductsIntoDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product is added successfully',
//     data: result,
//   });
// });


const createProducts = catchAsync(async (req, res) => {


  // console.log('Controller - Files:', req.files);
  // console.log('Controller - Body:', req.body);

  const result = await ProductServices.createProductsIntoDB(req.files,req.body);
 
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is added successfully',
    data: result,
  });
});

 


const updateProduct= catchAsync(async (req, res) => {
 const {id}=req.params;

  const result = await ProductServices.updateProductIntoDB(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  product updated successfully',
    data: result,
  });
});

const deleteProduct= catchAsync(async (req, res) => {
  const {  id } = req.params;

  const result = await ProductServices.deleteSingleProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  // console.log('test',req.user);

  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Products data retrieved  successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' single product data is retrieved successfully',
    data: result,
  });
});

const createCart = catchAsync(async (req, res) => {
  // console.log('test',req.user);

  const result = await ProductServices.createCartIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '   cart  added successfully',
    data: result,
  });
});


export const ProductController = {
  createProducts,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createCart
};
