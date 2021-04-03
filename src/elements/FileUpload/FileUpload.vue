<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="custom-file">
      <input
        type="file"
        class="custom-file-input"
        v-on="inputListeners"
        v-bind="$attrs"
        id="inputGroupFile01"
        
      />
      <label class="custom-file-label">{{ value ? value : placeholder }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    label: { type: String },
    placeholder: { type: String }
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
            vm.$emit("input", event.target);
            // vm.$emit('preview', event.target.files[0])
          }
        }
      );
    }
  }
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
}
</style>