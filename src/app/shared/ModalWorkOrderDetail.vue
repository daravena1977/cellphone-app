<template>
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
              <button v-if="!editingMode" @click="editingMode = true; showButtonSave = true" type="button" class="btn btn-primary">
                Editar
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button v-if="showButtonSave" type="button" class="btn btn-danger">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: 'ModalWorkOrderDetail',

    components: {
        WorkOrder: defineAsyncComponent(() => import('@/app/shared/WorkOrder')),
    }

}
</script>

<style>

</style>