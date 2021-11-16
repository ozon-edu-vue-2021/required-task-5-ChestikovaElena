import axios from "axios";
import Vue from "vue";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
} from "../actions.js";
import {
  ADD_PRICE_IMAGE,
  ADD_PRICE_SUCCESS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../mutations.js";
import { images } from "@/assets/data/images.js";

const state = {
  data: [],
  productsRequest: false,
  productsFailed: false,
  isAllProductsUpdate: false,
};

const getters = {
  getFavorites: (state) => {
    return state.data.filter((i) => i.isFavorited === true);
  },
  getFavoritesCount: (state) => {
    return state.data.filter((i) => i.isFavorited === true)?.length ?? 0;
  },
};

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
  [ADD_PRICE_IMAGE](state, payload) {
    const item = state.data.find((i) => i.id === payload.id);
    const getPrice = (min, max) => {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    };
    const price = getPrice(50, 250);

    const getRundomImages = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const image = getRundomImages(0, images.length);

    if (item) {
      Vue.set(item, "price", price);
      Vue.set(item, "image", images[image]);
    }
  },
  [ADD_PRICE_SUCCESS](state) {
    state.isAllProductsUpdate = true;
  },
  [ADD_TO_FAVORITES](state, payload) {
    const item = state.data.find((i) => i.id === payload.id);

    if (item) {
      Vue.set(item, "isFavorited", true);
    }
  },
  [REMOVE_FROM_FAVORITES](state, payload) {
    const item = state.data.find((i) => i.id === payload.id && i.isFavorited);

    if (item) {
      Vue.set(item, "isFavorited", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
