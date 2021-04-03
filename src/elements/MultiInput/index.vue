<template>
  <div class="chip-input-component">
    <div class="input-container">
      <fav-input
        placeholder="افزودن آیتم"
        v-model="item"
        @input="getItem"
        class="input"
      />
      <button class="btn btn-primary" @click="createItem">{{ title }}</button>
    </div>
    <div class="items-container">
      <div class="item" v-for="(item, index) in items" :key="index">
        <fav-chip :text="item.item" @iconClicked="iconClicked(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    defItems: Array,
  },
  data() {
    return {
      item: "",
      items: [],
    };
  },

  methods: {
    getItem() {
      this.$emit("item", this.item);
    },
    createItem() {
      this.items.push({ id: Math.floor(Math.random() * 100), item: this.item });
      this.item = "";
      this.$emit("items", this.items);
    },
    iconClicked(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.$emit("items", this.items);
    },
  },
};
</script>

<style lang="scss" scoped>
.chip-input-component {
  width: 100%;

  .input-container {
    display: flex;
    align-items: center;
  }
  .input {
    flex: 1;
    margin-left: 10px;
  }
  .items-container {
    display: flex;
    .item {
      margin-left: 10px;
    }
  }
}
</style>
