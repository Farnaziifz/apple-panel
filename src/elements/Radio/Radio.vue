<template>
  <div>
    <div class="vs-radio-con" :class="[`vs-radio-${radioColor}`]">
      <input type="radio" :name="name" :checked="value" v-on="inputListeners" v-bind="$attrs" />
      <span class="vs-radio" :class="[`vs-radio-${size}`]">
        <span class="vs-radio--border"></span>
        <span class="vs-radio--circle"></span>
      </span>
      <span class>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean },
    name: {
      type: String
    },
    label: {
      type: String
    },
    radioColor: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
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
            vm.$emit("input", event.target.checked);
          }
        }
      );
    }
  }
};
</script>
