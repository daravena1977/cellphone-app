export default () => ({
    repairs: [],
    dataOrder: {},
    correlativeWorKOrder: 0,
    clientByDni: {},
    workOrdersByNumber: [],
    workOrdersByDate: [],
    workOrdersByState: [],
    workOrderUpdate: {
        id: 0,
        deliverDate: '',
        description: '',
        stateOrder: '',
        workorderRepairCellphones: []
    },
    repairDeleted: {}
})