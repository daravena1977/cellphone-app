// export const myAction = async ({ commit }) => {
// }

import cellPhoneApi from "@/api/cellPhoneApi"

let config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
}



export const loadRepairCellphone = async ({ commit }, repair) => {
    // let config = {
    //     headers: {
    //         'content-type' : 'application/json'
    //     }
    // }

    const { data } = await cellPhoneApi.post('/repaircellphone', repair)

    commit('setRepairCellphone', data)

    return data
}

export const changePrice = ({ commit }, data) => {
    commit('setNewPrice', data)
}

export const createWorkOrder = async ({ commit }, dataOrder) => {
    await cellPhoneApi.post('/workorders', dataOrder)

    commit('setDataOrder', dataOrder)
}

export const getCorrelativeWorkOrder = async ({ commit }) => {
    const { data } = await cellPhoneApi.get('/correlative')

    commit('setCorrelativeWorkOrder', data)

    return data

}

export const loadClientByDni = async ({ commit }, dni) => {

    const { data } = await cellPhoneApi.post('/client', `dni=${dni}`, config)

    commit('setClientByDni', data)

    return data
}

export const addWorkOrderClientExists = async ({ commit }, dataOrder) => {

    const { data } = await cellPhoneApi.post('/workorders/client-exists', dataOrder)

    commit('setDataOrder', data)

}

export const findWorkOrdersByNumber = async ({ commit }, numberOrder) => {
    const { data } = await cellPhoneApi.get('/workorders/all-by-number',
        {
            params: {
                number: numberOrder
            }
        })

    commit('setWorkOrdersByNumber', data)
    return data
}

export const findWorkOrdersByDate = async ({ commit }, paramsDate) => {

    const { startDate, endDate } = paramsDate

    const { data } = await cellPhoneApi.get('/workorders/find-by-date',
        {
            params: {
                startDateStr: startDate,
                endDateStr: endDate
            }
        })

    commit('setWorkOrdersByDate', data)

    return data
}

export const findWorkOrdersByState = async ({ commit }, stateOrder) => {
    const { data } = await cellPhoneApi.get('/workorders/find-by-state',
        {
            params: {
                stateOrder
            }
        })

    commit('setWorkOrdersByState', data)

    return data
}

export const updateWorkOrder = async ({ commit }, workOrderUpdated) => {
    const { data } = await cellPhoneApi.put('/workorders/update', workOrderUpdated)

    commit('setWorkOrderUpdated', data)

    return data
}

export const deleteWorkorderRepairCellphoneById = async ({ commit }, paramsToDelete) => {

    const { idRepair } = paramsToDelete

    await cellPhoneApi.delete('/workorderRepairCellphone/delete-by-id', {
        params: {
            id: idRepair
        }
    }).then(() => {
        console.log('hizo delete en bd')

    })
    commit('deleteWorkorderRepairCellphone', paramsToDelete)

}

export const addWorkorderRepairCellphone = async ({ commit }, 
    newWorkorderRepairCellphone) => {
        
     await cellPhoneApi.post('/workordersRepairCellphone/new-repair',
        newWorkorderRepairCellphone)
        .then((data) => {
            commit('setNewWorkorderRepairCellphone', data)        
        })
        .catch(err => {
            console.log(err)
            alert('No puede agregar de nuevo este tipo de reparación')
        })

}

export const loadClientById = async ({ commit }, idClient) => {
    const { data } = await cellPhoneApi.get('/client/by-id', {
        params: {
            id: idClient
        }
    })
        commit('setClientById', data)
        return data
}
