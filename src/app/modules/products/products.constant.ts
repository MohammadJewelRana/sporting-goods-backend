export type TCategory = {

  name: string;
  description: string;
};
export type TSpecification = {
  key: string;
  value: string;
};
export type TInventory = {
  quantity: number;
  inStock: boolean;
};
export type TRating = {
  averageRating: number;
  numberOfRatings: number;
};
export type TWarranty = {
  period: string;
  details: string;
};
export type TReviews = {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
};
export type TShippingDetail = {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  
};


export type TProductInfo= {
  productId: string;
  name: string;
  images: string[];
  itemQuantity: number;
  price: number;
  total: number;
 
}


export const ProductSearchableFields = [
  'name',
  
];