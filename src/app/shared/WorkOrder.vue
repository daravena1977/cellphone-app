<template>
  <form>
    <fieldset>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon1">Nº</span>
        <input
          v-model="dataOrder.number"
          type="number"
          class="form-control"
          placeholder="Nº de orden"
          aria-label="Nº de orden"
          aria-describedby="basic-addon1"
          disabled
        />
        <span class="input-group-text" id="basic-addon3">Fecha ingreso</span>
        <input
          v-model="dataOrder.creationDate"
          type="date"
          class="form-control"
          placeholder="Fecha ingreso"
          aria-label="Fecha"
          aria-describedby="basic-addon3"
          disabled
        />
        <span class="input-group-text" id="basic-addon4">Fecha entrega</span>
        <input
          @change="$emit('updateDeliverDate', $event)"
          v-model="dataOrder.deliverDate"
          type="date"
          class="form-control"
          placeholder="Fecha entrega"
          aria-label="Fecha"
          aria-describedby="basic-addon4"
          :disabled="!editingMode"
        />
        <span v-if="editingMode === false" class="input-group-text" id="basic-addon11">Estado</span>
        <input
          v-if="editingMode === false"
          v-model="dataOrder.stateOrder"
          type="text"
          class="form-control"
          placeholder="Estado orden"
          aria-label="Estado"
          aria-describedby="basic-addon11"
          :disabled="isDisabled"
        />
        <SelectState @setStatus="updateState" v-if="editingMode" :stateOrderRecievedProp="dataOrder.stateOrder" />
      </div>

      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon2">DNI</span>
        <input
          v-model="getClientByDni.dni"
          type="text"
          class="form-control"
          placeholder="DNI del cliente"
          aria-label="dni"
          aria-describedby="basic-addon2"
          disabled
        />
        <span class="input-group-text" id="basic-addon5">Nombre</span>
        <input
          v-model="getClientByDni.firstName"
          type="text"
          class="form-control"
          placeholder="Nombre del cliente"
          aria-label="Nombre"
          aria-describedby="basic-addon5"
          disabled
        />
        <span class="input-group-text" id="basic-addon6">Apellido</span>
        <input
          v-model="getClientByDni.lastName"
          type="text"
          class="form-control"
          placeholder="Apellido del cliente"
          aria-label="Apellido"
          aria-describedby="basic-addon6"
          disabled
        />
      </div>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon7"
          ><i class="fa-solid fa-at"></i
        ></span>
        <input
          v-model="getClientByDni.email"
          type="email"
          class="form-control"
          placeholder="Email"
          aria-label="email"
          aria-describedby="basic-addon7"
          disabled
        />
        <span class="input-group-text" id="basic-addon8"
          ><i class="fa-solid fa-phone-volume"></i
        ></span>
        <input
          v-model="getClientByDni.phoneNumber"
          type="tel"
          class="form-control"
          placeholder="Teléfono"
          aria-label="telefono"
          aria-describedby="basic-addon8"
          disabled
        />
        <span class="input-group-text" id="basic-addon9">Dirección</span>
        <input
          v-model="getClientByDni.address"
          type="text"
          class="form-control"
          placeholder="Dirección del cliente"
          aria-label="Direccion"
          aria-describedby="basic-addon9"
          disabled
        />
      </div>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon10">Comentarios</span>
        <textarea
          @input="$emit('updateDescription', $event)"
          v-model="dataOrder.description"
          class="form-control"
          aria-label="With textarea"
          :disabled="!editingMode"
        ></textarea>
      </div>

      <hr />

      <!-- TODO: colocar aca repairData -->
      
      <div class="input-group input-group-sm">
        <div class="w-75 m-auto mb-2">
          <RepairData class="form-select-sm" v-if="showAddRepair" @addRepair="addRepair" />
  
        </div>
        <table class="table table-bordered table-hover">
          <caption>
            Listado de reparaciones
          </caption>
          <thead class="table-info">
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Reparación</th>
              <th scope="col">Precio</th>
              <th scope="col" v-if="editingMode">Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                { id, brand, model, typeRepair, payment}, index
              ) in dataOrder.workorderRepairCellphones"
              :key="index"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ brand }}</td>
              <td>{{ model }}</td>
              <td>{{ typeRepair }}</td>
              <td 
              >
                <InputToVFor :item="{ brand, model, typeRepair, payment}" 
                :isDisabledProp="isDisabled" @update-item="updateItem" ref="inputPayment" />
              </td>
              <td v-if="editingMode">
                <button
                  @click.prevent="editPayment(index)"
                  class="btn edit-button"
                  v-if="!showSave"
                >
                <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button @click.prevent="setNewPayment(index, id)" class="btn save-button">
                  <i class="fa-solid fa-floppy-disk"></i>
                </button>
                <button
                  @click.prevent="onDeleteWorkorderRepairCellphone(index, id)"
                  class="btn delete-button"
                >
                  <i class="fa-solid fa-trash" style="color: #df1530"></i>
                </button>
                
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="input-group input-group-sm w-25">
          <span class="input-group-text" id="total_orden">Total</span>
          <input
          v-model="totalOrder"
          type="number"
          class="form-control total-order"
          placeholder="Total orden"
          aria-label="Total orden"
          aria-describedby="total_orden"
          disabled
        />

        </div>

      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { defineAsyncComponent } from 'vue'


