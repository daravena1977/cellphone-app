<template>
  <div class="row">
    <form></form>
    <div class="col col-lg-5">
      <PersonalData
        @send-dni="validateDni"
        @sendClientExists="setClientExists"
        :isDisabledProp="isDisabled"
        :showField="showField"
        :lengendProp="title"
        :resetFormFromClientView="resetClientDataForm"
        :focusInputDni="resetDniData"
      />

      <div class="d-flex gap-2">
        <button
          @click="
            showTable = true; 
            showPendingOrders = false;
            tableTitle = 'Historial de ordenes de trabajo'
          "
          class="btn btn-primary w-25 mt-3"
          :disabled="Object.keys(getClientByDni).length == 0"
        >
          Historial
        </button>

        <button
          @click="
            showTable = true;
            showPendingOrders = true;
            tableTitle = 'Ordenes de trabajo pendientes'
          "
          class="btn btn-success w-25 mt-3"
          :disabled="Object.keys(getClientByDni).length == 0"
        >
          Pendientes
        </button>
      </div>
    </div>

    <div class="col-lg-7">
      <form class="form-control" v-if="showTable && showPendingOrders == false">
        <legend>{{ tableTitle }}</legend>
        <hr />
        <TableWorkOrders :workOrders="getClientFound" />
      </form>

      <form class="form-control" v-if="showTable && showPendingOrders">
        <legend>{{ tableTitle }}</legend>
        <hr />
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
    PersonalData: defineAsyncComponent(() =>
      import('@/app/shared/PersonalData')
    ),
    TableWorkOrders: defineAsyncComponent(() =>
      import('@/app/shared/TableWorkOrders')
    ),
  },

  data() {
    return {
      dataClient: {},
      showField: false,
      isDisabled: true,
      showTable: false,
      showPendingOrders: false,
      resetClientDataForm: false,
      tableTitle: '',
      clientExists: false,
      resetDniData: false,
      title: 'Buscar Cliente',
    }
  },

  methods: {
    ...mapMutations('repair', ['resetClientByDni']),

    onResetClientByDni() {
      this.resetClientByDni()
    },

    setDataClient(data) {
      this.dataClient = data
    },

    validateDni(dni) {
      if (dni.length === 0) {
        this.resetClientDataForm = true
        this.onResetClientByDni()
        this.showTable = false
      } else {
        this.resetClientDataForm = false
      }
    },

    setClientExists(clientExists) {
      if (!clientExists) {
        this.resetDniData = true
      }
    }
  },

  computed: {
    ...mapGetters('repair', ['getClientByDni', 'getPendingClientOrder']),

    getClientFound() {
      return this.getClientByDni.workorders
    },

    getPendingOrders() {
      return this.getPendingClientOrder
    },
  },

  unmounted() {
    this.onResetClientByDni()
  },
}
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #000;
}
</style>