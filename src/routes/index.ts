import type { FastifyTypeInstance } from '../typeInstances';
import { productsRoutes } from './products.route';
// import { storeRoutes } from './store.routes';
// import { productClickRoutes } from './productClick.routes';
// import { productImageRoutes } from './productImage.route';
// import { authRoutes } from './auth.routes';
// import { paymentRoutes } from './payments.routes';
// import { stripeWebhookRoutes } from './payment.webhook';
// import { cloudinaryRoutes } from './cloudinary.route';

export async function routes(app: FastifyTypeInstance) {
    // app.register(storeRoutes)
    app.register(productsRoutes)
   
    // app.register(authRoutes, { prefix: 'auth' })

}