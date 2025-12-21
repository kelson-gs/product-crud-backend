import { FastifyReply } from 'fastify'

export const http = {
  ok: (reply: FastifyReply, data: any) => reply.status(200).send(data),
  created: (reply: FastifyReply, data: any) => reply.status(201).send(data),
  noContent: (reply: FastifyReply) => reply.status(204).send(),
  badRequest: (reply: FastifyReply, message = 'Bad request') => reply.status(400).send({ message }),
  unauthorized: (reply: FastifyReply, message = 'Unauthorized') => reply.status(401).send({ message }),
  forbidden: (reply: FastifyReply, message = 'Forbidden') => reply.status(403).send({ message }),
  notFound: (reply: FastifyReply, message = 'Not found') => reply.status(404).send({ message }),
  conflict: (reply: FastifyReply, message = 'Conflict') => reply.status(409).send({ message }),
  unprocessable: (reply: FastifyReply, message = 'Unprocessable entity') => reply.status(422).send({ message }),
  serverError: (reply: FastifyReply, message = 'Internal server error') => reply.status(500).send({ message })
}