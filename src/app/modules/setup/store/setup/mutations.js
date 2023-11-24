
// export const myAction = ( state ) => {

// }

export const setBrands = ( state, brands ) => {
    state.brands = brands

}

export const addBrand = ( state, brand ) => {
    state.brands.add(brand)

}

export const setTypesRepairs = ( state, types ) => {
    state.typesRepairs = types
    
}

export const setCellphones = ( state, cellphones ) => {
    state.cellphones = cellphones
    
}

export const setModel = ( state, model ) => {
    state.model = model
    
}

export const setRepairCellphones = ( state, repairs ) => {
    state.repairCellphones = repairs
    
}