<template>
  <div class="form-order">

    <div class="personal-data">
      <PersonalData @form-data="setDataForm" class="mb-3"
      :saved="savedWorkOrder" :correlative="correlative"/>
    </div>

    <div class="repair-data form-control">
      <div class="d-flex flex-column">
        <RepairData class="mb-4" />
        <div class="table-repair">
          <TableRepairData @edit-price="newPrice" @delete-repair="removeRepair"
          :repairsData="getRepairsData" />
        </div>
        
      </div>


      <div class="form-floating mb-4">
        <textarea class="form-control h-50" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Comentarios</label>
      </div>

      <div class="d-flex gap-2 justify-content-end align-items-center mt-2 mb-3">
        <span>Total: </span>
        <input v-model="getTotal" class="form-control w-25" type="number" disabled placeholder="0">
      </div>
      <hr>
      <div class="d-flex gap-3 justify-content-end mb-3">
        <button v-if="correlative == 0" @click="setCorrelativeNumber" class="btn btn-warning w-25" :disabled="completeInformation">
          Asignar número
        </button>

        <button v-if="correlative > 0" class="btn btn-danger w-25">
          Cancelar
        </button>

        <button v-if="correlative > 0" @click="newOrder" class="btn btn-success w-25">
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
    PersonalData: defineAsyncComponent(() => import('@/app/shared/PersonalData')),
    RepairData: defineAsyncComponent(() => import('@/app/shared/RepairData')),
    TableRepairData: defineAsyncComponent(() => import('@/app/shared/TableRepairData'))
  },

  data() {
    return {
      newPriceData: {
        index: 0,
        price: 0
      },
      dataForm: {},
      savedWorkOrder: false,
      correlative: 0
    }
  },

  methods: {
    ...mapActions('repair', (['changePrice', 'createWorkOrder','getCorrelativeWorkOrder'])),
    ...mapMutations('repair', (['resetRepairsTable'])),


    removeRepair(id) {
      console.log(id)
      this.$store.state.repair.repairs.splice(id, 1)
    },

    setDataForm(data) {
      this.dataForm = data
      this.dataForm.repairCellphones = this.repairs
    },

    newPrice(value) {
      this.newPriceData.index = value[0]
      this.newPriceData.price = parseInt(value[1])

      this.changePrice(this.newPriceData)


      console.log(value)
    },

    newOrder() {
      this.createWorkOrder(this.dataForm).then(() => {
        this.savedWorkOrder = true
        this.resetRepairsTable()
        this.correlative = 0
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
      })
    },

    setCorrelativeNumber() {
      this.getCorrelativeWorkOrder().then(data => {
        this.correlative = data.correlativeNumber
      })
    }

  },

  computed: {
    ...mapGetters('repair', (['getRepairs', 'getTotalOrder', 'getDataOrder'])),
    ...mapState('repair', (['repairs', 'dataOrder'])),

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
      if (this.repairs.length == 0 && Object.keys(this.dataOrder).length  == 0) return true

      return false
    }


  },

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