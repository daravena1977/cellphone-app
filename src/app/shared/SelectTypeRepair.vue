<template>
  <select
    @change="$emit('selection-type-repair', $event.target.value)"
    class="form-select w-25"
  >
    <option :selected="resetType === 0">Seleccione reparación</option>
    <option v-for="typeRepair in types" :key="typeRepair.id" :value="typeRepair.id">
      {{ typeRepair.repairType }}
    </option>
  </select>
</template>

<script>
import {  mapGetters } from 'vuex'

export default {
    emits: ['selection-type-repair'],

    props: {
      resetType: Number
    },

    computed: {
        ...mapGetters('setup', ['getTypesRepairs']),
        types() {
            return this.getTypesRepairs
        }
    }

};
</script>

<style lang="scss" scoped>
.form-select {
  font-size: 0.8rem;
}
</style>