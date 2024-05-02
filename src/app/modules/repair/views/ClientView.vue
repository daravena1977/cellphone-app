<template>

  <div class="row">
    <form>
      
    </form>
    <div class="col col-lg-5">
      <PersonalData :isDisabledProp="isDisabled" :showField="showField" 
      :lengendProp="title" />

      <div class="d-flex gap-2">
        <button @click="showTable = true; showPendingOrders = false" class="btn btn-primary w-25 mt-3">
          Historial
        </button>

        <button @click="showTable = true; showPendingOrders = true" class="btn btn-success w-25 mt-3">
          Pendientes
        </button>
      </div>
    </div>

    <div class="col-lg-7">
      <form class="form-control" v-if="showTable && showPendingOrders == false">
        <legend>Historial</legend>
        <hr>
        <TableWorkOrders :workOrders="getClientFound" />

      </form>

      <form class="form-control" v-if="showTable && showPendingOrders">
        <legend>Historial</legend>
        <hr>
        <TableWorkOrders :workOrders="getPendingOrders" />

      </form>

    </div>
  </div>



</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ClientView',

  components: {
    PersonalData: defineAsyncComponent(() => import('@/app/shared/PersonalData')),
    TableWorkOrders: defineAsyncComponent(() => import('@/app/shared/TableWorkOrders'))
  },

  data() {
    return {
      showField: false,
      isDisabled: true,
      showTable: false,
      showPendingOrders: false,
      title: 'Buscar Cliente'
    }
  },

  methods: {
    ...mapMutations('repair', (['resetClientByDni'])),
    onResetClientByDni() {
      this.resetClientByDni()
    }
  },

  computed: {
    ...mapGetters('repair', (['getClientByDni', 'getPendingClientOrder'])),

    getClientFound() {
      return this.getClientByDni.workorders
    },

    getPendingOrders() {
      return this.getPendingClientOrder
    }
  },

  unmounted() {
    this.onResetClientByDni()
  }


} 
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #000;
}
</style>