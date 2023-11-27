<template>
  <NavBar />
  <hr>
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
        ]
      }
    }   

}
</script>

<style>

</style>