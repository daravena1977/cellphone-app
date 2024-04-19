<template>
  <form class="form-control contenedor">
    <fieldset>
      <legend>Orden de trabajo</legend>
      <hr>
      <div class="data input-group-sm">
        <label for="number">Nº</label>
        <input v-model="orderData.number" id="number" class="form-control" type="number" placeholder="Nº de Orden"
          disabled>
      </div>

      <div class="data input-group-sm">
        <label for="date">Fecha</label>
        <input v-model="orderData.creationDate" id="date" class="form-control" type="date" name="fechaActual">
      </div>

      <div class="data input-group-sm">
        <label for="dni">DNI</label>
        <input v-model="orderData.dni" id="dni" class="form-control" type="text" placeholder="Dni">
      </div>

      <div class="data input-group-sm">
        <label for="name">Nombre</label>
        <input v-model="orderData.firstName" id="name" class="form-control" type="text" placeholder="Nombre">
      </div>

      <div class="data input-group-sm">
        <label for="lastName">Apellido</label>
        <input v-model="orderData.lastName" id="lastName" class="form-control" type="text" placeholder="Apellido">
      </div>


      <div class="data input-group-sm">
        <label for="address">Dirección</label>
        <input v-model="orderData.address" id="address" class="form-control" type="text" placeholder="Dirección">
      </div>

      <div class="data input-group-sm">
        <label for="email">E-mail</label>
        <input v-model="orderData.email" id="email" class="form-control" type="email" placeholder="Email">
      </div>

      <div class="data input-group-sm">
        <label for="phone">Teléfono</label>
        <input v-model="orderData.phoneNumber" id="phone" class="form-control" type="tel" placeholder="Telefono">
      </div>

      <div class="data input-group-sm">
        <label for="dateDelivery">Fecha entrega</label>
        <input v-model="orderData.deliverDate" id="dateDelivery" class="form-control" type="date"
          placeholder="fecha entrega">
      </div>

      <div class="data input-group-sm">
        <label for="state">Estado</label>
        <select v-model="orderData.stateOrder" @focusout="$emit('form-data', orderData)"
          class="form-select form-select-sm">
          <option selected="">Seleccione estado</option>
          <option v-for="(status, index) in statusOrders" :key="index" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
    </fieldset>

  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
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
        description: 'ddddddd',
        stateOrder: '',

      },
      statusOrders: [
        'ENTREGADA',
        'PENDIENTE',
        'SIN SOLUCION',
        'ANULADA'],
    }
  },

  props: {
    saved: {
      type: Boolean,
      required: true,
      default: false,
    },
    correlative: {
      type: Number,
      required: true,
      default: 0,
    }
  },

  watch: {
    saved(value) {
      if (value) {
        console.log(value, 'saved');
        this.orderData = {}
        this.orderData.number = 0
        this.orderData.creationDate = new Date().toISOString().slice(0, 10);
        this.resetDataOrderState()
      }
    },
    correlative(value) {
      this.orderData.number = value
    }
  },  

  methods: {
    ...mapActions('repair', (['getCorrelativeWorkOrder'])),
    ...mapMutations('repair', (['resetDataOrder'])),

    resetDataOrderState() {
      this.resetDataOrder()
    }


  },

  computed: {
    ...mapGetters('repair', (['getRepairs'])),



  },

  mounted() {
    this.orderData.creationDate = new Date().toISOString().slice(0, 10); //Asignar la fecha actual en formato aaaa-mm-dd

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
  margin-bottom: .5rem;
}

.data label {
  flex-basis: 10rem;
}
</style>