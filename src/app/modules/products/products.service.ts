import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import { AppError } from '../../errors/AppError';
 
import { TProduct } from './products.interface';
import { Product } from './products.model';
 

const createProductsIntoDB = async (payload: TProduct) => {
  // console.log(payload);

  const result = await Product.create(payload);
  return result;
};


const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {

  const findProduct=await Product.findById({_id:productId});
  if(!findProduct){
    throw new AppError(httpStatus.BAD_REQUEST,'Product not found!!');
  }

   
  return null;
  


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
  updateProductIntoDB
};
