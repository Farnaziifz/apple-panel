<template>
  <div>
    <label class="label">{{ label }}</label>
    <div>
      <textarea
        class="form-control"
        :value="value"
        v-on="inputListeners"
        v-bind="$attrs"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "textarea",

  props: {
    label: String,
    value: {},
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
.label {
  color: #fff;
  margin-bottom: 5px;
}
textarea {
  resize: none;
  display: block;
  height: 150px;
}
</style>
