import { prisma } from "../db/prisma";
import {
    CreateProductDTO,
    DeleteProductDTO,
    GetOnlyProductDTO,
    UpdateProductDTO,
    UpdateStatusProductDTO
} from '../dtos/product.dto';

export const productsRepository = {
    async create(data: CreateProductDTO) {
        return prisma.products.create({ data })
    },

    async getOnly(data: GetOnlyProductDTO) {
        return prisma.products.findUnique({
            where: {
                id: data.id
            }
        });
    },

    async getAll() {
        return prisma.products.findMany()
    },

    async update(data: UpdateProductDTO) {
        return prisma.products.update({
            where: {
                id: data.id
            },
            data
        })
    },

    async updateStatus(data: UpdateStatusProductDTO) {
        return prisma.products.update({
            where: {
                id: data.id
            },
            data: {
                status: data.status
            }
        })
    },

    async delete(data: DeleteProductDTO) {
        return prisma.products.delete({
            where: {
                id: data.id
            }
        })
    }
}