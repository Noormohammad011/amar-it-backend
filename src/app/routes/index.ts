import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { FaqRoute } from '../modules/faq/faq.routes';
import { BlogCategoryRoute } from '../modules/blog-category/blog-category.routes';
import { BlogsRoute } from '../modules/blogs/blogs.routes';
import { PackageRoutes } from '../modules/package/package.routes';
import { HomeBannerContentsRoute } from '../modules/home-banner/home-banner.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { PermissionRoutes } from '../modules/permission/permission.routes';

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
    {
        path: '/packages',
        route: PackageRoutes,
    },
    {
        path: '/home-banner',
        route: HomeBannerContentsRoute,
    },
    {
        path: '/services',
        route: ServiceRoutes,
    },
    //super admin routes
    {
        path: '/permissions',
        route: PermissionRoutes,
    },
];

moduleroutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;
