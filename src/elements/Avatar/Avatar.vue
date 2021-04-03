<template>
  <div class="avatar" :class="[`bg-${backgroundColor}`, `avatar-${size}`]">
    <div class="avatar-content position-relative">
      <slot name="icon"></slot>
      <img v-if="imageUrl" class="avatar-image" :src="imageUrl" alt />
      <span
        v-if="badgeText"
        class="badge badge-pill badge-up"
        :class="[`badge-${badgeColor}`, `badge-${badgeSize}`]"
        >{{ badgeText }}</span
      >
    </div>
    <span v-if="status" :class="[`avatar-status-${status}`]"></span>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
    imageUrl: {
      type: String,
    },
    badgeColor: {
      type: String,
      default: "danger",
    },
    badgeSize: {
      type: String,
      default: "sm",
    },
    badgeText: {
      type: String,
    },
    status: {
      type: String, // can be  online , offline, away, busy
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-image {
  max-width: 100%;
}
</style>
