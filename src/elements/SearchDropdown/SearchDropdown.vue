<template>
  <div>
    <div class="input-container">
      <fav-input
        placeholder=" حداقل دو کاراکتر وارد کنید"
        @change="getName"
        v-model="search"
        @input="searchOnTable"
        :label="label"
      />
      <span class="selected-item"></span>
      <div class="loading" v-if="loading"></div>
    </div>
    <div class="items-found" v-if="showItems">
      <div
        class="item"
        v-for="item in responseItems"
        :key="item.id"
        @click="getSelectedItem(item)"
      >
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      debounceTimeoutFunction: null,
      search: "",
      showItems: false,
      responseItems: [],
      selectedTitle: null,
      loading: false,
    };
  },

  props: {
    label: String,
    endpoint: String,
    typeName: {
      type: String,
      default: "fullname",
    },
  },
  methods: {
    getName(e) {},

    // rate limit for search
    debounce(func, wait, immediate) {
      var context = this,
        args = arguments;

      var callNow = immediate && !context.debounceTimeoutFunction;

      clearTimeout(context.debounceTimeoutFunction);

      context.debounceTimeoutFunction = setTimeout(function() {
        context.debounceTimeoutFunction = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (callNow) func.apply(context, args);
    },
    searchOnTable() {
      this.rateLimitForSearch();
      this.loading = true;
    },
    rateLimitForSearch() {
      this.debounce(this.searchItem, 500);
    },

    searchItem() {
      this.isLoading = true;

      const response = this.$ApiServiceLayer
        .get(`${this.endpoint}=${this.search}`)
        .then((response) => {
          if (response.responseCode === 200) {
            this.showItems = true;
            this.loading = false;
            this.responseItems = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getSelectedItem(item) {
      this.showItems = false;
      this.selectedTitle = item.fullname;
      this.$emit("selectedItem", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.items-found {
  height: auto;
  width: 100%;
  background-color: #262c49;
}
.form-group {
  margin-bottom: 0;
}

.item {
  padding: 10px;
  border-bottom: 1px solid #10163a;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  p {
    margin: 0;
  }

  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
}

.input-container {
  position: relative;
}
.loading {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
