<template>
        <table class="table table-hover mb-3">
            <thead class="table-info">
                <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Reparación</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" ({ cellphone, repair, price }, index) in repairsData" 
                :key="repair.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ cellphone.brand }}</td>
                    <td>{{ cellphone.model }}</td>
                    <td>{{ repair.repairType }}</td>
                    <td @keypress.enter="$emit('edit-price',[index, $event.target.firstChild.data])" 
                    contenteditable="true">{{ price }}</td>
                    <td><button @click.prevent="$emit('delete-repair', index)" class="btn"><i class="fa-solid fa-trash" style="color: #df1530;"></i></button></td>
                </tr>
                
            </tbody>
        </table>
</template>

<script>
export default {
    props: {
        repairsData: Array,
        newPrice: Number
    },

    
}
</script>

<style lang="scss" scoped>

// table {
//   transform: scale(0.8);
// }
td, th {
    vertical-align: middle;
    text-align: center;
}
.btn {
    line-height: 1;
}
</style>