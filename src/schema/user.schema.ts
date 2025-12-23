import z from 'zod';

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const createUserSchema = userSchema.omit({ id: true });
export const createUserResponse = userSchema.omit({password: true});
export const getByEmailSchema = userSchema.pick({email: true});
export const getByIdSchema = userSchema.pick({id: true});
export const updateUserSchema = userSchema;
export const deleteUserSchema = userSchema.pick({ id: true });
export const loginUserSchema = userSchema.pick({email: true, password: true});