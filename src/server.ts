import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  ZodTypeProvider
} from 'fastify-type-provider-zod'

import jwt from './plugins/jwt'
import { routes } from './routes'

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
  credentials: true
})

app.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'cookie_secret_key'
})


app.register(swagger, {
  openapi: {
    info: {
      title: 'Typed API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(jwt)


app.register(routes)


app.register(swaggerUi, {
  routePrefix: '/docs'
})

app.listen({ port: 3333, host: '0.0.0.0' })
