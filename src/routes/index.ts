import type { FastifyTypeInstance } from '../typeInstances';
import { productsRoutes } from './products.route';
import { authRoutes } from './auth.route';

export async function routes(app: FastifyTypeInstance) {
    app.register(productsRoutes)
    app.register(authRoutes, { prefix: 'auth' })

}