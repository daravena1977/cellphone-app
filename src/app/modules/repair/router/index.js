
export default {

    name: 'repair-module',
    component: () => import(/* webpackChunkName: "repair" */ '@/app/modules/repair/layouts/RepairLayout'),
    children: [
        {   
            path: 'workorder',
            name: 'workorder',
            component: () => import(/* webpackChunkName: "repair-workorder" */ '@/app/modules/repair/views/WorkOrderView'),
        },
        {
            path: 'client',
            name: 'client',
            component: () => import(/* webpackChunkName: "repair-client" */ '@/app/modules/repair/views/ClientView')
        },
        {
            path: 'search-order',
            name: 'search-order',
            component: () => import(/* webpackChunkName: "repair-search-order" */ '@/app/modules/repair/views/SearchOrderView')
        }
    ]   
}