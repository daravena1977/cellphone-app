<template>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Orden de trabajo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <WorkOrder @setSaveData="setSaveData" :editingMode="editingMode" :dataWorkOrder="dataWorkOrder" :saveData="saveData" />
                </div>
                <div class="modal-footer">
                    <button v-if="!editingMode" @click="editingMode = true; showButtonSave = true" type="button"
                        class="btn btn-primary">
                        Editar
                    </button>
                    <button @click="$emit('close-modal')" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button @click="saveData = true; editingMode = false; showButtonSave = false" v-if="showButtonSave" type="button" class="btn btn-danger">
                        Guardar
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
    name: 'ModalWorkOrderDetail',

    components: {
        WorkOrder: defineAsyncComponent(() => import('@/app/shared/WorkOrder')),
    },

    data() {
        return {
            editingMode: false,
            showButtonSave: false,
            saveData: false
        }
    },

    watch: {
        openModal(value) {
            if (value) {
                this.onOpenModal()
            }
        }
    },

    props: {
        openModal: {
            type: Boolean,
            default: false
        },

        dataWorkOrder: {
            type: Object,
            default: () => { }
        }
    },

    methods: {
        onOpenModal() {
            let modal = new bootstrapBundle.Modal(document.getElementById('myModal'))
            modal.show()
        },

        setSaveData(value) {
            this.saveData = value
        }

    },

}
</script>

<style></style>