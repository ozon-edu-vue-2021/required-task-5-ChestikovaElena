<template>
  <div id="app">
    <div class="wrapper">
      <nav id="nav">
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/">
              Каталог
            </router-link>
          </li>
          <li class="menu-item menu-item--teaps">
            <router-link to="/Favorites">
              <span>
                Избранное
              </span>
              <span class="teaps">
                {{ getFavoritesCount || 0 }}
              </span>
            </router-link>
          </li>
          <li class="menu-item menu-item--teaps">
            <router-link to="/Cart">
              <span>
                Корзина
              </span>
              <span class="teaps">
                {{ getTotalCount || 0 }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
        <div class="container">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters('cart',['getTotalCount']),
    ...mapGetters('products',['getFavoritesCount']),
    ...mapState('products',['data']),
  },
  methods: {
    ...mapActions("products", ["getProducts"]),
    ...mapMutations("products", ["addPriceImage", "addPriceSuccess"]),
  },
  async created() {
    await this.getProducts();
    this.data.map( async i => await this.addPriceImage(i));
    this.addPriceSuccess();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

p {
  margin: 0;
}

</style>

<style scoped>
.wrapper {
  padding: 20px 300px;
}

.container {
  margin-top: 30px;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 20px 0;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 40px;
  justify-content: center;
}

#nav a {
  font-size: 20px;
  font-weight: bold;
  color: #001a34;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: royalblue;
}

.menu-item--teaps {
  position: relative;
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
  right: -25px;
  top: -5px;
  font-size: 12px;
}
</style>
