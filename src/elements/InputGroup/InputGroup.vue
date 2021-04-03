<template>
  <div class="input-group" :class="[`input-group-${size}`]">
    <div
      v-if="prependText || prependType != 'span'"
      @click="onPrependClicked"
      class="input-group-prepend"
    >
      <span v-if="prependType === 'span'" class="input-group-text">{{ prependText }}</span>
      <bmn-button v-if="prependType === 'button'" v-bind="prependButtonType" :title="prependText"></bmn-button>
      <div v-if="prependType === 'checkbox'" class="input-group-text">
        <bmn-checkbox v-bind="prependCheckboxType" :label="prependText"></bmn-checkbox>
      </div>
      <div v-if="prependType === 'radio'" class="input-group-text">
        <bmn-radio v-bind="prependRadioType" :label="prependText"></bmn-radio>
      </div>
    </div>
    <input
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      v-on="inputListeners"
      v-bind="$attrs"
    />
    <div v-if="appendText" @click="onAppendClicked" class="input-group-append">
      <span v-if="appendType === 'span'" class="input-group-text">{{ appendText }}</span>
      <bmn-button v-if="appendType === 'button'" v-bind="appendButtonType" :title="appendText"></bmn-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String },
    type: { type: String, default: "text" },
    size: {
      type: String,
      default: "md"
    },
    prependText: {
      type: String
    },
    prependType: {
      type: String,
      default: "span"
    },
    prependButtonType: {
      type: Object,
      default: () => {
        return { btnColor: "warning", outline: true };
      }
    },
    prependCheckboxType: {
      type: Object,
      default: () => {
        return {
          // label: "", label overwrite with prepend text
          size: "",
          checkboxColor: "primary",
          value: true
        };
      }
    },
    prependRadioType: {
      type: Object,
      default: () => {
        return {
          // label: "", label overwrite with prepend text
          size: "",
          radioColor: "primary",
          value: false,
          name: "radio1"
        };
      }
    },
    appendText: {
      type: String
    },
    appendType: {
      type: String,
      default: "span"
    },
    appendButtonType: {
      type: Object,
      default: () => {
        return { btnColor: "success", outline: true };
      }
    }
  },
  methods: {
    onPrependClicked() {
      this.$emit("prependClicked");
    },
    onAppendClicked() {
      this.$emit("appendClicked");
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