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

export const setWorkOrdersByState = (state, data) => {
    state.workOrdersByState = data
}

export const resetDataTableSearchOrders = (state) => {
    state.workOrdersByDate = []
    state.workOrdersByNumber = []
    state.workOrdersByState = []
}

export const updateWorkOrders = (state, newWorkOrders) => {
    state.workOrderUpdate.workorderRepairCellphones = [...newWorkOrders]
}

export const deleteWorkorderRepairCellphone = (state, paramsToDelete) => {

    const { workorders } = state.clientByDni

    let index = workorders.findIndex(workorder => workorder.id === paramsToDelete.idOrder)

    let indexRepair = workorders[index].workorderRepairCellphones
                            .findIndex(repair => repair.id === paramsToDelete.idRepair)

    if (indexRepair !== -1) {
        workorders[index].workorderRepairCellphones.splice(indexRepair, 1)
    }

    /* let index = state.clientByDni.workorders.workorderRepairCellphones.findIndex(repair => repair.id === id)
    
    if (index !== -1) {
        state.clientByDni.workorders.workorderRepairCellphones.splice(index, 1)
    }
    console.log('hizo mutacion delete') */
}