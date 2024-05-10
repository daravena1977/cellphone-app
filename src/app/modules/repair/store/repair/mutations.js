export const setRepairCellphone = (state, repairCellphone) => {
    state.repairs.push(repairCellphone)

}

export const deleteRepairCellphone = (state, repairCellphone) => {
    state.repairs.pop(repairCellphone)
}

export const setNewPrice = (state, data) => {
    state.repairs.forEach((repair, index) => {
        if (index === data.index){
            repair.price = data.price
        }
    });
}

export const setDataOrder = (state, data) => {
    state.dataOrder = data
}

export const setCorrelativeWorkOrder = (state, data) => {
    state.correlativeWorkOrder = data
}

export const resetRepairsTable = (state) => {
    state.repairs = []
}

export const resetDataOrder = (state) => {
    state.dataOrder = {}
}

export const setClientByDni = (state, data) => {
    state.clientByDni = data
}

export const resetClientByDni = (state) => {
    state.clientByDni = {}
}

export const setWorkOrdersByNumber = (state, data) => {
    state.workOrdersByNumber = data
}

export const setWorkOrdersByDate = (state, data) => {
    state.workOrdersByDate = data
}

export const resetDataTableSearchOrders = (state) => {
    state.workOrdersByDate = []
    state.workOrdersByNumber = []
}