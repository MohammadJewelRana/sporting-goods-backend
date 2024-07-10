import {
  TCategory,
  TInventory,
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
  reviews: TReviews[];

  isDeleted: boolean;
};
