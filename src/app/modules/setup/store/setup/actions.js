
// export const myAction = async ({ commit }) => {
// }

import cellPhoneApi from "@/api/cellPhoneApi"

let config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
}

export const loadBrands = async ({ commit }) => {
    const { data } = await cellPhoneApi.get('/brands')

    commit('setBrands', data)
}

export const createBrand = async ({ commit }, nameBrand) => {
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }

    await cellPhoneApi.post('/brands', `name=${nameBrand}`, config)
    const { data } = await cellPhoneApi.get('/brands')


    commit('setBrands', data)

}

export const createModel = async ({ commit }, model) => {
    await cellPhoneApi.post('/models', `nameModel=${model.name}&id=${model.idBrand}`, config)
        .then((response) => {
            const { data } = response
            console.log(data);
            commit('setModel', data)
        })


    const { data } = await cellPhoneApi.get('/brands')

    commit('setBrands', data)

}

export const loadTypesRepairs = async ({ commit }) => {
    const { data } = await cellPhoneApi.get('/repairs')
    commit('setTypesRepairs', data)
}

export const createTypeRepair = async ({ commit }, type) => {
    await cellPhoneApi.post('/repairs', `typeRepair=${type}`, config)

    const { data } = await cellPhoneApi.get('/repairs')

    commit('setTypesRepairs', data)
}

export const createCellphone = async ({ commit }, cellphone) => {
    await cellPhoneApi.post('/cellphones', cellphone)

    const { data } = await cellPhoneApi.get('/cellphones')

    commit('setCellphones', data)
}

export const createRepair = async ({ commit }, repair) => {
    await cellPhoneApi.post('/repaircellphones', repair)

    const { data } = await cellPhoneApi.get('/repaircellphones')

    commit('setRepairCellphones', data)
}