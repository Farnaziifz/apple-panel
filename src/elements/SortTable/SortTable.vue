<template>
  <th
    @click="getSortTitle"
    class="sorting_asc"
    :class="{ 'is-asc' : sortTitle === 'ASC',  'is-dsc' : sortTitle === 'DSC' }"
  >{{columnHeader}}</th>
</template>

<script>
export default {
  data() {
    return {
      sortTitle: null
    };
  },
  props: {
    columnHeader: String,
    columnName: String
  },
  methods: {
    getSortTitle() {
      if (!this.sortTitle) {
        this.sortTitle = "ASC";
        this.$emit("getSortTitle", this.sortTitle, this.columnName);
      } else {
        if (this.sortTitle === "ASC") {
          this.sortTitle = "DSC";
          this.$emit("getSortTitle", this.sortTitle, this.columnName);
        } else {
          this.sortTitle = "ASC";
          this.$emit("getSortTitle", this.sortTitle, this.columnName);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
th {
  position: relative;
  padding-right: 30px;
  cursor: pointer;
  &.is-asc {
    &::before {
      color: white;
    }
  }
  &.is-dsc {
    &::after {
      color: white;
    }
  }

  &::after {
    font-size: 0.7rem;
    right: 0.857rem;
    top: 8px;
    font-family: "feather";
    content: "\e842";
    position: absolute;
  }

  &::before {
    font-size: 0.7rem;
    right: 0.857rem;
    top: 2px;
    font-family: "feather";
    content: "\e845";
    position: absolute;
  }
}
</style>