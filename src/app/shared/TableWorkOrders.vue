<template>
  <table class="table table-sm table-hover">
    <thead class="table-warning">
        <tr>
            <th scope="col">Nº</th>
            <th scope="col">Fecha</th>
            <th scope="col">Fecha entrega</th>
            <th scope="col">Estado</th>
            <th scope="col">Ver</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">
        <tr v-for="({ number, creationDate, deliverDate, stateOrder }, index) in workOrders" :key="index">
            <th scope="row">{{ number }}</th>
            <td>{{ creationDate }}</td>
            <td>{{ deliverDate }}</td>
            <td>{{ stateOrder }}</td>
            <td></td>
        </tr>
    </tbody>

  </table>
</template>

<script>
export default {
name: 'TableWorkOrders',

    props: {
        workOrders: {
            type: Array,
            required: true,
            default: () => []
        }
    },

}
</script>

<style scoped lang="scss">
td, th {
    vertical-align: middle;
    text-align: center;
}

table {
    transform: scale(0.85);
}

</style>