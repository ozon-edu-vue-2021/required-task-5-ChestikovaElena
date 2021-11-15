<template>
  <div class="cart-wrapper">
    <h1 class="title">
      Корзина
    </h1>
    <div class="cart-container">
      <div class="list-wrapper">
        <ul
          class="cart-list"
          v-if="selectedProducts && selectedProducts.length"
        >
          <li
            v-for="product in selectedProducts"
            :key="product.id"
            class="cart-item"
          >
            <CartItem :product="product" />
          </li>
        </ul>
        <div v-else>
          Ваша корзина пуста.
        </div>
      </div>
      <div class="cart-common">
        <button
          :class="['cart-button', {
            'cart-button--disabled': isButtonDisabled
          }]"
          @click="placeOrder"
        >
          Оформить заказ
        </button>
        <div class="cart-summary">
          <div class="summary-row">
            <span class="label label--accent">
              Ваша корзина содержит
            </span>
            <span class="label">
              {{getTotalCount || 0}} товара
            </span>
          </div>
          <div class="summary-row">
            <span class="label label--accent">
              Общая стоимость
            </span>
            <span class="label label--accent">
              {{ getTotalPrice || 0 }} р.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CartItem from "./CartItem.vue";

export default {
  name: 'Cart',
  components: {
    CartItem,
  },
  computed: {
    ...mapState(
      'cart',
      ['selectedProducts']
    ),
    ...mapGetters(
      'cart',
      ['getTotalPrice', 'getTotalCount']
    ),
    isButtonDisabled() {
      return !this.selectedProducts?.length
    }
  },
  methods: {
    placeOrder() {
      let order = [];
      this.selectedProducts.map(
        i => order.push({
          id: i.id,
          dish: i.dish,
          quantity: i.quantity,
          price: i.price
        })
      )
      alert(JSON.stringify(order));
    }
  }
}
</script>

<style scoped>
.cart-wrapper {
}

.cart-container {
  display: flex;
  gap: 2em;
}

.list-wrapper {
  width: 40vw;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0;
  list-style: none;
  padding: 0;
}

.cart-common {
  display: flex;
  flex-direction: column;
  width: 20vw;
  padding: 1em;
  background-color: #fff;
}

.cart-button {
  padding: 16px 50px;
  margin-bottom: 2em;
  background-color: #10ad44;
  color: #fff;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.cart-button--disabled {
  background-color: #D9DDDC;
  color: #000;
}

.summary-row {
  border-top: 2px solid #D9DDDC;
  padding: 2em 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
}

.label--accent {
  font-size: 20px;
  font-weight: 700;
}

</style>
