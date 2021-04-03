<template>
  <div
    class="form-group position-relative"
    :class="{
      'has-icon-left input-divider-left': showImage && !rightImage,
      'has-icon-right input-divider-right': rightImage,
    }"
  >
    <label for="basicInput" class="basicInput">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :class="[
        {
          round: round,
          square: square,
          'is-valid': valid,
          'is-invalid': invalid,
        },
        `form-control-${size}`,
      ]"
      :placeholder="placeholder"
      v-on="inputListeners"
      v-bind="$attrs"
      :value="value"
    />
    <div
      v-if="validText"
      :class="[!tooltip ? 'valid-feedback' : 'valid-tooltip']"
    >
      {{ validText }}
    </div>
    <div
      v-if="invalidText"
      :class="[!tooltip ? 'invalid-feedback' : 'invalid-tooltip']"
    >
      {{ invalidText }}
    </div>
    <div
      v-if="showImage"
      class="form-control-position"
      :class="{ 'right-image': rightImage }"
    >
      <img :src="imageUrl" alt />
    </div>
    <span v-if="showSeparator" class="price">
      {{ value | toPersianCurrency((cur = "ssss"), 0) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    label: { type: String },
    placeholder: { type: String },
    type: { type: String, default: "text" },
    round: {
      type: Boolean,
    },
    square: {
      type: Boolean,
    },
    valid: {
      type: Boolean,
    },
    validText: {
      type: String,
    },
    invalid: {
      type: Boolean,
    },
    invalidText: {
      type: String,
    },
    tooltip: {
      type: Boolean,
    },
    showImage: {
      type: Boolean,
    },
    imageUrl: {
      type: String,
    },
    rightImage: {
      type: Boolean,
    },
    size: {
      type: String,
      default: "md",
    },
    showSeparator: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "تومان",
    },
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit("input", event.target.value);
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control-position {
  top: 37%;
  img {
    min-width: 30px;
    max-width: 40px;
    padding: 0.2rem 0.5rem;
    border-left: 1px solid #d9d9d9;
  }

  &.right-image {
    left: 4px;
    img {
      border-left: none;
      border-right: 1px solid #d9d9d9;
    }
  }
}
span.price {
  font-family: IRANSansMobileFaNum;
  position: absolute;
  left: 0;
  top: -12px;
  color: #999;
}

.basicInput {
  color: #fff;
  margin-bottom: 5px;
}
</style>
