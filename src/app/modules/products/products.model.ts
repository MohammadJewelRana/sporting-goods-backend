import { Schema, model } from 'mongoose';
import {
  TCategory,
  TInventory,
  TRating,
  TReviews,
  TShippingDetail,
  TSpecification,
  TWarranty,
} from './products.constant';
import { TProduct } from './products.interface';

const categorySchema = new Schema<TCategory>({
  id: { type: String, required: true, unique: true },
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
  origin: { type: String,   },
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
  sku: { type: String, required: true, unique: true },
  inventory: { type: inventorySchema, required: true },
  images: { type: [String], required: true },
  ratings: { type: ratingSchema, required: true },
  specifications: { type: [specificationSchema], required: true },
  warranty: { type: warrantySchema, required: true },
  shippingDetails: { type: shippingDetailSchema, required: true },
  tags: { type: [String], required: true },

  reviews: { type: [reviewSchema], required: true },

  isDeleted: { type: Boolean, default: false },

});

export const Product = model<TProduct>('Product', productSchema);
