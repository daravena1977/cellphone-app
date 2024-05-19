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
          v-model="dataOrder.deliverDate"
          type="date"
          class="form-control"
          placeholder="Fecha entrega"
          aria-label="Fecha"
          aria-describedby="basic-addon4"
        />
        <span class="input-group-text" id="basic-addon11">Estado</span>
        <input
          v-model="dataOrder.stateOrder"
          type="text"
          class="form-control"
          placeholder="Estado orden"
          aria-label="Estado"
          aria-describedby="basic-addon11"
        />
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
      </div>
      <div class="input-group input-group-sm mb-3">
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
          v-model="dataOrder.description"
          class="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>

      <hr />

      <div class="input-group input-group-sm">
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
                { brand, model, typeRepair, payment}, index
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
                <button class="btn save-button">
                  <i class="fa-solid fa-floppy-disk"></i>
                </button>
                <button
                  @click.prevent="$emit('delete-repair', index)"
                  class="btn"
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
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'WorkOrder',

  components: {
    InputToVFor: defineAsyncComponent(() => import('@/app/shared/InputToVFor'))
  },

  data() {
    return {
      dataOrder: {},
      paymentEdit: '',
      isDisabled: true,
      showSave: false,
      totalOrder: 0
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
    }
  },

  watch: {
    dataWorkOrder(value) {
      if (value) {
        this.dataOrder = value
        this.totalOrder = this.getTotalOrderClientByDni()
        console.log(typeof this.dataOrder.workorderRepairCellphones)
      }
    },

    editingMode(value) {
      console.log('paso por editing mode')
      if (value) {
        this.$nextTick(() => {
          this.setButtonSave()

        })
      }
    }
  },

  methods: {
    updateItem(id, newValue) {
      const index = this.dataOrder.workorderRepairCellphones
        .findIndex((item) => item.id === id)

      if (index !== -1) {
        this.dataOrder.workorderRepairCellphones[index].payment = newValue
      }
    },

    editPayment(index) {
      const buttonEdit = document
        .querySelector(`tr:nth-child(${index + 1}) .edit-button`)
      
      buttonEdit.style.display = 'none'

      this.showSave = false

      const buttonSave = document
        .querySelector(`tr:nth-child(${index + 1}) .save-button`)

      buttonSave.style.display = 'inline-block'

      this.$nextTick(() => {
        const inputPayment = document
          .querySelector(`tr:nth-child(${index + 1}) .myInputPayment`)

        inputPayment.removeAttribute('disabled')  
        inputPayment.select()
      })
    },

    setButtonSave() {
      this.dataOrder.workorderRepairCellphones.forEach(( _ , index) => {
          
          const buttonSave = document
            .querySelector(`tr:nth-child(${ index+ 1 }) .save-button`)
  
          buttonSave.style.display = 'none'
        })
    },

    getTotalOrderClientByDni() {
      let total = 0
      this.dataOrder.workorderRepairCellphones.forEach(repair => total+= repair.payment)

      return total
    }

  },

  computed: {
    ...mapGetters('repair', ['getClientByDni']),
    
    
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




/* table {
} */
</style>