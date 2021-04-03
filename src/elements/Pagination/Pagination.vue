<template>
  <nav>
    <ul
      class="pagination"
      :class="[`pagination-${activeColor}`, `justify-content-${position}`]"
    >
      <li
        class="page-item action-button"
        @click.prevent="onPrevPageClicked(activePage)"
        v-if="hasPrev"
      >
        <a class="page-link" href="#">‹</a>
      </li>
      <li
        class="page-item"
        v-for="(item, index) in totalPage"
        :key="index"
        :class="{ active: item == activePageData }"
        @click="selectPage(item)"
      >
        <a class="page-link" href="#">{{ item }}</a>
      </li>

      <li
        class="page-item action-button"
        @click.prevent="onNextPageClicked(activePage)"
        v-if="hasNext"
      >
        <a class="page-link" href="#">›</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    customItemsPerPage: {
      type: Number,
      required: false,
    },
    activeColor: {
      type: String,
      default: "primary",
    },
    position: {
      type: String,
      default: "center", // center || start || end
    },
    totalPage: {
      type: Number,
    },
    activePage: {
      type: Number,
    },
    hasNext: {
      type: Boolean,
    },
    hasPrev: {
      type: Boolean,
    },
  },
  data() {
    return {
      pagesCount: 0,
      activePageData: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    selectPage(item) {
      this.activePageData = item;
      this.$emit("sendPageNumber", item);
    },
    onNextPageClicked(item) {
      this.activePageData = item + 1;
      this.$emit("goNext", this.activePageData);
    },
    onPrevPageClicked(item) {
      this.activePageData = item - 1;
      this.$emit("goPrev", this.activePageData);
    },
  },
};
</script>

<style scoped lang="scss">
.action-button {
  a {
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    min-width: 34px;
    justify-content: center;
    align-items: center;
    font-size: 20px !important;
    padding-bottom: 1px;
  }
}
.pagination {
  flex-wrap: wrap;
}
</style>
