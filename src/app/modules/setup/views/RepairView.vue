<template>
  <h3>Nueva Reparación</h3>
  <hr>
  <div class="d-flex gap-3">

    <SelectBrand @selection="setSelectedBrand" :resetBrand="newRepair.idBrand" />

    <SelectModel @selection-model="setSelectedModel" :brand="newRepair.idBrand" />

    <SelectTypeRepair @selection-type-repair="setSelectedTypeRepair" :resetType="newRepair.idTypeRepair" class="w-50" />

  </div>

  <input v-model="newRepair.price" class="form-control mt-3 w-25" type="number" name="" id=""
    placeholder="Ingrese costo...">

  <hr>

  <button @click="addRepair" class="btn btn-danger w-25">Guardar</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'


export default {
  data() {
    return {
      newRepair: {
        idBrand: 0,
        idModel: 0,
        idTypeRepair: 0,
        price: 0,

      },

    }
  },

  components: {
    SelectBrand: defineAsyncComponent(() => import('@/app/shared/SelectBrand')),
    SelectModel: defineAsyncComponent(() => import('@/app/shared/SelectModel')),
    SelectTypeRepair: defineAsyncComponent(() => import('@/app/shared/SelectTypeRepair'))
  },

  methods: {
    ...mapActions('setup', (['loadBrands', 'createRepair'])),
    setSelectedBrand(selection) {
      this.newRepair.idBrand = parseInt(selection)
      console.log(this.newRepair.idBrand)

    },
    setSelectedModel(selectionModel) {
      this.newRepair.idModel = parseInt(selectionModel)
      console.log(this.newRepair.idModel)
    },
    setSelectedTypeRepair(selection) {
      this.newRepair.idTypeRepair = parseInt(selection)
    },
    addRepair() {
      this.createRepair(this.newRepair).then(() => {
        this.newRepair.idBrand = 0
        this.newRepair.idModel = 0
        this.newRepair.idTypeRepair = 0
        this.newRepair.price = 0


      })


    }
  },

  computed: {
    ...mapGetters('setup', (['getBrands', 'getModels'])),
    models() {
      return this.getModels(this.selected)
    }


  },

  created() {
    this.loadBrands()
  }

}
</script>

<style lang="scss" scoped>
h3 {
  color: #1d6042;
}
</style>