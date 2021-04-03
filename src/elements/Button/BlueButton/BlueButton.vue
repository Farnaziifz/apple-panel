<template>
  <!-- create a button as component with rose color of bootstrap -->
  <button
    class="btn"
    v-bind:class="{
      'btn-blue': !outline,
      'btn-outline-blue': outline,
      'btn-round': round,
    }"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  //set button title with title prop, outline bootstrap class with outline prop, btn-round class with round prop,
  //image path with imagePath prop, image position with imagePosition prop
  props: ["title", "outline", "round", "imagePath", "imagePosition", "loading"],
};
</script>

<style lang="scss">
.btn {
  min-width: 100px;
  height: 40px;
}
.btn-blue {
  background-color: #00cfe8 !important;
  color: #000;
}
.btn-outline-blue {
  background-color: transparent;
  color: #00cfe8;
  border: 1px solid #00cfe8;
}

button.btn.btn-outline-blue {
  &:hover {
    background-color: #00cfe8;
    border-color: #00cfe8;
    color: #000;
  }
}
.loading {
  pointer-events: none;
}
</style>
