<template>
  <div class="input-group bootstrap-touchspin" :class="[`input-group-${size}`]">
    <span class="input-group-btn input-group-prepend bootstrap-touchspin-injected">
      <button
        class="btn bootstrap-touchspin-down"
        :class="[`btn-${color}`]"
        type="button"
        @click="onMinusClick"
      >-</button>
    </span>
    <input
      type="number"
      class="touchspin form-control"
      :step="step"
      :placeholder="placeholder"
      v-on="inputListeners"
      v-bind="$attrs"
      :value="value"
      ref="numberInput"
    />
    <span class="input-group-btn input-group-append bootstrap-touchspin-injected">
      <button
        class="btn bootstrap-touchspin-up"
        :class="[`btn-${color}`]"
        type="button"
        @click="onAddClick"
      >+</button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    label: { type: String },
    placeholder: { type: String },
    step: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
    }
  },
  methods: {
    onAddClick() {
      const newValue = Number.parseInt(this.value) + Number.parseInt(this.step);
      this.$refs.numberInput.value = newValue;
      this.$emit("input", newValue);
    },
    onMinusClick() {
      const newValue = Number.parseInt(this.value) - Number.parseInt(this.step);
      this.$refs.numberInput.value = newValue;
      this.$emit("input", newValue);
    }
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
          }
        }
      );
    }
  }
};
</script>

<style>
</style>