<template>
        <span class="input-group-text">Estado</span>
        <select
          @change="$emit('setStatus', $event)"
          class="form-select"
          v-model="stateOrderRecieved"
        >
          <option
            v-for="(status, index) in statusOrders"
            :key="index"
            :value="status"
          >
            {{ status }}
          </option>
        </select>

</template>

<script>
export default {
    name: 'SelectState',

    emits: ['setStatus'],

    data() {
        return {
            statusOrders: ['ENTREGADO', 'PENDIENTE', 'SIN_SOLUCION', 'ANULADA'],
            stateOrderRecieved: this.stateOrderRecievedProp
        }
    },

    props: {
      stateOrderRecievedProp: String
    },

    whatch: {
      stateOrderRecievedProp(value) {
        if (value) {
          this.stateOrderRecieved = value
        }
      }
    }


}
</script>

<style>

</style>