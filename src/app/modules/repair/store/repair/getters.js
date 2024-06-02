export const getRepairs = (state) => {
    return state.repairs
}

export const getTotalOrder = (state) => {
    let total = 0
    state.repairs.forEach((repair) => total += repair.price)

    return total
}

export const getDataOrder = (state) => {
    return state.dataOrder
}

export const getClientByDni = (state) => {
    return state.clientByDni
}

export const getPendingClientOrder = (state) => {
    if (Object.keys(state.clientByDni).length > 0) {
        return state.clientByDni.workorders
            .filter(order => order.stateOrder == 'PENDIENTE')
    }
    return
}

/* Modulo de consultas */

export const getTableWorkOrdersByNumber = (state) => {
    return state.workOrdersByNumber
}

export const getTableWorkOrdersByDate = (state) => {
    return state.workOrdersByDate
}

export const getTableWorkOrdersByState = (state) => {
    return state.workOrdersByState
}

export const getNewWorkorderRepairCellphone = (state) => {
    return state.newWorkorderRepairCellphone
}

export const getWorkordersClientByDni = ( state ) => {
    return state.clientByDni.workorders
}