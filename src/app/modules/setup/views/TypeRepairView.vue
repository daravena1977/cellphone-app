<template>
  <h3>Tipos de Reparaciones</h3>
  <hr />
  <div class="d-flex gap-3">
    <button @click="addTypeRepair" class="btn btn-primary w-25">
      Agregar tipo
    </button>
    <input 
      @keypress.enter="addTypeRepair" 
      v-model="name" 
      class="form-control w-25" 
      type="text" 
      placeholder="ingrese tipo de reparación..." 
    />
  </div>
  <hr />

  <button @click="getTypes" class="btn btn-success">Ver tipos</button>

  <table v-if="isLoad" class="table table-sm mt-4 w-25">
    <caption>
      Listado de tipos de reparación
    </caption>
    <thead class="table-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Tipos</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="typeRepair in types" :key="typeRepair.id">
        <th scope="row">{{ typeRepair.id }}</th>
        <td>{{ typeRepair.repairType }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: '',
      isLoad: false,
    };
  },

  methods: {
    ...mapActions('setup', (['createTypeRepair', 'loadTypesRepairs'])),
    addTypeRepair() {
      this.createTypeRepair(this.name)
      this.name = ''

    },
    getTypes() {
      this.loadTypesRepairs()
      this.isLoad = true
    }
  },

  computed: {
    ...mapGetters('setup', ['getTypesRepairs']),
    types() {
      return this.getTypesRepairs
    },
  },
};
</script>

<style></style>
