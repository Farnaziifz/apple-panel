<template>
  <div class="vs-checkbox-con" :class="[`vs-checkbox-${checkboxColor}`]">
    <input
      type="checkbox"
      :checked="value"
      v-bind="$attrs"
      class="checkbox form-control"
      :class="`form-control-${size}`"
      @change="changeCheckboxStatus($event)"
      :id="itemId"
    />
    <span class="vs-checkbox" :class="[`vs-checkbox-${size}`]">
      <span class="vs-checkbox--check">
        <i class="vs-icon feather icon-check"></i>
      </span>
    </span>
    <label :for="itemId" class="labelll">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean },
    label: {
      type: String,
    },
    checkboxColor: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
    itemId: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    changeCheckboxStatus(event) {
      console.log(this.itemId);
      let itemInfo = { id: this.itemId, status: event.target.checked };
      this.$emit("input", itemInfo);
      this.$emit("inputChanged", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.labelll {
  cursor: pointer;
}
</style>
