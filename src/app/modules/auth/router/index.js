export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/app/modules/auth/layouts/AuthLayout'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "auth-login" */ '@/app/modules/auth/views/LoginView'),
        },
        {
            path: 'signup',
            name: 'signup',
            component: () => import(/* webpackChunkName: "auth-register" */ '@/app/modules/auth/views/RegisterView'),
        },
        
    ]
}