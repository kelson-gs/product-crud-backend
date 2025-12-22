import z from 'zod';
import { FastifyTypeInstance } from '../typeInstances';
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    getOnlyProductSchema,
    productsSchema,
    updateProductSchema,
    updateStatusProductSchema
} from '../schema/products.schema';
import { productsRepository } from '../repositories/products.repository';
import { authenticate } from '../middleware/authenticate';
import { http } from '../utils/http';

export async function productsRoutes(app: FastifyTypeInstance) {
    app.post('/product', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Criação de novo produto',
            body: createProductSchema,
            response: {
                201: productsSchema,
                404: z.object({
                    message: z.string().describe('Data is empty!')
                }),
                409: z.object({
                    message: z.string().describe('Product already exists!')
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = createProductSchema.parse(request.body);

            if (!body) {
                return http.notFound(reply, 'Data is empty');
            }

            const product = await productsRepository.create(body);

            return http.created(reply, product)
        } catch (error) {
            console.error("Houve um erro ao cadastrar produto: ", error);
            return http.serverError(reply);
        }
    })


    app.get('/products', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Buscando todos os produtos',
            response: {
                200: getProductSchema,
                404: z.object({
                    message: z.string().describe('Products not found!')
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const products = await productsRepository.getAll();

            if (!products) {
                return http.notFound(reply);
            }

            return http.ok(reply, products);

        } catch (error) {
            console.error('Houve um erro ao buscar produtos: ', error);
            return http.serverError(reply);
        }
    })

    app.get('/product/:id', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Buscando um produto',
            params: getOnlyProductSchema,
            response: {
                200: getProductSchema,
                404: z.object({
                    message: z.string().describe('Products not found!')
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const { params } = request;

            const product = await productsRepository.getOnly(params);

            if (!product) {
                return http.notFound(reply);
            }

            return http.ok(reply, product);

        } catch (error) {
            console.error('Houve um erro ao encontrar produto: ', error);
            return http.serverError(reply);
        }
    })

    app.put('/product', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Atualizar produto',
            body: updateProductSchema,
            response: {
                200: updateProductSchema,
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = updateProductSchema.parse(request.body);

            const product = await productsRepository.update(body);

            return http.ok(reply, product);
        } catch (error) {
            console.error("Houve um erro ao atualizar produto: ",error);
            return http.serverError(reply);
        }
    })

    app.put('/product/status', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Atualizar status do produto',
            body: updateStatusProductSchema,
            response: {
                200: updateProductSchema,
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = updateStatusProductSchema.parse(request.body);

            const product = await productsRepository.updateStatus(body);

            return http.ok(reply, product);
        } catch (error) {
            console.error("Houve um erro ao atualizar status do produto: ",error);
            return http.serverError(reply);
        }
    })

    app.delete('/product', {
        preHandler: [authenticate],
        schema: {
            tags: ['products'],
            description: 'Deletar produto',
            body: deleteProductSchema,
            response: {
                200: z.object({
                    message: z.string().describe("Product deleted!")
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
         try {
            const body = updateProductSchema.parse(request.body);

            const product = await productsRepository.delete(body);

            return http.ok(reply, { message: 'Product deleted!' });
        } catch (error) {
            console.error("Houve um erro ao deletar produto: ",error);
            return http.serverError(reply);
        }
    })
}