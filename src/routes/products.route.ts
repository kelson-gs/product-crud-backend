import z from 'zod';
import { FastifyTypeInstance } from '../typeInstances';
import {
    createProduct,
    deleteProduct,
    getProductSchema,
    getOnlyProductSchema,
    productsSchema,
    updateProduct,
    updateStatusProduct
} from '../schema/products.schema';
import { productsRepository } from '../repositories/products.repository';
import { http } from '../utils/http';
// colocar o autenticate

export async function productsRoutes(app: FastifyTypeInstance) {
    app.post('/product', {
        schema: {
            tags: ['products'],
            description: 'Criação de novo produto',
            body: createProduct,
            response: {
                201: z.object({
                    data: productsSchema
                }),
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
            const body = createProduct.parse(request.body);

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
        schema: {
            tags: ['products'],
            description: 'Buscando todos os produtos',
            response: {
                200: z.object({
                    data: [getProductSchema]
                }),
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
        schema: {
            tags: ['products'],
            description: 'Buscando um produto',
            params: getOnlyProductSchema,
            response: {
                200: z.object({
                    data: getProductSchema
                }),
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
        schema: {
            tags: ['products'],
            description: 'Atualizar produto',
            body: updateProduct,
            response: {
                200: z.object({
                    data: updateProduct
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = updateProduct.parse(request.body);

            const product = await productsRepository.update(body);

            return http.ok(reply, product);
        } catch (error) {
            console.error("Houve um erro ao atualizar produto: ",error);
            return http.serverError(reply);
        }
    })

    app.put('/product/status', {
        schema: {
            tags: ['products'],
            description: 'Atualizar status do produto',
            body: updateStatusProduct,
            response: {
                200: z.object({
                    data: updateProduct
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = updateProduct.parse(request.body);

            const product = await productsRepository.updateStatus(body);

            return http.ok(reply, product);
        } catch (error) {
            console.error("Houve um erro ao atualizar status do produto: ",error);
            return http.serverError(reply);
        }
    })

    app.delete('/product', {
        schema: {
            tags: ['products'],
            description: 'Deletar produto',
            body: deleteProduct,
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
            const body = updateProduct.parse(request.body);

            const product = await productsRepository.delete(body);

            return http.ok(reply, { message: 'Product deleted!' });
        } catch (error) {
            console.error("Houve um erro ao deletar produto: ",error);
            return http.serverError(reply);
        }
    })
}