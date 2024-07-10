import { z } from 'zod';

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const specificationSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean().default(true),
});

const ratingSchema = z.object({
  averageRating: z.number().default(0),
  numberOfRatings: z.number().default(0),
});

const shippingDetailSchema = z.object({
  weight: z.number().default(0),
  dimensions: z.object({
    length: z.number().default(0),
    width: z.number().default(0),
    height: z.number().default(0),
  }),
  origin: z.string().optional(),
});

const reviewSchema = z.object({
  userId: z.string(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.date().default(new Date()),
});

const warrantySchema = z.object({
  period: z.string(),
  details: z.string(),
});

const productSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    category: categorySchema,
    price: z.number(),
    discountPrice: z.number().optional(),
    brand: z.string(),
    sku: z.string(),
    inventory: inventorySchema,
    images: z.array(z.string()),
    ratings: ratingSchema,
    specifications: z.array(specificationSchema),
    warranty: warrantySchema,
    shippingDetails: shippingDetailSchema,
    tags: z.array(z.string()),
    reviews: z.array(reviewSchema),
    isDeleted: z.boolean().default(false),
  }),
});



const updateCategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
});

const updateSpecificationSchema = z.object({
  key: z.string().optional(),
  value: z.string().optional(),
});

const updateInventorySchema = z.object({
  quantity: z.number().optional(),
  inStock: z.boolean().default(true).optional(),
});

const updateRatingSchema = z.object({
  averageRating: z.number().default(0).optional(),
  numberOfRatings: z.number().default(0).optional(),
});

const updateShippingDetailSchema = z.object({
  weight: z.number().default(0).optional(),
  dimensions: z.object({
    length: z.number().default(0).optional(),
    width: z.number().default(0).optional(),
    height: z.number().default(0).optional(),
  }),
  origin: z.string().optional(),
});

const updateReviewSchema = z.object({
  userId: z.string().optional(),
  rating: z.number().optional(),
  comment: z.string().optional(),
  createdAt: z.date().default(new Date()).optional(),
});

const updateWarrantySchema = z.object({
  period: z.string().optional(),
  details: z.string().optional(),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: updateCategorySchema.optional(),
    price: z.number().optional(),
    discountPrice: z.number().optional().optional(),
    brand: z.string().optional(),
    sku: z.string().optional(),
    inventory: updateInventorySchema.optional(),
    images: z.array(z.string()).optional(),
    ratings: updateRatingSchema.optional(),
    specifications: z.array(updateSpecificationSchema).optional(),
    warranty: updateWarrantySchema.optional(),
    shippingDetails: updateShippingDetailSchema.optional(),
    tags: z.array(z.string()).optional(),
    reviews: z.array(updateReviewSchema).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ProductValidation = {
  productSchema,
  updateProductSchema,
};
