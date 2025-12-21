import 'dotenv/config';
import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import {
    validatorCompiler,
    serializerCompiler,
    jsonSchemaTransform,
    ZodTypeProvider
} from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
// import jwt from './plugins/jwt';
import { routes } from './routes/index';


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'cookie_secret_key',
})


app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Typed API',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

// app.register(jwt);

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.register(routes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running!');
    console.log('Docs: http://localhost:3333/docs');
});