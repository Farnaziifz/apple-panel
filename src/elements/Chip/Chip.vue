<template>
  <div class="chip" :class="[`chip-${backgroundColor}`]">
    <div class="chip-body" :class="{'is-reverse' : rightIcon}">
      <span class="chip-text">{{ text }}</span>
      <div v-if="imageUrl" :class="{'avatar' : rightIcon, 'chip-closeable' : !rightIcon}" @click="iconClicked">
        <slot name="icon"></slot>
        <img v-if="imageUrl" :src="imageUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "primary"
    },
    text: {
      type: String
    },
    imageUrl: {
      type: String
    },
    rightIcon: {
      type: Boolean
    }
  },
  methods: {
    iconClicked() {
      this.$emit("iconClicked");
    }
  }
};
</script>

<style lang="scss" scoped>
.chip-closeable {
  max-width: 15px;
  max-height: 15px;
  overflow: hidden;
  img {
    max-width: 100%;
  }
}

.is-reverse {
  flex-direction: row-reverse;
}
</style>