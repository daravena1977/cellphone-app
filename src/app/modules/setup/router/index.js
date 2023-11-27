export default {

    name: 'setup',
    component: () => import(/* webpackChunkName: "setup" */ '@/app/modules/setup/layouts/SetupLayout'),
    children: [
        {
            path: 'brand',
            name: 'brand',
            component: () => import(/* webpackChunkName: "setup-brand" */ '@/app/modules/setup/views/BrandView'),   
        },
        {
            path: 'model',
            name: 'model',
            component: () => import(/* webpackChunkName: "setup-model" */ '@/app/modules/setup/views/ModelView'),
        },
        {
            path: 'repair',
            name: 'repair',
            component: () => import(/* webpackChunkName: "setup-repair" */ '@/app/modules/setup/views/RepairView'),
        },
        {
            path: 'type-repair',
            name: 'type-repair',
            component: () => import(/* webpackChunkName: "setup-type-repair" */ '@/app/modules//setup/views/TypeRepairView')
        },
    ]
}