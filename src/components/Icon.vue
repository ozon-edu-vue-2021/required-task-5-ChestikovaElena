<template>
  <div
    class="icon__wrapper"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
      v-html="types[iconType]"
    >
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconType: {
      type: String,
      default: 'home'
    }
  },
  data: () => ({
    types: {
      arrow:
        `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/>`,
      done:
        `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>`,
      error:
        `<path d="M0 0h24v24H0V0z" fill="none"/><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z"/>`,
      cart:
        `<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H.867L2.18 18.496A4 4 0 006.15 22h11.703a4 4 0 003.969-3.504L23.133 8H18V6a4 4 0 00-4-4h-4zm3 7a1 1 0 00-1-1H8V6a2 2 0 012-2h4a2 2 0 012 2v4h4.867l-1.03 8.248A2 2 0 0117.851 20H6.148a2 2 0 01-1.984-1.752L3.133 10H12a1 1 0 001-1z" fill="currentColor"></path>`
    }
  })
}
</script>

<style scoped>
.icon__wrapper {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  fill: inherit;
}

</style>
