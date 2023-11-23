export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "auth-login" */ '@/modules/auth/views/LoginView')
        },
        {
            path: 'signup',
            name: 'signup',
            component: () => import(/* webpackChunkName: "auth-register" */ '@/modules/auth/views/RegisterView')
        },
        
    ]
}