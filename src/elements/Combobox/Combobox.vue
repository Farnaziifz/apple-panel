<template>
  <div class="combobox-main-parent">
    <div class="input-container">
      <!-- <textbox-dropdown
        :items="entries"
        :label="label"
        v-model="value"
        v-if="entries"
        @onEnterPressed="enterPressed()"
      ></textbox-dropdown>-->
      <bmn-input :label="label" v-model="value" @keydown.enter="enterPressed()"></bmn-input>
    </div>
    <div>
      <bmn-chip
        v-for="(addedItem, index) of addedItems"
        :key="index"
        :text="typeof addedItem === 'object' ? addedItem[optionalKey] : addedItem"
        @iconClicked="deleteItem(index)"
        class="chip-item"
        :backgroundColor="chipColor"
      >
        <template v-slot:icon>
          <i class="feather icon-x"></i>
        </template>
      </bmn-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: "Combobox",
  props: {
    entries: Array,
    label: {
      required: true,
      type: String
    },
    limitAddData: Number,
    defaultItems: {
      type: Array,
      default: () => {
        return [];
      }
    },
    inputRules: Object,
    listRules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    optionalKey: {
      type: String,
      default: "name"
    },
    chipColor: {
      type: String,
      default: "primary"
    }
  },
  data() {
    return {
      value: null,
      addedItems: []
    };
  },
  mounted() {
    this.populateDefaultItems();
  },
  methods: {
    populateDefaultItems() {
      if (this.defaultItems.length > 0) {
        this.addedItems = Array.from(this.defaultItems);
        this.$emit("onValueChanged", this.addedItems);
      }
    },
    enterPressed() {
      // if we don't have any input, return
      if (!this.value) return;
      if (this.limitAddData && this.addedItems.length === this.limitAddData) {
        return;
      }

      // if we use dropdown
      if (this.entries && this.entries.length > 0) {
        const foundValue = this.entries.find(
          p => p[optionalKey] === this.value[optionalKey]
        );

        // check if value s existed in our `entries` array
        if (foundValue) {
          this.addedItems.push(this.value);
          this.$emit("onValueChanged", this.addedItems);
        }

        // if we use textbox
      } else {
        this.addedItems.push(this.value);
        this.$emit("onValueChanged", this.addedItems);
      }
      this.value = null;
    },
    // delete items from array
    deleteItem(index) {
      this.addedItems.splice(index, 1);
      this.$emit("onValueChanged", this.addedItems);
    }
  },

  watch: {
    // if data binding was asynchronous
    defaultItems: function(newVal, prevVal) {
      if (newVal.length !== prevVal.length) {
        this.populateDefaultItems();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.chip-item {
  margin-left: 8px;
}
</style>
