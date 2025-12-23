import z from 'zod';
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import { loginUserSchema, userSchema, createUserSchema, createUserResponse } from '../schema/user.schema';
import { userRepository } from '../repositories/user.repository';
import { http } from '../utils/http';

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', {
        schema: {
            tags: ['auth'],
            description: 'Registro de usuário',
            body: createUserSchema,
            response: {
                201: createUserResponse,
                404: z.object({
                    message: z.string().describe('Data is empty!')
                }),
                409: z.object({
                    message: z.string().describe('User already exists!')
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = createUserSchema.parse(request.body);
            if (!body) {
                return http.notFound(reply, 'Data is empty');
            }

            const existing = await userRepository.getByEmail({ email: body.email });
            if (existing) {
                return http.conflict(reply, 'User already exists!');
            }

            const hashed = await bcrypt.hash(body.password, 10);
            const user = await userRepository.create({ ...body, password: hashed });

            const { password, ...userWithoutPassword } = user;

            return http.created(reply, userWithoutPassword);
        } catch (error) {
            console.error("Houve um erro ao cadastrar usuário: ", error);
            return http.serverError(reply);
        }
    })

    app.post('/login', {
        schema: {
            tags: ['auth'],
            description: 'Login do usuário',
            body: loginUserSchema,
            response: {
                200: z.any(),
                404: z.object({
                    message: z.string().describe('Not found!')
                }),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => {
        try {
            const body = userSchema.parse(request.body);
            const user = await userRepository.getByEmail({ email: body.email });
            if (!user) {
                return http.notFound(reply, 'Email inválido');
            }

            const match = await bcrypt.compare(body.password, user.password);
            if (!match) {
                return http.notFound(reply, 'Senha inválida');
            }

            const accessToken = app.jwt.sign(
                { id: user.id, email: user.email },
                { expiresIn: '1d' }
            )

            const refreshToken = app.jwt.sign(
                { id: user.id },
                { expiresIn: '1d' }
            )

             return reply
                .setCookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/'
                })
                .send({accessToken, user})

        } catch (error) {
            console.error("Houve um erro ao logar no sistema: ", error);
            return http.serverError(reply);
        }
    })

    app.post('/refresh', {
        schema: {
            tags: ['auth'],
            description: 'Refresh do token',
            response: {
                200: z.any(),
                500: z.object({
                    message: z.string().describe('Internal server error!')
                })
            }
        }
    }, async (request, reply) => { 
        const refreshToken = request.cookies.refreshToken;

        if(!refreshToken) {
            return http.unauthorized(reply, 'No refresh token found');
        }

        try {
            const decoded = app.jwt.verify(refreshToken) as { id: string }
            const user = await userRepository.getOnly({ id: decoded.id });

            if(!user) return http.notFound(reply);

            const accessToken = app.jwt.sign(
                {id: user.id, email: user.email},
                { expiresIn: '1d' }
            )

            return http.ok(reply, { accessToken, user })
        } catch (error) {
            console.error("Houve um erro no refresh: ", error);
            return http.serverError(reply);
        }
    })

    app.post('/logout', {
        schema: {
            tags: ['auth'],
            description: 'Logout do usuário',

        }
    }, async (request, reply) => {
        reply.clearCookie('refreshToken', { path: '/' })
        .send({ message: 'Logged out successfuly' })
     })
}