export default {
  name: 'WorkOrder',

  components: {
    InputToVFor: defineAsyncComponent(() => import('@/app/shared/InputToVFor')),
    SelectState: defineAsyncComponent(() => import('@/app/shared/SelectState')),
    RepairData: defineAsyncComponent(() => import('@/app/shared/RepairData'))
  },

  data() {
    return {
      dataOrder: {},
      paymentEdit: '',
      isDisabled: true,
      showSave: false,
      totalOrder: 0,
      paramsToDelete: {
        idRepair: 0,
        idOrder: 0,
      },
      newWorkorderRepairCellphone: {
        idWorkorder: 0,
        idRepair: 0,
        price: 0,
      }
    }
  },

  props: {
    dataWorkOrder: {
      type: Object,
      default: () => {},
    },

    editingMode: {
      type: Boolean,
      default: false
    },

    saveMode: {
      type: Boolean,
      default: false
    },

    saveData: {
      type: Boolean,
      default: false
    },

    showAddRepair: {
      type: Boolean,
      default: false,
    }
  },

  watch: {
    dataWorkOrder( value ) {
      if ( value ) {
        this.dataOrder = value
        this.getTotalOrderClientByDni()
      }
    },

    editingMode( value ) {
      if ( value ) {
        this.$nextTick(() => {
          this.setButtonSave()
        })
      }
    },

    saveData( value ) {
      if ( value ) {
        this.onSaveData()
      }
    }
  },

  methods: {
  ...mapActions('repair', ['updateWorkOrder', 'loadClientByDni', 
  'deleteWorkorderRepairCellphoneById', 'loadRepairCellphone', 
  'addWorkorderRepairCellphone']),
  ...mapMutations('repair', ['updateWorkOrders', 'resetRepairsTable']),

    updateItem( id, newValue ) {
      const index = this.dataOrder.workorderRepairCellphones
        .findIndex(( item ) => item.id === id)
 
      if ( index !== -1 ) {
        this.dataOrder.workorderRepairCellphones[ index ].payment = newValue
      }
    },

    editPayment( index ) {
      const buttonEdit = document
        .querySelector(`tr:nth-child(${ index + 1 }) .edit-button`)
      
      buttonEdit.style.display = 'none'

      this.showSave = false

      const buttonSave = document
        .querySelector(`tr:nth-child(${ index + 1 }) .save-button`)

      buttonSave.style.display = 'inline-block'

      this.$nextTick(() => {
        const inputPayment = document
          .querySelector(`tr:nth-child(${ index + 1 }) .myInputPayment`)

        inputPayment.removeAttribute( 'disabled' )  
        inputPayment.select()
      })
    },

    setButtonSave() {
      this.dataOrder.workorderRepairCellphones.forEach((  _ , index ) => {
          
          const buttonSave = document
            .querySelector(`tr:nth-child(${ index+ 1 }) .save-button`)
  
          buttonSave.style.display = 'none'
        })
    },

    getTotalOrderClientByDni() {
      let total = 0
      this.dataOrder.workorderRepairCellphones
        .forEach(repair => total+= repair.payment)

      this.totalOrder = total
    },

    setNewPayment( index, id ) {
      const inputPayment = document
        .querySelector(`tr:nth-child(${ index + 1 }) .myInputPayment`)
        
      const buttonSave = document
        .querySelector(`tr:nth-child(${ index + 1 }) .save-button`)
        
      buttonSave.style.display = 'none'

      const buttonEdit = document
        .querySelector(`tr:nth-child(${ index + 1 }) .edit-button`)

      buttonEdit.style.display = 'inline-block'

      inputPayment.setAttribute( 'disabled', 'true' )

      this.dataOrder.workorderRepairCellphones.forEach(order => {
        if ( order.id === id ) {
          order.payment = parseInt( inputPayment.value )
        }
      })

      this.getTotalOrderClientByDni()

      this.onSaveData()
    },

    onDeleteWorkorderRepairCellphone( index, id ) {

      this.paramsToDelete.idRepair = id
      this.paramsToDelete.idOrder = this.dataOrder.id

      this.deleteWorkorderRepairCellphoneById( this.paramsToDelete ).then(() => {
        let indexOrder = this.dataOrder.workorderRepairCellphones.findIndex( repair => repair.id === id )

        if ( indexOrder !== -1 ) {
          this.dataOrder.workorderRepairCellphones.splice( indexOrder, 1 )
          this.getTotalOrderClientByDni()
        }
      })
      
    },

    updateState( $event ) {
        console.log($event.target.value)
        this.dataOrder.stateOrder = $event.target.value

    },

    updateDeliverDate( $event ) {
      this.dataOrder.deliverDate = $event.target.value
    },

    updateDescription( $event ) {
      this.dataOrder.description = $event.target.value
    },    

    onSaveData() {
      this.updateWorkOrder( this.dataOrder ).then(() => {
        this.loadClientByDni( this.getDniCurrentClient )
        this.$emit( 'setSaveData', false )
      })
    },

    addRepair( repair ) {
      this.loadRepairCellphone( repair ).then(( data ) => {
        this.newWorkorderRepairCellphone.price = data.price
        this.newWorkorderRepairCellphone.idWorkorder = this.dataOrder.id
        this.newWorkorderRepairCellphone.idRepair = data.id

        this.addWorkorderRepairCellphone( this.newWorkorderRepairCellphone ).then(() => {

          this.loadClientByDni( this.getDniCurrentClient ).then(() => {
            let workOrderCurrent = this.getWorkordersClientByDni.filter(workOrder => workOrder.id === this.dataOrder.id)    
  
            this.dataOrder.workorderRepairCellphones = workOrderCurrent[0].workorderRepairCellphones

            this.getTotalOrderClientByDni()

            this.resetRepairsTable()
  
            this.$nextTick(() => {
              this.setButtonSave()
  
            })
          })          
        })
      })
    }
  },

  computed: {
    ...mapGetters('repair', ['getClientByDni', 'getNewWorkorderRepairCellphone', 'getWorkordersClientByDni']),

    getDniCurrentClient() {
      const { dni: dniCurrentClient } = this.getClientByDni
      return dniCurrentClient
    }    
  },

}
</script>

<style lang="scss" scoped>
td,
th {
  vertical-align: middle;
  text-align: center;
  font-size: small;
}

td {
  padding: 0px;
}

table {
  margin: auto;
  transform: scale(0.9);
}

.input-group {
  justify-content: end;
}

.total-order {
  text-align: end;
}
</style>