/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import { AppError } from '../../errors/AppError';

import { TCart, TProduct } from './products.interface';
import { Cart, Product } from './products.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { ProductSearchableFields } from './products.constant';
 

const createProductsIntoDB = async (payload: TProduct) => {
  // console.log(payload);
  if (!payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'please give the data and image files',
    );
  }

  const result = await Product.create(payload);
  return result;
  // return null;
};

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  // console.log(payload);

  const findProduct = await Product.findById({ _id: productId });
  if (!findProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product not found!!');
  }

  // console.log(findProduct);
  // console.log(payload);

  const {
    category,
    inventory,
    specifications,
    // tags,
    reviews,
    ...remainingData
  } = payload;

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

  // if (specifications && Array.isArray(specifications)) {
  //   specifications.forEach((specification, index) => {
  //     for (const [key, value] of Object.entries(specification)) {
  //       modifiedData[`specifications.${index}.${key}`] = value;
  //     }
  //   });
  // }
  if (specifications && Array.isArray(specifications)) {
    // Replace the entire specifications array
    modifiedData['specifications'] = specifications;
  }

  // if (tags && Array.isArray(tags)) {
  //   modifiedData['tags'] = tags; // Directly assign the tags array
  // }

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
  // return null;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
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

const createCartIntoDB = async (cartData: TCart) => {
  // console.log(cartData);
  const { userId, productInfo } = cartData;
  // console.log(productInfo);

  const user = await User.findOne({ _id: userId });
  // console.log(user);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Cart.create(cartData);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to add into the cart');
    }

    for (const element of productInfo) {
      const deductQuantity = await Product.findOneAndUpdate(
        { _id: element?.productId },
        { $inc: { 'inventory.quantity': -element.itemQuantity } },
        { new: true, session },
      );

      if (!deductQuantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update product inventory',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(' failed to  add cart');
  }
};

export const ProductServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  deleteSingleProduct,
  updateProductIntoDB,
  createCartIntoDB,
};
