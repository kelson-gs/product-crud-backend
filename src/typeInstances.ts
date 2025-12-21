import type { 
    FastifyBaseLogger, 
    FastifyInstance, 
    FastifyReply, 
    FastifyRequest, 
    RawReplyDefaultExpression, 
    RawRequestDefaultExpression, 
    RawServerDefault } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type FastifyTypeInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
> 
