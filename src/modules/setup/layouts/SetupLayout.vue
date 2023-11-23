<template>
    <NavBar />
    <hr>
    <SideBar
    v-for="option in optionsSideBar"
    :key="option.index"
    :link="option"
    />

  
</template>

<script>
import { mapActions } from 'vuex';
import { defineAsyncComponent } from 'vue'

export default {
components: {
    SideBar: defineAsyncComponent(() => import('@/shared/SideBar')),
    NavBar: defineAsyncComponent(() => import('@/shared/NavBar')),
},

data() {
    return {
        optionsSideBar: [
            {to: 'brand', name: 'Agregar Marcas' },
            {to: 'model', name: 'Agregar Modelos' },
            {to: 'repair', name: 'Precios Reparaciones' },
            {to: 'type-repair', name: 'Tipos de Reparaciones' }
        ]
    }
},

methods: {
    ...mapActions('setup', ['loadTypesRepairs'])
},
created() {
    this.loadTypesRepairs()
}


}
</script>

<style lang="scss" scoped>
.sidebar-container{
    border: solid 0.5px #c4bfbf;
    height: 90vh;
}

li {
    list-style-type: none;
}

a {
    text-decoration: none;
}

</style>