import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleroutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
   
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
