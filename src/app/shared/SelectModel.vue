<template>
    <select      
      @change="$emit('selection-model', $event.target.value)"
      class="form-select w-25"
      >
      <option selected="">Seleccione modelo</option>
      <option v-for="model in models" :key="model.id" :value="model.id">
        {{ model.name }}
      </option>
    </select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    emits: ['selection-model'],

    props: {
        brand: Number
    },

    methods: {
    },

    computed: {
        ...mapGetters('setup', ['getModels'],),
        models() {
            return this.getModels(this.brand)
        }
    }
}




</script>

<style lang="scss" scoped>
.form-select {
    font-size: 0.8rem;
}
</style>