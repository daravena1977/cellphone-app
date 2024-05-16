<template>
  <table class="table table-sm table-hover table-bordered caption-top">
    <caption>
      Listado de ordenes de trabajo
    </caption>
    <thead class="table-info">
      <tr>
        <th scope="col">Nº</th>
        <th scope="col">Fecha</th>
        <th scope="col">Fecha entrega</th>
        <th scope="col">Estado</th>
        <th scope="col">Ver</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr
        v-for="(
          {
            id,
            number,
            creationDate,
            deliverDate,
            description,
            stateOrder,
            workorderRepairCellphones,
            idClient,
          },
          index
        ) in workOrders"
        :key="index"
      >
        <th scope="row">{{ number }}</th>
        <td>{{ formatDate(creationDate) }}</td>
        <td>{{ formatDate(deliverDate) }}</td>
        <td>{{ stateOrder }}</td>
        <td>
          <button
            @click.prevent="
              openModal();
              setDataOrder({
                id,
                number,
                creationDate,
                deliverDate,
                description,
                stateOrder,
                workorderRepairCellphones,
                idClient,
              })
            "
            class="btn"
          >
            <i class="fa-solid fa-eye" style="color: #e74c3c"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TableWorkOrders',

  data() {
    return {
      show: true,
    }
  },

  props: {
    workOrders: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },

    openModal() {
      console.log('paso por modal')
      this.$emit('openModalWorkOrder')
    },

    setDataOrder(data) {
      console.log(data)
      this.$emit('sendDataWorkOrdersRepairs', data)
    },
  },
}
</script>

<style scoped lang="scss">
td,
th {
  vertical-align: middle;
  text-align: center;
  height: 0.3rem;
}

table {
  transform: scale(0.85);
}

</style>