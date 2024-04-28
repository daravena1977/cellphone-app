<template>
  <!-- Button trigger modal -->
<button type="button" class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Ver historial
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Historial de Ordenes de Trabajo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <TableWorkOrders :workOrders="workOrdersProps" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
    TableWorkOrders: defineAsyncComponent(() => import('@/app/shared/TableWorkOrders'))
  },

  data() {
    return {
      workOrders: this.workOrdersProps
    }
  },

  props: {
    workOrdersProps: {
      type: Array,
      required: true
    }
  }




}
</script>

<style>

</style>