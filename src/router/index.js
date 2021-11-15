import Vue from "vue";
import VueRouter from "vue-router";
import Catalog from "../components/Catalog.vue";
import Cart from "../components/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Catalog,
  },
  {
    path: "/cart",
    component: Cart,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
