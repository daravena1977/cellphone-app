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
}

export const changePrice = ({ commit }, data) => {
    console.log(typeof data.price)
    commit('setNewPrice', data)
}

export const createWorkOrder = async ({ commit }, dataOrder) => {
    await cellPhoneApi.post('/workorders', dataOrder)

    console.log(dataOrder, 'esta es la data order')

    commit('setDataOrder', dataOrder)
}

export const getCorrelativeWorkOrder = async ( { commit } ) => {
    const { data } = await cellPhoneApi.get('/correlative')

    commit('setCorrelativeWorkOrder', data)

    return data

}

export const getClientByDni = async ( { commit }, dni) => {
    console.log(typeof dni)

    const { data } = await cellPhoneApi.post('/client', `dni=${dni}`, config)

    commit('setClientByDni', data)

    return data
}

export const addWorkOrderClientExists = async ( { commit }, dataOrder ) => {

    const { data } = await cellPhoneApi.post('/workorders/client-exists', dataOrder)

    commit('setDataOrder', data)    

}



