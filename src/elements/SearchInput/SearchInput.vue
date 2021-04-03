<template>
  <!-- search textbox component -->
  <div class="search-textbox-container">
    <div
      class="input-group mb-1"
      :class="{ 'set-min-width': dropDown, 'set-min-width-range': range }"
    >
      <div class="input-group-prepend" v-if="dropDown">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          @click="() => (this.isDropDownOpen = !this.isDropDownOpen)"
        >{{ dropDownValue.label }}</button>
        <div class="dropdown-menu" v-show="isDropDownOpen">
          <a
            class="dropdown-item"
            href="#"
            v-for="item in dropDown"
            :key="item.value"
            @click="selectedItem(item.value, item.label, item.default)"
          >{{ item.label }}</a>
        </div>
      </div>
      <!-- <input
        type="text"
        :value="value"
        @input="debounceSearch"
        :id="inputId"
        @blur="onInputBlur"
        :placeholder="label"
      />-->
      <bmn-input @blur="onInputBlur" @input="debounceSearch" :value="value" :placeholder="label"></bmn-input>
      <div v-if="closeButton" class="close-button" @click="clearInput">⨯</div>
    </div>
  </div>
</template>

<script>
export default {
  // get textbox value with value prop, search delay for input with searchDelay prop
  props: {
    value: {},
    searchDelay: String,
    dropDown: Array,
    inputId: String,
    range: {
      type: Boolean,
      default: false
    },
    columnName: {
      type: String
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      delay: 0,
      dropDownValue: [],
      isDropDownOpen: false,
      restrictedClasses: ["dropdown-toggle", "dropdown-item"],
      showClearButton: false
    };
  },
  // call generateSearchDelay on created hook
  created() {
    this.generateSearchDelay();
    this.defaultOption();
    document.addEventListener("click", this.documentClick, true);
  },
  mounted() {
    this.defaultOption();
  },
  methods: {
    // clearTimeout debounce and set new Timeout, emit input event
    debounceSearch(value) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("input", value);
        this.$emit("onTextChanged", {
          value: value,
          columnName: this.columnName
        });
      }, this.delay);
    },
    clearInput() {
      this.$emit("input", "");
    },
    onInputBlur(e) {
      alert("called");
      console.log(e);
      this.$emit("onTextBlur", {
        value: e.target.value,
        columnName: this.columnName
      });
    },
    // generate search delay
    generateSearchDelay() {
      switch (this.searchDelay) {
        case "slow": {
          this.delay = 3000;
          return;
        }
        case "normal": {
          this.delay = 2000;
          return;
        }
        case "fast": {
          this.delay = 1000;
          return;
        }
        default: {
          this.delay = 1000;
        }
      }
    },
    // get array of drop down search and emit to parent what option selected
    selectedItem(value, label, defaultOption) {
      let item = { value: value, label: label, defaultOption: defaultOption };
      this.$emit("click-item", item);
      this.dropDownValue = item;
      this.isDropDownOpen = !this.isDropDownOpen;
    },
    defaultOption() {
      // in case of we have the dropdown
      if (typeof this.dropDown === "object") {
        this.dropDownValue = this.dropDown.find(p => p.default === true);
        this.$emit("click-item", this.dropDownValue);
      }
    },
    documentClick(e) {
      let target = e.target;
      let restricted = this.restrictedClasses.some(item =>
        target.classList.contains(item)
      );
      if (!restricted) {
        this.isDropDownOpen = false;
      }
    }
  },
  watch: {
    dropDown: function() {
      this.dropDownValue = this.dropDown.find(p => p.default === true);
      this.$emit("click-item", this.dropDownValue);
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.documentClick, true);
  }
};
</script>

<style lang="scss" scoped>
.input-group {
  min-width: 85px;
  position: relative;

  &:hover {
    .close-button {
      left: 6px;
      opacity: 0.8;
    }
  }
}

.close-button {
  transition: 0.2s;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: -3px;
  background-color: #1c1c1c;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  line-height: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  opacity: 0;
  cursor: pointer;
  z-index: 11;

  &:hover {
    opacity: 1;
  }
}

.set-min-width {
  min-width: 120px;
}
.set-min-width-range {
  min-width: 180px;
}

.dropdown-menu {
  transition: 0s !important;
  transform: translate3d(0, 35px, 0px) !important;
  opacity: 1;
  z-index: 10000000;
  display: block;
  top: 0;
}
.btn {
  min-width: 70px;
}
input {
  border: 1px solid #d3d3d3;
  border-radius: 6px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 14px;
  color: #676767;
  background-color: transparent;
  z-index: 10;
  position: relative;
  text-indent: 10px;
  line-height: 35px;
  width: 100%;
  font-family: "IRANSansMobileFaNum";
}

input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  border-color: #80bdff;
  outline: 0 none;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-size: 10px;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 10px;
}
.btn {
  margin: initial;
  padding: 0 2px;
  box-shadow: none;
}
.btn.btn-outline-secondary {
  border: 1px solid #d3d3d3;
  &:hover,
  &:focus {
    border: initial;
    box-shadow: none;
  }
}
</style>
