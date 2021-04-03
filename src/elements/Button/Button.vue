<template>
  <button
    type="button"
    class="btn"
    :class="[
      btnColorClass,
      btnTextColorClass,
      btnBorderColorClass,
      btnIconClass,
      roundedCircleClass,
      btnSizeClass,
      blockBtnClass,
    ]"
    :style="styleObj"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <img
      class="loading-image"
      v-if="loading"
      src="@/assets/img/Loading/blue-loading.svg"
      alt
    />
    <div v-else class="fav-button">
      <img
        v-if="btnImageUrl"
        class="button-image"
        :class="{ 'has-margin': title }"
        :src="btnImageUrl"
        alt
      />
      <i class="feather" :class="iconClass"></i>
      <span v-if="title" :class="textColor">{{ title }}</span>
    </div>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
    },
    btnImageUrl: {
      type: String,
    },
    textColor: {
      type: String,
    },
    btnColor: {
      type: String,
      default: "primary",
    },
    btnTextColor: {
      type: String,
    },
    btnBorderColor: {
      type: String,
    },
    btnSize: {
      type: String,
    },
    iconClass: {
      type: String,
    },
    outline: {
      type: Boolean,
    },
    flat: {
      type: Boolean,
    },
    gradient: {
      type: Boolean,
    },
    relief: {
      type: Boolean,
    },
    square: {
      type: Boolean,
    },
    round: {
      type: Boolean,
    },
    block: {
      type: Boolean,
    },
    icon: {
      type: Boolean,
    },
    roundedCircle: {
      type: Boolean,
    },

    loading: {
      type: Boolean,
      default: false,
    },
    styleObj: {
      type: Object,
    },
  },
  computed: {
    btnSizeClass() {
      if (this.btnSize) {
        return `btn-${this.btnSize}`;
      }
    },
    btnColorClass() {
      if (this.flat) {
        return `btn-flat-${this.btnColor}`;
      }
      if (this.gradient) {
        return `bg-gradient-${this.btnColor}`;
      }
      if (this.relief) {
        return `btn-relief-${this.btnColor}`;
      }
      if (this.square) {
        if (this.outline) {
          return `btn-outline-${this.btnColor} square`;
        }
        return `btn-${this.btnColor} square`;
      }
      if (this.round) {
        if (this.outline) {
          return `btn-outline-${this.btnColor} round`;
        }
        return `btn-${this.btnColor} round`;
      }
      if (this.outline) {
        return `btn-outline-${this.btnColor}`;
      }
      return `btn-${this.btnColor}`;
    },
    btnTextColorClass() {
      if (this.btnTextColor) {
        return `text-${this.btnTextColor}`;
      }
    },
    btnBorderColorClass() {
      if (this.btnBorderColor) {
        return `border-${this.btnBorderColor}`;
      }
    },
    btnIconClass() {
      if (this.icon) {
        return `btn-icon`;
      }
    },
    roundedCircleClass() {
      if (this.roundedCircle) {
        return `rounded-circle`;
      }
    },
    blockBtnClass() {
      if (this.block) {
        return `btn-block`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-image {
  max-width: 50px;
}

.button-image {
  width: 14px;
  height: 14px;
  &.has-margin {
    margin-left: 4px;
  }
}
.btn {
  i {
    margin-left: 0.5rem !important;
  }
}

.fav-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
