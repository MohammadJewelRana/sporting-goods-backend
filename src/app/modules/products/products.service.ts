import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import { AppError } from '../../errors/AppError';

import { TProduct } from './products.interface';
import { Product } from './products.model';
import { unknown } from 'zod';

const createProductsIntoDB = async (payload: TProduct) => {
  // console.log(payload);

  const result = await Product.create(payload);
  return result;
};

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const findProduct = await Product.findById({ _id: productId });
  if (!findProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product not found!!');
  }

  const {
    category,
    inventory,
    images,
    ratings,
    specifications,
    warranty,
    shippingDetails,
    tags,
    reviews,
    ...remainingData
  } = payload;

  const { dimensions } = shippingDetails;
  // const { category, inventory,images,ratings,specifications,warranty,shippingDetails,tags,reviews,...remainingProductData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingData };

  //modify object
  if (category && Object.keys(category).length) {
    for (const [key, value] of Object.entries(category)) {
      modifiedData[`category.${key}`] = value;
    }
  }

  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      modifiedData[`inventory.${key}`] = value;
    }
  }

  if (ratings && Object.keys(ratings).length) {
    for (const [key, value] of Object.entries(ratings)) {
      modifiedData[`ratings.${key}`] = value;
    }
  }
  if (warranty && Object.keys(warranty).length) {
    for (const [key, value] of Object.entries(warranty)) {
      modifiedData[`warranty.${key}`] = value;
    }
  }

  const result = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      $set: modifiedData,
    },
    {
      new: true,
    },
  );

  return result;
  // return null;
};

const deleteSingleProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete({ _id: productId });
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    // .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleProductsFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

export const ProductServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  deleteSingleProduct,
  updateProductIntoDB,
};
