<template>
  <div class="form-group">
    <label class="title">{{ title }}</label>
    <select
      v-model="selectedItem"
      @change="onChange"
      v-bind="$attrs"
      :class="customSelect ? 'custom-select' : 'form-control'"
    >
      <option :value="null" :disabled="$attrs.hasOwnProperty('multiple')">{{
        optionPlaceholder
      }}</option>
      <option
        v-for="(item, index) in items"
        :key="index"
        :value="optionalReturnKey ? item[optionalReturnKey] : item"
        >{{ item.title }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  props: {
    optionPlaceholder: {
      type: String,
    },
    value: {},
    items: {
      type: Array,
      default: () => {
        return [
          //   { text: "One", value: "A" },
          //   { text: "Two", value: "B" },
          //   { text: "Three", value: "C" }
        ];
      },
    },
    title: String,
    label: {
      type: String,
      default: " انتخاب کنید",
    },
    optionalShowKey: {
      type: String,
      default: "text",
    },
    optionalReturnKey: {
      type: String,
    },
    customSelect: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectedItem: [],
    };
  },
  created() {
    if (!this.$attrs.hasOwnProperty("multiple")) {
      this.selectedItem = null;
    }
  },
  mounted() {
    if (this.value) {
      this.selectedItem = this.value;
    }
  },
  methods: {
    onChange(e) {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>

<style lang="scss">
.title {
  font-size: 12px;
  color: #fff !important;
  margin-bottom: 5px;
}
</style>
