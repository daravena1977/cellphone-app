
export const hasNoDuplicates = (array) => {

    const uniqueArray = array.filter(element => {
        return !array.some(item => item.id === element.id)
    })


    alert('este tipo de reparacion ya fue ingresado')

    console.log('unique', uniqueArray)

    return uniqueArray




}