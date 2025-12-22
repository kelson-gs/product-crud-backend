import z from 'zod';
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    getOnlyProductSchema,
    productsSchema,
    updateProductSchema,
    updateStatusProductSchema
} from '../schema/products.schema';

export type ProductDTO = z.infer<typeof productsSchema>;
export type GetProductDTO = z.infer<typeof getProductSchema>
export type GetOnlyProductDTO = z.infer<typeof getOnlyProductSchema>
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type UpdateStatusProductDTO = z.infer<typeof updateStatusProductSchema>;
export type DeleteProductDTO = z.infer<typeof deleteProductSchema>;