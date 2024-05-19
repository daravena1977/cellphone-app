<template>
  <div class="row">
    <form></form>
    <div class="col col-lg-5">
      <PersonalData @send-dni="validateDni" @sendClientExists="setClientExists" :isDisabledProp="isDisabled"
        :showField="showField" :lengendProp="title" :resetFormFromClientView="resetClientDataForm"
        :focusInputDni="resetDniData" />

      <div class="d-flex gap-2">
        <button @click="
            showTable = true;
            showPendingOrders = false;
            tableTitle = 'Historial de ordenes de trabajo'
          " class="btn btn-primary w-25 mt-3" :disabled="Object.keys(getClientByDni).length == 0">
          Historial
        </button>

        <button @click="
            showTable = true;
            showPendingOrders = true;
            tableTitle = 'Ordenes de trabajo pendientes'
          " class="btn btn-success w-25 mt-3" :disabled="Object.keys(getClientByDni).length == 0">
          Pendientes
        </button>
      </div>
    </div>

    <div class="col-lg-7">
      <form class="form-control" v-if="showTable && showPendingOrders == false">
        <legend>{{ tableTitle }}</legend>
        <hr />
        <TableWorkOrders @sendDataWorkOrdersRepairs="setDataWorkOrder" @openModalWorkOrder="setShowModal" :workOrders="getClientFound" />
      </form>

      <form class="form-control" v-if="showTable && showPendingOrders">
        <legend>{{ tableTitle }}</legend>
        <hr />
        <TableWorkOrders @sendDataWorkOrdersRepairs="setDataWorkOrder" @openModalWorkOrder="setShowModal" :workOrders="getPendingOrders" />
      </form>
      <!-- Modal WorkOrder -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Orden de trabajo</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <WorkOrder :editingMode="editingMode" :dataWorkOrder="dataWorkOrder" />
            </div>
            <div class="modal-footer">
              <button v-if="!editingMode" @click="editingMode = true" type="button" class="btn btn-primary">
                Editar
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle'
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
    WorkOrder: defineAsyncComponent(() => import('@/app/shared/WorkOrder')),
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
      showModal: false,
      dataWorkOrder: {},
      editingMode: false,
      modalWorkOrder: {}
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
    },

    setShowModal() {
      let modal = new bootstrapBundle.Modal(document.getElementById('myModal'))
      this.modalWorkOrder = modal
      modal.show()
    },

    closeModal() {
      this.showModal = false
    },

    setDataWorkOrder(data) {
      this.dataWorkOrder = data
    },

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

  activated() {
    console.log('activated')
  },

  deactivated() {
    console.log('deactivated')
  },
}
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #000;
}
</style>