<template>
  <!-- <label class="align-self-center" for="">Seleccione marca</label> -->
    
    <select 
      @change="$emit('selection', $event.target.value)"  
      class="form-select w-25"
      >
      <option :selected="resetBrand === 0">Seleccione marca</option>
      <option v-for="brand in brands" :key="brand.id" :value="brand.id">
        {{ brand.name }}
      </option>
    </select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  emits: ['selection'],

  props: {
        resetBrand: Number,
    },
  

  methods: {
    ...mapActions('setup', (['loadBrands']))
  },

  computed: {
    ...mapGetters('setup', (['getBrands'])),
    brands() {
      
      return this.getBrands
      
    }

  },

  
}
</script>

<style></style>