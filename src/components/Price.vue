<template>
  <p class="price">
    {{price}} p.
  </p>
</template>

<script>
export default {
  name: 'Price',
  props: {
    price: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>

</style>
