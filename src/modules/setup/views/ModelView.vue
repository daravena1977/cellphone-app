<template>
  <h3>Agregar modelo</h3>

  <hr />

  <div class="d-flex gap-3">
    <SelectBrand @selection="setSelected" />

    <template v-if="selected > 0">
      <button @click="addModel" class="btn btn-secondary">
        Agregar modelo
      </button>
      <input
        v-model="newModel.name"
        class="form-control w-25"
        type="text"
        placeholder="Ingrese modelo..." />
    </template>
  </div>

  <hr />

  <table v-if="selected > 0" class="table table-sm mt-4 w-25">
    <caption>
      Listado de modelos
    </caption>
    <thead class="table-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Modelos</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="model in models" :key="model.id">
        <th scope="row">{{ model.id }}</th>
        <td>{{ model.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex"

import { defineAsyncComponent } from "vue"

export default {
  components: {
    SelectBrand: defineAsyncComponent(() =>
      import("@/modules/setup/components/SelectBrand")
    ),
  },

  data() {
    return {
      selected: 0,
      newModel: {
        idBrand: 0,
        name: "",
      },
      cellphone: {
        idBrand: 0,
        idModel: 0,
      },
    };
  },

  methods: {
    ...mapActions('setup', ['loadBrands', 'createModel', 'createCellphone']),
    // ...mapState('setup', ['model']),

    addModel() {
      this.newModel.idBrand = this.selected

      this.createModel(this.newModel)
        .then(() => {
          this.newModel.name = ""
          this.cellphone.idBrand = parseInt(this.selected)
          this.cellphone.idModel = this.model.id
          console.log(this.model.id);
          console.log(this.selected);
          this.createCellphone(this.cellphone)
        }
        )




    },
    setSelected(value) {
      this.selected = value;
    },
  },

  computed: {
    ...mapGetters("setup", ["getBrands", "getModels"]),
    ...mapState('setup', ['model']),

    brands() {
      return this.getBrands;

    },
    models() {
      return this.getModels(parseInt(this.selected))
    },
  },

  created() {
    this.loadBrands();
  },
};
</script>

<style lang="scss" scoped>
h3 {
  color: #dc3545;
}

label {
  color: #2c3e50;
}
</style>
