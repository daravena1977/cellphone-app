export default {

    name: 'setup',
    component: () => import(/* webpackChunkName: "setup" */ '@/modules/setup/layouts/SetupLayout'),
    children: [
        {
            path: '',
            name: 'brand',
            component: () => import(/* webpackChunkName: "setup-brand" */ '@/modules/setup/views/BrandView')
        },
        {
            path: 'model',
            name: 'model',
            component: () => import(/* webpackChunkName: "setup-model" */ '@/modules/setup/views/ModelView')
        },
        {
            path: 'repair',
            name: 'repair',
            component: () => import(/* webpackChunkName: "setup-repair" */ '@/modules/setup/views/RepairView')
        },
        {
            path: 'type-repair',
            name: 'type-repair',
            component: () => import(/* webpackChunkName: "setup-type-repair" */ '@/modules/setup/views/TypeRepairView')
        },
    ]
}