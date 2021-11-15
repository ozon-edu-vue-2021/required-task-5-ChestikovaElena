<template>
  <div class="catalog-wrapper">
    <ul
      class="catalog"
      v-if="!productsRequest && isAllProductsUpdate && !productsFailed && data && data.length"
    >
      <li
        v-for="product in data"
        :key="product.id"
        class="catalog-item"
      >
        <Card :product="product" />
      </li>
    </ul>
    <div v-else-if="productsRequest && isAllProductsUpdate">
      ...Loading
    </div>
    <div v-else-if="productsFailed">
      Что-то пошло не так. Перезагрузите страницу.
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "./Card.vue";

export default {
  name: 'Catalog',
  components: {
    Card,
  },
  computed: {
    ...mapState(
      'products',
      ['data', 'productsRequest', 'productsFailed', 'isAllProductsUpdate']
    ),
  },
}
</script>

<style scoped>
.catalog-wrapper {

}

.catalog {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;
  padding: 0;
}

.catalog-item {

}

</style>
