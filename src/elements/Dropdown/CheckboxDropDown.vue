<template>
  <div>
    <div class="dropdown">
      <p>{{ label }}</p>
      <div class="items-container" v-if="selectedItem.length > 0">
        <div class="items" v-for="item in selectedItem" :key="item.id">
          <span>{{ item.text }}</span>
        </div>
      </div>
      <fav-dropdown
        :items="items"
        optionPlaceholder="انتخاب کنید"
        @input="addItems"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: [],
    };
  },

  props: {
    label: String,
    items: Array,
  },

  methods: {
    addItems(value) {
      this.selectedItem.push(value);
      this.$emit("selectedItems", this.selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  p {
    margin-bottom: 0;
  }
}
.items-container {
  display: flex;
  margin-bottom: 10px;
  .items {
    padding: 5px;
    background-color: #7367f0;
    border-radius: 4px;
    margin: 5px;
  }
}
</style>
