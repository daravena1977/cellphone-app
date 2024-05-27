<template>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Orden de trabajo</h5>
                    <button @click="$emit('close-modal')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <WorkOrder :showAddRepair="showAddRepair" @setSaveData="setSaveData" :editingMode="editingMode" :dataWorkOrder="dataWorkOrder"
                        :saveData="saveData" />
                </div>
                <div class="modal-footer">
                    <div class="input-group flex-nowrap gap-2 justify-content-end">
                        <div v-if="editingMode" class="input-group w-auto flex-nowrap">
                                <button class="btn" style="background-color: #f6ae2d;">
                                    <i class="fas fa-mobile-alt" style="color: white;"></i><i class="fas fa-tools" style="color: white;"></i>
                                </button>
                                <button @click="showAddRepair = true" class="btn btn-warning" style="color: white;">
                                    Agregar reparación
                                </button>
                            </div>
                            <div class="input-group w-auto flex-nowrap">
                                <button v-if="!editingMode" @click="editingMode = true; showButtonSave = true" type="button" class="btn" style="background-color: #da5552;">
                                    <i class="fa-solid fa-pen-to-square" style="color: white;"></i>
                                </button>
                                <button v-if="!editingMode" @click="editingMode = true; showButtonSave = true" type="button"
                                    class="btn btn-danger">
                                    Editar
                                </button>
                            </div>
                        <div class="input-group w-auto flex-nowrap">
                            <button @click="$emit('close-modal')" type="button" class="btn" data-bs-dismiss="modal" style="background-color: #2d6a4f;">
                                <i class="fa-solid fa-door-open" style="color: white;"></i>
                            </button>
                            <button @click="$emit('close-modal')" type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                        <div class="input-group w-auto flex-nowrap">
                            <button @click="saveData = true; editingMode = false; showButtonSave = false"
                                v-if="showButtonSave" class="btn" style="background-color: #da5552;">
                                <i class="fa-regular fa-floppy-disk" style="color: white;"></i>
                            </button>
                            <button @click="saveData = true; editingMode = false; showButtonSave = false;
                             showAddRepair = false"
                                v-if="showButtonSave" type="button" class="btn btn-danger">
                                Guardar
                            </button>
                        </div>
                    </div>
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
            saveData: false,
            showAddRepair: false,
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

<style lang="scss" scoped>
</style>