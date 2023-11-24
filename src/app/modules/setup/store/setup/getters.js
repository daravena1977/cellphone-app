
// export const myGetter = ({ state }) => {
    // return state.algo
// }


export const getBrands = ( state ) => {

    return state.brands

}

export const getModels = ( state ) => ( idBrand ) =>  {

    const models = state.brands
        .filter(brand => brand.id === idBrand)
        .map(brand => brand.models)        

    const [ filterModels ] = models

    return filterModels
}

export const getTypesRepairs = ( state ) => {

    return state.typesRepairs

}