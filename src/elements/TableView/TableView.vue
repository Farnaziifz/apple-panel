<template>
  <div>
    <div class="scroll-top-container">
      <div class="scroll-handler" :style="`width: ${scrollWidth}px`"></div>
    </div>
    <div class="table-responsive">
      <table
        class="table baman-content-table-view"
        :class="{'table-dark' : dark, 'table-bordered' : bordered, 'table-striped' : striped, 'table-hover' : hover, 'table-hover-animation' : hoverAnimation}"
      >
        <thead>
          <slot name="TableSearch"></slot>
        </thead>
        <thead>
          <slot name="TableTitle"></slot>
        </thead>
        <tbody>
          <slot name="TableBody"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
    },
    hover: {
      type: Boolean,
    },
    hoverAnimation: {
      type: Boolean,
    },
    bordered: {
      type: Boolean,
    },
    striped: {
      type: Boolean,
    },
  },
  data() {
    return {
      scrollWidth: 0,
    };
  },
  methods: {
    tableResponsiveScroll() {
      document
        .querySelector(".table-responsive")
        .addEventListener("scroll", () => {
          document.querySelector(
            ".scroll-top-container"
          ).scrollLeft = document.querySelector(".table-responsive").scrollLeft;
        });
    },
    scrollTopContainerScroll() {
      document
        .querySelector(".scroll-top-container")
        .addEventListener("scroll", () => {
          document.querySelector(
            ".table-responsive"
          ).scrollLeft = document.querySelector(
            ".scroll-top-container"
          ).scrollLeft;
        });
    },
  },
  mounted() {
    this.tableResponsiveScroll();
    this.scrollTopContainerScroll();
  },
  updated() {
    this.$nextTick(() => {
      this.scrollWidth = document
        .querySelector(".baman-content-table-view")
        .getBoundingClientRect().width;
    });
  },
  beforeDestroy() {
    document
      .querySelector(".scroll-top-container")
      .removeEventListener("scroll", this.scrollTopContainerScroll);
    document
      .querySelector(".table-responsive")
      .removeEventListener("scroll", this.tableResponsiveScroll);
  },
};
</script>

<style scoped lang="scss">
.scroll-top-container {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;

  .scroll-handler {
    height: 2px;
  }
}

table tr th {
  font-size: 13px !important;
}
table tr th,
table tr td {
  text-align: center !important;
}
</style>
