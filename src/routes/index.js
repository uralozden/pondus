import AuthRouter from './auth/auth.router';
import UserRouter from './user/user.router';
const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, AuthRouter.route());
    app.use(UserRouter.routePrefix, UserRouter.route());

}

export default AppRoutes;