<template>
  <h1>ejemplo toolbar</h1>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar title="Application"></v-toolbar>
    </v-app-bar>
    <!-- Otro contenido del componente -->
  </v-app>

  <v-autocomplete
  label="Autocomplete"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
></v-autocomplete>
  
</template>

<script>
export default {
    name: 'SearchOrder'

}
</script>

<style>

</style>