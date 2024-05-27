<template>
  <div class="form-order">
    <div class="personal-data">
      <PersonalData
        @form-data="setDataForm"
        @sendClientExists="onSendClientExists"
        class="mb-3"
        :saved="savedWorkOrder"
        :correlative="correlative"
        :resetStatus="resetStatus"
      />
    </div>

    <div class="repair-data form-control">
      <div class="d-flex flex-column">
        <RepairData @addRepair="getRepair" class="mb-4" />
        <div>
          <TableRepairData
            v-if="getRepairsData.length > 0"
            class="table-repair"
            @edit-price="newPrice"
            @delete-repair="removeRepair"
            :repairsData="getRepairsData"
          />
        </div>
      </div>

      <div class="form-floating mb-4">
        <textarea
          v-model="description"
          class="form-control h-50"
          placeholder="Leave a comment here"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">Comentarios</label>
      </div>

      <div
        class="d-flex gap-2 justify-content-end align-items-center mt-2 mb-3"
      >
        <span>Total: </span>
        <input
          v-model="getTotal"
          class="form-control w-25"
          type="number"
          disabled
          placeholder="0"
        />
      </div>
      <hr />
      <div class="d-flex gap-3 justify-content-end mb-3">
        <ModalWorkOrders
          :workOrdersProps="getWortkOrdersClient"
          v-if="clientExists"
        />

        <button
          v-if="correlative == 0"
          @click="setCorrelativeNumber"
          class="btn btn-success w-25"
          :disabled="completeInformation"
        >
          Asignar número
        </button>

        <button v-if="correlative > 0" class="btn btn-danger w-25">
          Cancelar
        </button>

        <button
          v-if="correlative > 0"
          @click="clientExists ? addWorkOrder() : newOrder()"
          class="btn btn-success w-25"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  components: {
    PersonalData: defineAsyncComponent(() =>
      import('@/app/shared/PersonalData')
    ),
    RepairData: defineAsyncComponent(() => import('@/app/shared/RepairData')),
    TableRepairData: defineAsyncComponent(() =>
      import('@/app/shared/TableRepairData')
    ),
    ModalWorkOrders: defineAsyncComponent(() =>
      import('@/app/shared/ModalWorkOrders')
    ),
  },

  data() {
    return {
      newPriceData: {
        index: 0,
        price: 0,
      },
      dataForm: {},
      savedWorkOrder: false,
      correlative: 0,
      clientExists: false,
      description: '',
      allSelected: false,
      resetStatus: false,
    }
  },

  watch: {
    dataform(value) {
      if (Object.keys(value).length > 0) {
        this.savedWorkOrder = false
      }
    },
  },

  methods: {
    ...mapActions('repair', [
      'changePrice',
      'createWorkOrder',
      'getCorrelativeWorkOrder',
      'addWorkOrderClientExists', 'loadRepairCellphone',
    ]),
    ...mapMutations('repair', ['resetRepairsTable', 'deleteRepairCellphone']),

    getRepair(repair) {
      this.loadRepairCellphone(repair).then(() => {
        /* Esto es para eliminar los registros repetidos y no permitir ingresar otro igual */
        const arrayCompare = new Set()
        this.repairs.forEach((repair) =>
          arrayCompare.add(JSON.stringify(repair))
        )

        if (arrayCompare.size !== this.repairs.length) {
          this.deleteRepairCellphone(repair)
          alert('este tipo de reparacion ya fue ingresado')
        }


        console.log('paso 1')
      })
    },

    removeRepair(id) {
      console.log(id)
      this.$store.state.repair.repairs.splice(id, 1)
    },

    setDataForm(data, savedOrder) {
      this.dataForm = data
      this.dataForm.repairCellphones = this.repairs
      this.savedWorkOrder = savedOrder
    },

    newPrice(value) {
      this.newPriceData.index = value[0]
      this.newPriceData.price = parseInt(value[1])

      this.changePrice(this.newPriceData)

      console.log(value)
    },

    resetDataForm() {
      this.savedWorkOrder = true
      this.resetRepairsTable()
      this.correlative = 0
      this.description = ''
      this.dataForm = {}
      this.resetStatus = true
    },

    addWorkOrder() {
      this.dataForm.description = this.description

      this.addWorkOrderClientExists(this.dataForm)
        .then(() => {
          this.resetDataForm()
          this.clientExists = false
        })
        .catch((error) => {
          console.log(error.response.data)
          alert(error.response.data)
        })
    },

    newOrder() {
      this.dataForm.description = this.description
      this.createWorkOrder(this.dataForm)
        .then(() => {
          this.resetDataForm()
        })
        .catch((error) => {
          alert(error.response.data)
        })
    },

    setCorrelativeNumber() {
      this.getCorrelativeWorkOrder().then(( data ) => {
        this.correlative = data.correlativeNumber
      })
    },

    onSendClientExists( clientExists ) {
      this.clientExists = clientExists
    },
  },

  computed: {
    ...mapGetters('repair', [
      'getRepairs',
      'getTotalOrder',
      'getDataOrder',
      'getClientByDni',
    ]),
    ...mapState('repair', [ 'repairs', 'dataOrder' ]),

    getRepairsData() {
      return this.getRepairs
    },

    getOrderData() {
      return this.getDataOrder
    },

    getTotal() {
      return this.getTotalOrder
    },

    completeInformation() {
      if (this.repairs.length == 0 || Object.keys(this.dataForm).length < 3) {
        return true
      }

      return false
    },

    getWortkOrdersClient() {
      return this.getClientByDni.workorders
    },
  },

  activated() {
    console.log('activated')
  },

  deactivated() {
    console.log('deactivated')
  }
}
</script>

<style lang="scss" scoped>
.form-order {
  width: 98%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  column-gap: 1rem;
}

.table-repair {
  margin: 0;
  font-size: 0.8rem;
}
</style>