import { Router } from 'express';
import { PracticeRoute } from '../modules/practiseModule/practiseModule.route';
 
const router = Router();

//all route in array of object
const moduleRoutes = [
  { path: '/', route: PracticeRoute },
 
];

//just looping the routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
