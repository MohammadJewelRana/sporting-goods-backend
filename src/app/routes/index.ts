import { Router } from 'express';
 
import { UserRoutes } from '../modules/user/user.route';
import { ProductRoutes } from '../modules/products/products.route';
import { AuthRoute } from '../modules/Auth/auth.route';
 
const router = Router();

//all route in array of object
const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/products', route: ProductRoutes },
  { path: '/auth', route: AuthRoute },
 
];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
