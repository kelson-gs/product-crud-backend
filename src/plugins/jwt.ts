import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import type { FastifyTypeInstance,  } from '../typeInstances';

export default fp(async (app: FastifyTypeInstance) => {
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'supersecretkey'
    })

})