<template>
  <form class="">
    <section>
      <legend>Detalle de Reparaciones</legend>
      <hr>
      <div class="d-flex justify-content-between gap-3">
        <SelectBrand class="form-select-sm" @selection="setBrand" :resetBrand="repair.idBrand" />

        <SelectModel class="form-select-sm" @selection-model="setModel" :brand="repair.idBrand" />

        <SelectTypeRepair @selection-type-repair="setTypeRepair" :resetType="repair.idTypeRepair"
          class="form-select-sm" />

        <button @click.prevent="getRepair" class="btn btn-success" :disabled="onAllSelected">
          Agregar
        </button>

      </div>

    </section>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    SelectBrand: defineAsyncComponent(() => import('@/app/shared/SelectBrand')),
    SelectModel: defineAsyncComponent(() => import('@/app/shared/SelectModel')),
    SelectTypeRepair: defineAsyncComponent(() => import('@/app/shared/SelectTypeRepair'))
  },

  data() {
    return {
      repair: {
        idBrand: 0,
        idModel: 0,
        idTypeRepair: 0,
      },
      temporal: [],
      duplicated: [],
      allSelected: false
    }
  },

  methods: {
    ...mapActions('setup', (['loadBrands', 'loadTypesRepairs'])),
    ...mapActions('repair', (['loadRepairCellphone'])),
    ...mapMutations('repair', (['deleteRepairCellphone'])),

    setBrand(selection) {
      this.repair.idBrand = parseInt(selection)
    },

    setModel(selection) {
      this.repair.idModel = parseInt(selection)
    },

    setTypeRepair(selection) {
      this.repair.idTypeRepair = parseInt(selection)
    },

    getRepair() {     
      
      this.loadRepairCellphone(this.repair).then(() => {
          /* Esto es para eliminar los registros repetidos y no permitir ingresar otro igual */
          const arrayCompare = new Set()
          this.repairs.forEach((repair) => arrayCompare.add(JSON.stringify(repair) ))

          if (arrayCompare.size !== this.repairs.length) {
            this.deleteRepairCellphone(this.repair)
            alert('este tipo de reparacion ya fue ingresado')
          }

          this.repair.idBrand = 0
          this.repair.idModel = 0
          this.repair.idTypeRepair = 0
    
        })
      }

  },

  computed: {
    ...mapState('repair', (['repairs'])),
    ...mapGetters('setup', (['getTypesRepairs'])),

    onAllSelected() {
      if (this.repair.idBrand !== 0 && this.repair.idModel !== 0 && this.repair.idTypeRepair !== 0) {      
      return  false
      }
      return true
    }

  },

  created() {
    this.loadBrands()
    this.loadTypesRepairs()
  }

}
</script>

<style lang="scss" scoped>
/* hr {
    border: solid 1px #7e7c7c;
  } */

hr {
  border: 1px solid #000;
}
</style>