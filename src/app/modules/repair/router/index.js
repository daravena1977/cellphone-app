export default {

    name: 'repair-module',
    component: () => import(/* webpackChunkName: "repair" */ '@/app/modules/repair/layouts/RepairLayout'),
    children: [
        {
            path: '/',
            redirect: '/workorder'
        },
        {   
            path: 'workorder',
            name: 'workorder',
            component: () => import(/* webpackChunkName: "repair-workorder" */ '@/app/modules/repair/views/WorkOrderView'),
        },
    ]   
}