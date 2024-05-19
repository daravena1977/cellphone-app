<template>
  <input
    type="text"
    :value="item.payment"
    @input="updateItem(item.id, $event.target.value)"
    class="myInputPayment form-control"
    disabled
  />
</template>

<script>
export default {
    data() {
      return {
        isDisabled: true,
      }
    },

    props: {
        item: Object,
        isDisabledProp: {
          type: Boolean,
          default: true
        }
    },

    methods: {
        updateItem(id, newValue) {
            this.$emit('updateItem', id , newValue)
        }
    },

    watch: {
      isDisabledProp(value) {
        if (!value) {
          this.isDisabled = false
        }
      }
    }
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  text-align: center;
}
</style>