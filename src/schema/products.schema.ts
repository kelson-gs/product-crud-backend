import z from 'zod';

export const productsSchema = z.object({
    id: z.number(),
    product_code: z.string(),
    description: z.string(),
    status: z.boolean(),
    image: z.string().nullable()
});

export const createProduct = productsSchema.omit({ id: true });

export const getProductSchema = productsSchema;

export const getOnlyProductSchema = productsSchema.pick({ id: true });

export const updateProduct = productsSchema;

export const updateStatusProduct = productsSchema.pick({ id: true, status: true });

export const deleteProduct = productsSchema.pick({ id: true });

