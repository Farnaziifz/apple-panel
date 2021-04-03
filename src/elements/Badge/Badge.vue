<template>
  <div
    class="badge"
    :class="[ light ?  `badge-light-${color}` : `badge-${color}` , `badge-${size}` , { block : block , 'badge-square' : square , 'badge-pill' : pill , 'badge-glow' : glow }]"
  >
    <slot name="icon"></slot>
    <span>{{ text }}</span>
    <img class="badge-image" :src="imageUrl" alt />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "danger"
    },
    size: {
      type: String,
      default: "sm"
    },
    pill: {
      type: Boolean,
      default: true
    },
    glow: {
      type: Boolean,
      default: true
    },
    light: {
      type: Boolean,
      default: true
    },
    square: {
      type: Boolean
    },
    text: {
      type: String
    },
    imageUrl: {
      type: String
    },
    block: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.badge-image {
  max-width: 12px;
  max-height: 12px;
}
</style>
