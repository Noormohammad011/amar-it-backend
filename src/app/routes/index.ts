import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';

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
    {
        path: '/admins',
        route: AdminRoutes,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
