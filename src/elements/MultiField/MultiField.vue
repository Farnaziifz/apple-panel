<template>
  <div class="multifield-combobox-parent">
    <div class="header-section">
      <div class="slot-container row m-0">
        <!--    put input elements in the component    -->
        <div class="inputs">
          <slot name="inputs"></slot>
        </div>
        <div class="add-button-container">
          <button
            class="add-button btn btn-success"
            @click="addEntryToList"
            :class="{ disabled: isAddButtonDisabled }"
          >+</button>
          <span v-if="listItems.length">{{ listItems.length }}</span>
        </div>
      </div>
    </div>
    <div v-if="outputType === 'chips'" class="chips-container">
      <span class="chip" v-for="(entry, entryIndex) of limitedEntries" :key="entryIndex">
        <span @click="removeFromEntriesList(entryIndex)" class="close-button">x</span>
        <!--     if we have arrays of objects( using dropdown ), print `.name`, otherwise print the string     -->
        <span v-for="(entryItems, index) in entry" :key="index">
          <!--    check if printed item is `string`, or object         -->
          <span v-if="isKeyVisible(index) && entryItems">
            {{ entryItems }}
            <span>-&nbsp;</span>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultifieldCombobox",
  props: {
    entries: {
      // entries that should be passed by inputs that we put in the `slot` in the template
      required: true,
      type: Array
    },
    // can be chips or table
    outputType: {
      type: String,
      default: "table"
    },
    limitedEntriesCount: {
      type: Number,
      default: 1
    },
    limitAddData: {
      type: Number
    },
    // when key is diffrent to `name`
    optionalKeyName: {
      type: String,
      default: "name"
    },
    listRules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isAddButtonDisabled: Boolean,
    visibleKeys: { type: Array },
    listItems: { type: Array }
  },
  data() {
    return {
      // list of added items
      // entriesList: [],
      localLimitedEntriesCount: null,
      isExpanded: this.outputType === "table" ? false : true
    };
  },
  methods: {
    isKeyVisible(key) {
      return this.visibleKeys.some(item => item === key);
    },
    // pushe new `entries` to `entriesList` array, emit `onAddItem` event and send `entriesList` array
    addEntryToList() {
      // let hasNull = this.entries.some(element => !element);
      if (this.limitAddData && this.listItems.length === this.limitAddData) {
        return;
      }
      const entryItem = {};
      this.entries.forEach((item, index) => {
        const key = this.visibleKeys[index];
        entryItem[key] = item;
      });
      this.listItems.push(entryItem);
      // let filteredEntries = this.entries.filter((i) => !!i);
      // this.listItems.push(filteredEntries);
      // this.$emit("onAddItem", this.entriesList);
      // this.handleValidationError();
    },
    // get entry index and remove from `entriesList` array
    removeFromEntriesList(entryIndex) {
      this.listItems.splice(entryIndex, 1);
      if (this.listItems.length == 0) {
        this.isExpanded = false;
        this.localLimitedEntriesCount = this.limitedEntriesCount;
      }
      // this.$emit("onAddItem", this.listItems);
      // this.handleValidationError();
    },
    // toggle `isExpanded` value between true and false
    toggleShowEntries() {
      this.isExpanded = !this.isExpanded;
    }
    // populateDefaultItems() {
    //   if (this.defaultItems.length > 0) {
    //     this.entriesList = Array.from(this.defaultItems);
    //     this.$emit("onAddItem", this.entriesList);
    //   }
    // },
    // handleValidationStatus() {
    //   // check for validation
    //   let errors = this.$GlobalMethods.validateList(
    //     this.listRules,
    //     this.entriesList.length,
    //     "این فیلد"
    //   );

    //   this.$emit("validationStatus", !errors.length);

    //   return errors;
    // },
    // handleValidationError() {
    //   this.validationErrors = this.handleValidationStatus();
    // },
  },
  computed: {
    // limit `entriesList` array
    limitedEntries: function() {
      if (this.isExpanded) {
        // set `localLimitedEntriesCount` to length of `entriesList`
        this.localLimitedEntriesCount = this.listItems.length;
      } else {
        // set to `limitedEntriesCount`
        this.localLimitedEntriesCount = this.limitedEntriesCount;
      }
      return this.listItems.slice(0, this.localLimitedEntriesCount);
    }
  },
  created() {
    // set `localLimitedEntriesCount` to `limitedEntriesCount`
    this.localLimitedEntriesCount = this.limitedEntriesCount;

    // if data binding wasn't asynchronous
    // this.populateDefaultItems();
  }
};
</script>

<style scoped lang="scss">
.multifield-combobox-parent {
  width: 100%;

  .header-section {
    display: flex;
    .inputs {
      width: calc(100% - 50px);
      display: flex;
    }
    .slot-container {
      width: 100%;
      .add-button-container {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding-bottom: 5px;
        padding-left: 0;
        position: relative;
        z-index: 10;
        padding-top: 20px;
        span {
          position: absolute;
          top: 30px;
          left: -10px;
          transform: translateY(-50%);
          background-color: red;
          border-radius: 50%;
          width: 25px;
          text-align: center;
          color: white;
          font-family: IRANSansMobileFaNum;
          padding-top: 3px;
        }
      }
    }
  }
  .add-button {
    width: 41px;
    height: 41px;
    border-radius: 50%;
    padding: 0;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.disabled {
      pointer-events: none;
    }
  }
  .data-table-container {
    width: 100%;
    margin: 0;
    .entry-container {
      line-height: 45px;
      position: relative;
      .entry-items-container {
        display: flex;
        width: calc(100% - 50px);
        div.col {
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          &::after {
            position: absolute;
            display: block;
            height: 4px;
            content: "";
            bottom: 0;
            width: 100%;
            background-color: #d1d1d1;
            border-radius: 2px;
          }
          &:first-child {
            padding-right: 0 !important;
          }
        }
      }
      .delete-button-container {
        button {
          margin-top: 10px;
          line-height: 1px;
        }
      }
    }
  }
}
.chips-container {
  display: flex;
}
.chip {
  padding: 10px 15px;
  display: flex;
  background-color: #e2e2e2;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  position: relative;
  padding-left: 35px;
  max-width: 100%;
  span.close-button {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border: 1px solid #9124a3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9124a3;
    cursor: pointer;
  }
}

.show-more {
  margin-top: 20px;
  span {
    cursor: pointer;
    color: red;
  }
}
</style>



