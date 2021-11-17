<template>
  <div>
    <h1 class="title">
      Избранное
    </h1>
    <div class="favorites-container">
      <div class="list-wrapper">
        <ul
          class="favorites-list"
          v-if="getFavorites && getFavorites.length"
        >
        <li
          v-for="product in getFavorites"
          :key="product.id"
          class="favorites-item"
        >
          <Card :product="product" />
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card.vue";

export default {
  name: 'Favorites',
  components: {
    Card,
  },
  computed: {
    ...mapGetters("products",["getFavorites"]),
  },
}
</script>

<style scoped>
.favorites-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-gap: 2rem;
  padding: 0;
}

</style>
