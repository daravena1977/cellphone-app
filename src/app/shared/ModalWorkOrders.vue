<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary w-25"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Ver historial
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Historial de Ordenes de Trabajo
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <TableWorkOrders :workOrders="workOrdersProps" 
          @sendDataWorkOrdersRepairs="setDataWorkOrder" @openModalWorkOrder="handleModal" />
        </div>

        <!-- Modal WorkOrderDetail -->
          <ModalWorkOrderDetails @close-modal="closeModal" :openModal="openModal" :dataWorkOrder="dataWorkOrder"/>

        <!-- footer Modal WorkORder -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ModalWorkOrders',
  components: {
    TableWorkOrders: defineAsyncComponent(() =>
      import('@/app/shared/TableWorkOrders')
    ),
    ModalWorkOrderDetails: defineAsyncComponent(() => import('@/app/shared/ModalWorkOrderDetail'))
  },

  data() {
    return {
      workOrders: this.workOrdersProps,
      openModal: false,
      dataWorkOrder: {},
    }
  },

  props: {
    workOrdersProps: {
      type: Array,
      required: true,
    },
  },

  methods: {
    handleModal() {
      this.openModal = true
      console.log('se llamo al modal')
    },

    setDataWorkOrder(data) {
      this.dataWorkOrder = data
    },

    closeModal() {
      this.openModal = false
    }
  }
}
</script>

<style>
</style>