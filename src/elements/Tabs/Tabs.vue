<template>
  <div :class="{'nav-vertical' : verticalNav}">
    <ul
      class="nav nav-tabs"
      :class="[{'nav-left flex-column' : verticalNav, 'nav-right' :verticalRightNav, 'nav-fill': filled} , `justify-content-${navPosition}`]"
    >
      <li class="nav-item" v-for="item in tabItems" :key="item.id">
        <a
          class="nav-link"
          :class="{active : item.id === activeTab.id, disabled : item.disabled}"
          @click="setActiveTab(item)"
        >{{ item.title }}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane"
        v-for="item in tabItems"
        :key="item.id"
        :class="{active : item.id === activeTab.id}"
      >
        <slot :name="item.id"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabItems: {
      type: Array,
      required: true
    },
    defaultTabIndex: {
      type: Number,
      default: 0
    },
    verticalNav: {
      type: Boolean
    },
    verticalRightNav: {
      type: Boolean
    },
    filled: {
      type: Boolean
    },
    navPosition: {
      type: String,
      default: "start" // center || start || end
    }
  },
  data() {
    return {
      activeTab: {}
    };
  },
  mounted() {
    this.activeTab = this.tabItems[this.defaultTabIndex];
  },
  methods: {
    setActiveTab(item) {
      if (!item.disabled) {
        this.activeTab = item;
      }
    }
  }
};
</script>

<style>
</style>