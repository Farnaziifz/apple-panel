<template>
  <div
    class="divider"
    :class="[`divider-${dividerColor}`, `divider-${dividerTextPosition}`,  {'divider-dotted' : isDotted} , {'divider-dashed' : isDashed}]"
  >
    <div class="divider-text" :class="[`text-${dividerTextColor}`]">{{ dividerText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    dividerColor: {
      type: String,
      default: "primary"
    },
    dividerText: {
      type: String,
      default: "primary"
    },
    dividerTextColor: {
      type: String
    },
    dividerTextPosition: {
      type: String, // left || left-center || right || right-center
      default: "center"
    },
    isDotted: {
      type: Boolean
    },
    isDashed: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.divider-text {
  background-color: transparent !important;
}
</style>