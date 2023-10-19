import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleroutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
