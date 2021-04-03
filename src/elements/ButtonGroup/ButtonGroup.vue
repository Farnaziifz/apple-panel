<template>
  <div class="btn-group" :class="{'btn-group-vertical' : isVertical}">
    <bmn-button
      v-for="(item, index) in items"
      :key="index"
      v-bind="item"
      @click="buttonClick(item)"
    ></bmn-button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [
          { id: 1, title: "instagram", btnColor: "primary", outline: true },
          { id: 2, title: "twitter", btnColor: "danger", outline: false },
          { id: 3, title: "facebook", btnColor: "warning", outline: true }
        ];
      }
    },
    isVertical: { type: Boolean }
  },
  methods: {
    buttonClick(item) {
      this.$emit("buttonClick", item);
    }
  }
};
</script>

<style>
</style>