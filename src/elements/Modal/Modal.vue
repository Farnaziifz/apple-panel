<template>
  <div class="mnx-modal-wrapper" :class="{ show: show }">
    <div class="mnx-modal" :class="size">
      <div class="close-btn" v-if="closeBtn" @click="close">×</div>
      <div class="mnx-header-container">
        <slot name="mnx-header"></slot>
      </div>
      <div class="mnx-body-container">
        <slot name="mnx-body"></slot>
      </div>
      <div class="mnx-footer-container">
        <slot name="mnx-footer" @click="close"></slot>
      </div>
    </div>
    <div class="mnx-modal-mask" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: "TestModal",
  props: {
    size: {
      // size of modal
      default: null,
      type: String,
      // Sample ====>>>> 'full' OR null (should be enhanced)
    },
    closeBtn: {
      // close button show condition
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      this.$emit("onOpened");
    },
    close() {
      this.show = false;
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      this.$emit("onClosed");
    },
  },
};
</script>

<style scoped lang="scss">
.mnx-modal-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100000;
  top: 50%;
  overflow: hidden;
  opacity: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
  transition: 0.3s;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  .mnx-modal {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 4px;
    z-index: 2;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14);

    &.small {
      width: 25%;
    }

    &.medium {
      width: 50%;
    }

    &.large {
      width: 75%;
    }

    &.full {
      width: calc(100% - 32px);
    }

    .close-btn {
      position: absolute;
      left: 16px;
      top: 18px;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: dimgrey;
      cursor: pointer;
    }

    .mnx-body-container {
      margin-top: 10px;
    }
  }
  .mnx-modal-mask {
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0.32;
    background-color: #000000;
  }
}

@media (max-width: 575.98px) {
  .mnx-modal {
    width: calc(100% - 32px) !important;
  }
}
</style>
