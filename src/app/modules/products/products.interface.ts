import {
  TCategory,
  TInventory,
  TProductInfo,
  TRating,
  TReviews,
  TShippingDetail,
  TSpecification,
  TWarranty,
} from './products.constant';

export type TProduct = {
  name: string;
  description: string;
  category: TCategory;
  price: number;
  discountPrice?: number;
  brand: string;
  sku?: string;
  inventory: TInventory;
  images: string[];
  ratings?: TRating;
  specifications: TSpecification[];
  warranty?:TWarranty   ;
  shippingDetails: TShippingDetail;
  tags: string[];
  reviews?: TReviews[];

  isDeleted: boolean;
};

 
 

export type TCart= {
  userId: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  district: string;
  houseNumber?: string;
  street?: string;
  productInfo: TProductInfo[];
  shippingCost: number;
  totalCost: number;
  totalItem: number;
  totalQuantity: number;
  vat: number;
  isCompleted: boolean;
}

