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

/* export const changePrice = (state) => (index, value) => {
    return state.repairs.forEach((repair) => {
        if (repair.indexOf === index) {
            repair.price = value
        }
    })
} */