import z from 'zod';

export const productsSchema = z.object({
    id: z.number(),
    product_code: z.string(),
    description: z.string(),
    status: z.boolean(),
    image: z.string().nullable()
});

export const createProductSchema = productsSchema.omit({ id: true });
export const getProductSchema = productsSchema.array();
export const getOnlyProductSchema = productsSchema.pick({ id: true });
export const updateProductSchema = productsSchema;
export const updateStatusProductSchema = productsSchema.pick({ id: true, status: true });
export const deleteProductSchema = productsSchema.pick({ id: true });

