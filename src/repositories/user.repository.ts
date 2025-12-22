import { prisma } from '../db/prisma';
import { CreateUserDTO, GetByEmailDTO, GetByIdDTO } from '../dtos/user.dto';

export const userRepository = {
    async getByEmail(data: GetByEmailDTO) {
        return prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    },

    async create(data: CreateUserDTO) {
        return prisma.user.create({ data })
    },

    async getOnly(data: GetByIdDTO) {
        return prisma.user.findUnique({
            where: {
                id: data.id
            }
        })
    }
}