// export const myAction = async ({ commit }) => {
// }

import cellPhoneApi from "@/api/cellPhoneApi"

// let config = {
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//     }
// }



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

    commit('setDataOrder', dataOrder)
}

export const getCorrelativeWorkOrder = async ( { commit } ) => {
    const { data } = await cellPhoneApi.get('/correlative')

    commit('setCorrelativeWorkOrder', data)

    return data

}

