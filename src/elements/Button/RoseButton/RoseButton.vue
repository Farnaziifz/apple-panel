<template>
  <!-- create a button as component with rose color of bootstrap -->
  <button
    class="btn"
    v-bind:class="{
      'btn-rose': !outline,
      'btn-outline-rose': outline,
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
.btn-rose {
  background-color: #e91e63 !important;
  color: aliceblue;
}
.btn-outline-rose {
  background-color: transparent;
  color: #e91e63;
  border: 1px solid #e91e63;
}

button.btn.btn-outline-rose {
  &:hover {
    background-color: #e91e63;
    border-color: #e91e63;
    color: white;
  }
}
.loading {
  pointer-events: none;
}
</style>
