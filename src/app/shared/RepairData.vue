<template>
  <form class="">
    <section>
      <div class="d-flex justify-content-between gap-3">
        <SelectBrand
          class="form-select-sm w-50"
          @selection="setBrand"
          :resetBrand="repair.idBrand"
        />

        <SelectModel
          class="form-select-sm w-50"
          @selection-model="setModel"
          :brand="repair.idBrand"
        />

        <SelectTypeRepair
          @selection-type-repair="setTypeRepair"
          :resetType="repair.idTypeRepair"
          class="form-select-sm w-50"
        />

        <button
          @click.prevent="addRepair"
          class="btn btn-success w-25"
          :disabled="onAllSelected"
        >
        <i class="fa-solid fa-plus"></i> <i class="fas fa-mobile-alt" style="color: white;"></i><i class="fas fa-tools" style="color: white;"></i>
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
    SelectTypeRepair: defineAsyncComponent(() =>
      import('@/app/shared/SelectTypeRepair')
    ),
  },

  data() {
    return {
      repair: {
        idBrand: 0,
        idModel: 0,
        idTypeRepair: 0,
      },
      allSelected: false,
    }
  },

  methods: {
    ...mapActions('setup', ['loadBrands', 'loadTypesRepairs']),
    ...mapActions('repair', ['loadRepairCellphone']),
    ...mapMutations('repair', ['deleteRepairCellphone']),

    setBrand(selection) {
      this.repair.idBrand = parseInt(selection)
    },

    setModel(selection) {
      this.repair.idModel = parseInt(selection)
    },

    setTypeRepair(selection) {
      this.repair.idTypeRepair = parseInt(selection)
    },

    addRepair() {
      this.$emit('addRepair', this.repair)

      this.repair.idBrand = 0
      this.repair.idModel = 0
      this.repair.idTypeRepair = 0
    }
  },

  computed: {
    ...mapState('repair', ['repairs']),
    ...mapGetters('setup', ['getTypesRepairs']),

    onAllSelected() {
      if (
        this.repair.idBrand !== 0 &&
        this.repair.idModel !== 0 &&
        this.repair.idTypeRepair !== 0
      ) {
        return false
      }
      return true
    },
  },

  created() {
    this.loadBrands()
    this.loadTypesRepairs()
  },
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