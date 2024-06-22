<template>
  <div class="row">
    <div class="col d-flex gap-4">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        :class="{ active: activeButton === index }"
        @click="
          resetDataTable();
          setActive(index);
          handleClick(index)
        "
        class="btn btn-bar"
      >
        {{ button }}
      </button>
    </div>
    <div class="col-12">
      <hr class="mt-4" />
    </div>

    <!-- Search By number -->
    <div v-if="showOptionForNumber">
      <form class="form-control">
        <div
          class="input-group input-group-sm w-25 d-flex gap-3 align-items-center"
        >
          <label class="form-label">Ingrese número</label>
          <input
            @keypress.prevent.enter="getWorkOrdersByNumber(searchedOrderNumber)"
            v-model="searchedOrderNumber"
            class="form-control w-25"
            type="number"
            ref="inputNumberOrder"
          />
        </div>
      </form>
      <hr />
      <div>
        <TableWorkOrders
          @sendDataWorkOrdersRepairs="setDataWorkOrder"
          @openModalWorkOrder="setShowModal"
          v-if="showTable && getTableWorkOrdersByNumber.length > 0"
          class="w-75 m-auto"
          :workOrders="tableWorkOrdersByNumber"
        />
      </div>
    </div>

    <!-- Search By Date -->
    <div v-if="showOptionForDate">
      <form class="form-control">
        <div
          class="input-group input-group-sm d-flex gap-2 w-50 align-items-center"
        >
          <label class="form-label">Fecha desde</label>
          <input
            v-model="startDate"
            class="form-control w-25"
            type="date"
            name=""
            id=""
          />
          <label class="form-label">Fecha hasta</label>
          <input
            v-model="endDate"
            class="form-control w-25"
            type="date"
            name=""
            id=""
          />
          <button
            @click.prevent="getWorkOrdersByDate(startDate, endDate)"
            class="btn btn-search"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      <div>
        <TableWorkOrders
          @sendDataWorkOrdersRepairs="setDataWorkOrder"
          @openModalWorkOrder="setShowModal"
          v-if="showTable && getTableWorkOrdersByDate.length > 0"
          class="w-75 m-0"
          :workOrders="getTableWorkOrdersByDate"
        />
      </div>
    </div>

    <!-- Search By State -->
    <div v-if="showOptionForState" class="d-flex w-50 gap-1">
      <label class="w-25" for="state">Seleccione estado</label>
      <select @change="getWorkOrdersByState" id="state" class="form-select form-select-sm w-25">
        <option selected>Seleccione estado</option>
        <option
          v-for="(status, index) in statusOrders"
          :key="index"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </div>
    <div>
      <TableWorkOrders @sendDataWorkOrdersRepairs="setDataWorkOrder" @openModalWorkOrder="setShowModal" v-if="showTable && getTableWorkOrdersByState.length > 0" class="w-75 m-0" :workOrders="getTableWorkOrdersByState"/>  
    </div>
  </div>
  <ModalWorkOrderDetails @close-modal="closeModal" :openModal="openModal"
  :number-order="searchedOrderNumber" :start-date="startDate" :end-date="endDate"
  :state="statusSelected"
  :dataWorkOrder="dataWorkOrder" :is-search-by-number="searchByNumber" :is-search-by-date="searchByDate" :is-search-by-state="searchByState" />

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'SearchOrder',

  components: {
    TableWorkOrders: defineAsyncComponent(() => import('@/app/shared/TableWorkOrders')),
    ModalWorkOrderDetails: defineAsyncComponent(() => import('@/app/shared/ModalWorkOrderDetail.vue')),
  },

  data() {
    return {
      buttons: ['Por Número', 'Por Fecha', 'Por Estado '],
      activeButton: null,
      showOptionForNumber: false,
      showOptionForDate: false,
      showOptionForState: false,
      searchedOrderNumber: 0,
      workOrdersSearched: [],
      isActive: false,
      showTable: false,
      startDate: '',
      endDate: '',
      paramsDate: {
        startDate: '',
        endDate: '',
      },
      statusOrders: ['ENTREGADO', 'PENDIENTE', 'SIN_SOLUCION', 'ANULADA'],
      openModal: false,
      dataWorkOrder: {},
      searchByNumber: false,
      searchByDate: false,
      searchByState: false,
      statusSelected: '',
    }
  },

  methods: {
    ...mapActions('repair', ['findWorkOrdersByNumber', 'findWorkOrdersByDate', 'findWorkOrdersByState', 'loadClientById', 'loadClientByDni']),
    ...mapMutations('repair', ['resetDataTableSearchOrders']),

    getWorkOrdersByNumber(numberOrder) {
      this.findWorkOrdersByNumber(parseInt(numberOrder)).then((data) => {
        this.showTable = true
        this.workOrdersSearched = data
      })
    },

    getWorkOrdersByDate(startDate, endDate) {
      this.paramsDate.startDate = startDate
      this.paramsDate.endDate = endDate

      this.findWorkOrdersByDate(this.paramsDate).then((data) => {
        this.showTable = true
        this.workOrdersSearched = data
      })
    },

    getWorkOrdersByState($event) {
      this.statusSelected = $event.target.value
      this.findWorkOrdersByState($event.target.value).then((data) => {
        this.showTable = true
        this.workOrdersSearched = data
      })
    },

    resetDataTable() {
      this.resetDataTableSearchOrders()
    },

    toggleActive() {
      this.isActive = !this.isActive
    },

    setFocusInput() {
      this.$nextTick(() => {
        this.$refs.inputNumberOrder.focus()
        this.$refs.inputNumberOrder.select()
      })
    },

    setActive(index) {
      this.activeButton = index
    },

    handleClick(index) {
      if (index === 0) {
        this.showOptionForNumber = true
        this.showOptionForDate = false
        this.showOptionForState = false
        this.searchedOrderNumber = 0
        this.searchByNumber = true
        this.setFocusInput()
      }

      if (index === 1) {
        this.showOptionForNumber = false
        this.showOptionForDate = true
        this.showOptionForState = false
        this.searchByDate = true
      }

      if (index === 2) {
        this.showOptionForNumber = false
        this.showOptionForDate = false
        this.showOptionForState = true
        this.searchByState = true
      }
    },

    setShowModal() {
      this.openModal = true
    },

    closeModal() {
      this.openModal = false
    },

    setDataWorkOrder(data) {
      this.loadClientById(data.idClient)
        .then(data => {
          this.loadClientByDni(data.dni)
        })      
      this.dataWorkOrder = data
    },
  },

  computed: {
    ...mapGetters('repair', [
      'getTableWorkOrdersByNumber',
      'getTableWorkOrdersByDate',
      'getTableWorkOrdersByState'
    ]),

    tableWorkOrdersByNumber() {
      console.log(this.getTableWorkOrdersByNumber, 'pasa por el getter')
      return this.getTableWorkOrdersByNumber
    }
  },

  mounted() {
    console.log('se a activado searchOrder')
  },
  

  activated() {
    console.log('se a activado searchOrder')
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 10rem;
}

hr {
  border: 1px solid #000;
}

form {
  border: none;
}

.active {
  background-color: #2980b9;
  color: #fff;
}

.btn-bar:hover {
  background-color: #2980b9;
  color: #fff;
}

.btn-bar {
  box-shadow: 1px 1px 5px;
}

.btn-search {
  width: 2rem;
  background-color: #fff;
  border: #000;
}

// .btn:active,
// .btn:focus {
//   outline: none;
// }
</style>