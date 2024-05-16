<template>
  <input
    type="text"
    value="item.property"
    @input="updateItem(item.id, $event.target.value)"
  />
</template>

<script>
export default {
    props: {
        item: Object
    },

    methods: {
        updateItem(id, newValue) {
            this.$emit('updateItem', id , newValue)
        }
    }
}
</script>

<style>
</style>