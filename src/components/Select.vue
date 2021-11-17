<template>
  <div>
    <div class="selector" v-click-outside="hideDropdown">
        <input
          class="selector-input"
          id="selector-input"
          :value="value"
          @focus="focusHandler"
        />
        <div
          :class="['icon-wrapper', {
            'icon-wrapper--active': isDropdownOpen
          }]"
          @click="focusHandler"
        >
          <Icon iconType="arrow" />
        </div>
        <div
          v-if="isDropdownOpen"
          class="selector___dropdown"
        >
          <ul
            v-if="values && values.length"
            class="selector-list"
          >
            <li
              v-for="item in values"
              :key="item"
              class="selector-item"
              @click="clickHandler(item)"
            >
              {{item}}
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import Icon from "./Icon.vue";

export default {
  name: "Select",
  directives: {
    ClickOutside,
  },
  components: {
    Icon,
  },
  props: {
    value: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      count: 1,
    };
  },
  methods: {
    hideDropdown() {
      return this.isDropdownOpen = false;
    },
    focusHandler() {
      this.isDropdownOpen = true;
    },
    clickHandler(currValue) {
      this.$emit('selected:countOfProducts', currValue)
      this.isDropdownOpen = false;
    },
  }
}
</script>

<style scoped>
.selector {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80px;
}

.selector-input {
  padding: 4px;
  border: 2px solid #b3bcc5;
  border-radius: 6px;
  width: 80px;
  outline: none;
  font-size: 16px;
  color: #001a34;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selector-input:focus,
.selector-input:hover {
  border: 2px solid #005bff;
}

.selector-list {
  padding: 0;
  list-style: none;
  position: absolute;
  z-index: 999;
  width: 80px;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.selector-item {
  padding: 5px 10px;
  background-color: transparent;
  cursor: pointer;
}

.selector-item:not(:last-child) {
  border-bottom: 2px solid #b3bcc5;
}

.selector-item:hover {
  background-color: #c4daf0;
}

.icon-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  fill: #9b9d9f;
  transition: all 0.5s ease;
}

.icon-wrapper--active {
  transform: rotate(200grad);
}

</style>
