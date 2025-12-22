import z from 'zod';
import {
    createUserSchema,
    deleteUserSchema,
    getByEmailSchema,
    getByIdSchema,
    updateUserSchema,
    userSchema
} from '../schema/user.schema';

export type UserDTO = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type GetByEmailDTO = z.infer<typeof getByEmailSchema>;
export type GetByIdDTO = z.infer<typeof getByIdSchema>
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type DeleteUserDTO = z.infer<typeof deleteUserSchema>;