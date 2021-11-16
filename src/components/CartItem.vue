<template>
  <div class="wrapper">
    <img width="100" src="../assets/images/6123150777.webp" />
    <div class="column">
      <p class="dish">{{ product.dish }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="row">
        <button
          v-if="!isFavorited"
          class="button"
          @click="clickAddToFavorites"
        >
          В избранное
        </button>
        <button
          v-if="isFavorited"
          class="button button--accent"
          @click="clickRemoveFromFavorites"
        >
          В избранном
        </button>
        <button
          class="button"
          @click="removeAllFromCart(product)"
        >
          Удалить из корзины
        </button>
      </div>
    </div>
    <div class="column column-small">
      <p class="price">
        {{ product.quantity }} * {{product.price}} p.
      </p>
    </div>
    <div class="column column-small">
      <Select
        @selected:countOfProducts="updateCountOfProducts"
        :value="countOfProducts"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Select from "./Select.vue";

export default {
  name: 'CartItem',
  components: {
    Select,
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      countOfProducts: 1,
      isFavorited: false,
    }
  },
  computed: {
    ...mapGetters('products',['getFavorites']),
  },
  mounted() {
    this.updateIsFavorited();
  },
  methods: {
    ...mapMutations("cart", ["addToCart", "removeAllFromCart"]),
    ...mapMutations("products", ["addToFavorites", "removeFromFavorites"]),
    updateCountOfProducts(payload) {
      this.addToCart({product:this.product, count: payload});
      this.countOfProducts = payload;
    },
    clickAddToFavorites() {
      this.addToFavorites(this.product);
      this.isFavorited = true;
    },
    clickRemoveFromFavorites() {
      this.removeFromFavorites(this.product);
      this.isFavorited = false;
    },
    updateIsFavorited() {
      const item = this.getFavorites.find( i => i.id === this.product.id);
      
      if (item) {
        this.isFavorited = true;
      } else {
        this.isFavorited = false;
      }
    }
  }

}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 1em;
  background-color: #fff;
}

.column {
  width: 300px;
  margin-left: 1em;
}

.column-small {
  width: 100px;
}

.dish {
  font-size: 18px;
}

.description {
  margin-top: 0.5em;
  font-size: 14px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.row {
  display: flex;
  gap: 1em;
  margin-top: 2em;
}

.button {
  align-self: start;
  padding: 0;
  background-color: transparent;
  color: royalblue;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.button--accent {
  color: tomato;
}

.price {
  font-size: 20px;
  font-weight: 700;
}

</style>
