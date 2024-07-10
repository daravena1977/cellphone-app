<template>
  <NavBar class="container-navbar" />
  
  <SideBar :links="optionsSideBar" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
      NavBar: defineAsyncComponent(() => import('@/app/shared/NavBar')),
      SideBar: defineAsyncComponent(() => import('@/app/shared/SideBar'))
    },

    data() {
      return {
        optionsSideBar: [
          { to: 'workorder', name: 'Nueva Orden Trabajo' },
          { to: 'client', name: 'Consultar Cliente' },
          { to: 'search-order', name: 'Consultar Orden'}
        ]
      }
    },
    
    activated() {
      this.$router.push({name: 'workorder'})
    }

}
</script>

<style lang="scss" scoped>
.container-navbar {
  margin-bottom: 20px;
}

</style>