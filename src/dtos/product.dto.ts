import { z } from 'zod';
import {
    createProduct,
    deleteProduct,
    getProductSchema,
    getOnlyProductSchema,
    productsSchema,
    updateProduct,
    updateStatusProduct
} from '../schema/products.schema';

export type ProductDTO = z.infer<typeof productsSchema>;
export type GetProductDTO = z.infer<typeof getProductSchema>
export type GetOnlyProductDTO = z.infer<typeof getOnlyProductSchema>
export type CreateProductDTO = z.infer<typeof createProduct>;
export type UpdateProductDTO = z.infer<typeof updateProduct>;
export type UpdateStatusProductDTO = z.infer<typeof updateStatusProduct>;
export type DeleteProductDTO = z.infer<typeof deleteProduct>;