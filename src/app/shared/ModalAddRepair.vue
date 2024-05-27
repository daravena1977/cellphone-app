<template>
    <div class="modal fade" id="myModalRepair" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-describedby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Agregar reparación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <RepairData />
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle'

export default {
    name: 'ModalAddRepair',

    components: {
        RepairData: defineAsyncComponent(() => import('@/app/shared/RepairData'))
    },

    props: {
        openModal: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        openModal(value) {
            if (value) {
                this.onOpenModal()
            }
        }
    },
    
    methods: {
        onOpenModal() {
            let modal = new bootstrapBundle.Modal(document.getElementById('MyModalRepair'))
            modal.show()
        }
    }

}
</script>

<style></style>