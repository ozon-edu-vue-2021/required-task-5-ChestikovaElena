import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
} from "../actions.js";
import { ADD_PRICE, ADD_PRICE_SUCCESS } from "../mutations.js";

const state = {
  data: [],
  productsRequest: false,
  productsFailed: false,
  isAllProductsUpdate: false,
};

const getters = {};

const actions = {
  async getProducts(context) {
    context.commit("getProductsRequest");
    try {
      const payload = await axios.get(
        "https://random-data-api.com/api/food/random_food?size=30"
      );
      context.commit("getProducts", payload.data);
      context.commit("getProductsSuccess");
    } catch {
      context.commit("getProductsFailed");
    }
  },
};

const mutations = {
  [GET_PRODUCTS](state, payload) {
    state.data = payload;
  },
  [GET_PRODUCTS_REQUEST](state) {
    state.productsRequest = true;
  },
  [GET_PRODUCTS_SUCCESS](state) {
    state.productsRequest = false;
    state.productsFailed = false;
  },
  [GET_PRODUCTS_FAILED](state) {
    state.productsRequest = false;
    state.productsFailed = true;
  },
  [ADD_PRICE](state, payload) {
    const item = state.data.find((i) => i.id === payload.id);
    const getPrice = (min, max) => {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    };
    const price = getPrice(50, 250);
    if (item) {
      item.price = price;
    }
  },
  [ADD_PRICE_SUCCESS](state) {
    state.isAllProductsUpdate = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};