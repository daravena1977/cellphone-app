<template>
  <PersonalData />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PersonalData: defineAsyncComponent(() => import('@/app/shared/PersonalData'))
  }

}
</script>

<style></style>