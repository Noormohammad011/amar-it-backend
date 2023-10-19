import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
import { BlogCategoryRoute } from '../modules/blog-category/blog-category.routes';
import { BlogsRoute } from '../modules/blogs/blogs.routes';

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
    {
        path: '/faq',
        route: FaqRoute,
    },
    {
        path: '/blog-category',
        route: BlogCategoryRoute,
    },
    {
        path: '/blogs',
        route: BlogsRoute,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
