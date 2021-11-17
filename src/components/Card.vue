<template>
  <div class="wrapper">
    <img :src="require(`../assets/images/${product.image}.webp`)" />
    <div class="content">
      <div class="row">
        <p class="price">
          {{product.price}} p.
        </p>
        <div
          class="icon-wrapper icon-wrapper--heart"
          :class="['icon-wrapper icon-wrapper--heart', {
            'icon-wrapper icon-wrapper--heart-active': product.isFavorited
          }]"
          @click="clickOnHeart"
        >
          <Icon iconType="heart" />
        </div>
        <div class="icon-wrapper">
          <Icon iconType="cart" />
          <span class="teaps" v-if="countOfProduct">
            {{ countOfProduct }}
          </span>
        </div>
      </div>
      <p class="dish">{{ product.dish }}</p>
      <div class="control">
        <div class="column">
          <button
            class="button"
            @click="addToCart({product, count: countOfProductSelect})"
          >
            В корзину
          </button>
          <button
            v-if="countOfProduct"
            class="button"
            @click="removeFromCart(product)"
          >
            Удалить
          </button>
        </div>
        <div class="column">
          <Select
            @selected:countOfProducts="updateCountOfProducts"
            :value="countOfProductSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Select from "./Select.vue";
import Icon from "./Icon.vue";

export default {
  name: 'Card',
  components: {
    Select,
    Icon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countOfProductSelect: 1,
    }
  },
  computed: {
    ...mapState('cart',['selectedProducts']),
    ...mapState('products',['data']),

    countOfProduct() {
      const item = this.selectedProducts.find( i => i.id === this.product.id);
      
      if (item) {
        return item.quantity;
      } else {
        return 0
      };
    },
  },
  methods: {
    ...mapMutations(
      "cart",
      ["addToCart", "removeFromCart"]
    ),
    ...mapMutations(
      "products",
      ["addPrice", "addToFavorites", "removeFromFavorites"]
    ),
    updateCountOfProducts(payload) {
      this.countOfProductSelect = payload;
    },
    clickOnHeart() {
      if (this.product.isFavorited) {
        this.removeFromFavorites(this.product);
      } else {
        this.addToFavorites(this.product);
      }
    }
  }

}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 2px solid #D9DDDC;
}

.content {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.price {
  font-size: 20px;
  font-weight: 700;
}

.icon-wrapper {
  position: relative;
}

.icon-wrapper--heart {
  fill:#001A34;
}

.icon-wrapper--heart:hover {
  cursor: pointer;
  fill: tomato;
}

.icon-wrapper--heart-active {
  fill: tomato;
}

.teaps {
  background-color: tomato;
  border-radius: 8px;
  color: #fff;
  height: 16px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  position: absolute;
  right: -14px;
  top: -8px;
  font-size: 12px;
}

.dish {
  margin-top: 10px;
  font-size: 14px;
}

.control {
  display: flex;
  justify-content: space-between;
  height: 110px;
}

.column {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.button {
  align-self: start;
  padding: 8px 16px;
  width: 100px;
  background-color: royalblue;
  color: #fff;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

</style>
