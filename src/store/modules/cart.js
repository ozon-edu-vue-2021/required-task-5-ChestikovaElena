import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
} from "../mutations.js";

const state = {
  selectedProducts: [],
};

const getters = {
  getTotalPrice: (state) => {
    return state.selectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  },
  getTotalCount: (state) => {
    return state.selectedProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  },
};

const mutations = {
  [ADD_TO_CART](state, payload) {
    const item = state.selectedProducts.find(
      (i) => i.id === payload.product.id
    );
    if (item) {
      item.quantity += payload.count;
    } else {
      state.selectedProducts.push({
        ...payload.product,
        quantity: payload.count,
      });
    }
  },
  [REMOVE_FROM_CART](state, payload) {
    const item = state.selectedProducts.find((i) => i.id === payload.id);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.selectedProducts = state.selectedProducts.filter(
          (i) => i.id !== payload.id
        );
      }
    }
  },
  [REMOVE_ALL_FROM_CART](state, payload) {
    const item = state.selectedProducts.find((i) => i.id === payload.id);
    if (item) {
      state.selectedProducts = state.selectedProducts.filter(
        (i) => i.id !== payload.id
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
