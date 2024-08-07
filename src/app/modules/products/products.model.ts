import { Schema, model } from 'mongoose';
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
import { TCart, TProduct } from './products.interface';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const specificationSchema = new Schema<TSpecification>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default:true },
});

const ratingSchema = new Schema<TRating>({
  averageRating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
});

const shippingDetailSchema = new Schema<TShippingDetail>({
  weight: { type: Number, default:0},
  dimensions: {
    length: { type: Number,  default:0 },
    width: { type: Number,  default:0 },
    height: { type: Number,  default:0 },
  },
 
});

const reviewSchema = new Schema<TReviews>({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const warrantySchema = new Schema<TWarranty>({
  period: { type: String, required: true },
  details: { type: String, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: categorySchema, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  brand: { type: String, required: true },
  sku: { type: String,   unique: true },
  inventory: { type: inventorySchema, required: true },
  images: { type: [String] ,required:true},
  ratings: { type: ratingSchema,   },
  specifications: { type: [specificationSchema], required: true },
  warranty: { type: warrantySchema, required: true },
  shippingDetails: { type: shippingDetailSchema, required: true },
  tags: { type: [String], required: true },

  reviews: { type: [reviewSchema] },

  isDeleted: { type: Boolean, default: false },

},
{
  timestamps: true,
},
);


const productInfoSchema = new Schema<TProductInfo>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  itemQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }

})

const cartSchema = new Schema<TCart>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  houseNumber: { type: String, default: '' },
  street: { type: String, default: '' },
  productInfo: { type: [productInfoSchema], required: true },
  shippingCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  totalItem: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  vat: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },

},
{
  timestamps: true,
}
);
 





export const Product = model<TProduct>('Product', productSchema);
export const Cart = model<TCart>('Cart', cartSchema);
