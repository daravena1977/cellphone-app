<template>
  <form class="form-control contenedor">
    <fieldset>
      <legend>{{ lengendProp }}</legend>
      <hr />
      <div v-if="showField" class="data input-group-sm">
        <label for="number">Nº</label>
        <input
          v-model="orderData.number"
          id="number"
          class="form-control"
          type="number"
          placeholder="Nº de Orden"
          disabled
        />
      </div>

      <div v-if="showField" class="data input-group-sm">
        <label for="date">Fecha</label>
        <input
          v-model="orderData.creationDate"
          id="date"
          class="form-control"
          type="date"
          name="fechaActual"
        />
      </div>

      <div class="data input-group-sm">
        <label for="dni">DNI</label>
        <input
          @input="$emit('send-dni', orderData.dni)"
          @keypress.enter.prevent="searchClientByDni(orderData.dni)"
          v-model="orderData.dni"
          id="dni"
          class="form-control"
          @focusout="searchClientByDni(orderData.dni)"
          type="text"
          placeholder="Dni"
          ref="inputDni"
        />
      </div>

      <div class="data input-group-sm">
        <label for="name">Nombre</label>
        <input
          v-model="orderData.firstName"
          id="name"
          class="form-control"
          type="text"
          placeholder="Nombre"
          :disabled="idDisabled"
          ref="myInput"
        />
      </div>

      <div class="data input-group-sm">
        <label for="lastName">Apellido</label>
        <input
          v-model="orderData.lastName"
          id="lastName"
          class="form-control"
          type="text"
          placeholder="Apellido"
          :disabled="idDisabled"
        />
      </div>

      <div class="data input-group-sm">
        <label for="address">Dirección</label>
        <input
          v-model="orderData.address"
          id="address"
          class="form-control"
          type="text"
          placeholder="Dirección"
          :disabled="idDisabled"
        />
      </div>
      <div class="data input-group-sm">
        <label for="email">E-mail</label>
        <input
          v-model="orderData.email"
          id="email"
          class="form-control"
          type="email"
          placeholder="Email"
          :disabled="idDisabled"
        />
      </div>

      <div class="data input-group-sm">
        <label for="phone">Teléfono</label>
        <input
          v-model="orderData.phoneNumber"
          id="phone"
          class="form-control"
          type="tel"
          placeholder="Telefono"
          :disabled="idDisabled"
        />
      </div>

      <div v-if="showField" class="data input-group-sm">
        <label for="dateDelivery">Fecha entrega</label>
        <input
          v-model="orderData.deliverDate"
          id="dateDelivery"
          class="form-control"
          type="date"
          placeholder="fecha entrega"
        />
      </div>

      <div v-if="showField" class="data">
        <label for="state">Estado</label>
        <select
          id="state"
          @change="setStatus"
          class="form-select form-select-sm"
        >
          <option :selected="resetStatus">Seleccione estado</option>
          <option
            v-for="(status, index) in statusOrders"
            :key="index"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </div>
    </fieldset>
  </form>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PersonalData',

  emits: ['form-data', 'sendClientExists', 'setStatus', 'send-dni'],

  data() {
    return {
      orderData: {
        number: 0,
        dni: '',
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        creationDate: '',
        deliverDate: '',
        description: '',
        stateOrder: '',
      },
      statusOrders: ['ENTREGADO', 'PENDIENTE', 'REPARADO', 'SIN_SOLUCION', 'ANULADA'],
      idDisabled: this.isDisabledProp,
      clientExists: false,
      savedOrder: false,
      actualDate: new Date(),
    }
  },

  props: {
    saved: {
      type: Boolean,
      default: false,
    },
    correlative: {
      type: Number,
      default: 0,
    },
    resetStatus: {
      type: Boolean,
      default: false,
    },
    showField: {
      type: Boolean,
      default: true,
    },
    isDisabledProp: {
      type: Boolean,
      default: false,
    },
    lengendProp: {
      type: String,
      default: 'Orden de trabajo',
    },
    resetFormFromClientView: {
      typeof: Boolean,
      default: false,
    },
    focusInputDni: {
      type: Boolean,
      default: false,
    }
  },

  watch: {
    saved(value) {
      if (value) {
        console.log(value, 'saved')
        this.orderData = {}
        this.orderData.number = 0
        this.orderData.creationDate = moment(this.actualDate).format(
          'YYYY-MM-DD'
        )
        this.resetDataOrderState()
        this.clientExists = false
        this.idDisabled = false
      }
    },
    correlative(value) {
      this.orderData.number = value
    },
    /* isDisabledProp(value) {
        if (value) {
          this.idDisabled = true
        }
      } */
    resetFormFromClientView(value) {
      if (value) {
        this.orderData.firstName = ''
        this.orderData.lastName = ''
        this.orderData.address = ''
        this.orderData.email = ''
        this.orderData.phoneNumber = ''
        this.resetClientByDni
      }
    },
    focusInputDni(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.inputDni.focus()
        },0)
      }
    }
  },

  methods: {
    ...mapActions('repair', ['getCorrelativeWorkOrder', 'loadClientByDni']),
    ...mapMutations('repair', ['resetDataOrder', 'resetClientByDni']),

    setStatus($event) {
      this.orderData.stateOrder = $event.target.value
      this.$emit('form-data', this.orderData, this.savedOrder)
    },

    resetDataOrderState() {
      this.resetDataOrder()
    },

    searchClientByDni(dni) {
      if (dni === '') {
        this.$emit('sendClientExists', this.clientExists)
        return
      }
      
      this.loadClientByDni(dni)
        .then((data) => {
          this.orderData.firstName = data.firstName
          this.orderData.lastName = data.lastName
          this.orderData.address = data.address
          this.orderData.email = data.email
          this.orderData.description = ''
          this.orderData.phoneNumber = data.phoneNumber
          this.idDisabled = true
          this.clientExists = true
          this.$emit('sendClientExists', this.clientExists)
        })
        .catch((err) => {
          console.log(err)
          this.orderData.firstName = ''
          this.orderData.lastName = ''
          this.orderData.address = ''
          this.orderData.email = ''
          this.orderData.phoneNumber = ''
          this.idDisabled = false
          this.clientExists = false
          this.$emit('sendClientExists', this.clientExists)
          this.$nextTick(() => {
            this.$refs.myInput.focus()
          })
        })
    },

    onResetClientByDni() {
      this.resetClientByDni()
    },
  },

  computed: {
    ...mapGetters('repair', ['getRepairs']),
  },

  mounted() {
    this.orderData.creationDate = moment(this.actualDate)
    .format('YYYY-MM-DD')
  },
}
</script>

<style lang="scss" scoped>
.contenedor {
  width: 100%;
  margin: 0;
  font-size: 0.9rem;
}

hr {
  border: 1px solid #000;
}

.data {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 0.5rem;
}

.data label {
  flex-basis: 10rem;
}
</style>