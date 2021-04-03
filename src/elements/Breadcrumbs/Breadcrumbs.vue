<template>
  <div class="breadcrumb">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="breadcrumb-item"
      :class="{active : item.isActive}"
    >
      <router-link v-if="!item.isActive" :to="item.link" tag="a">{{item.title}}</router-link>
      <span v-else>{{item.title}}</span>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [
          { id: 1, title: "Home", isActive: false, link: "/" },
          { id: 2, title: "Dashboard", isActive: false, link: "/dashboard" },
          { id: 3, title: "Breadcrumbs", isActive: true, link: "/" }
        ];
      }
    }
  }
};
</script>

<style>
</style>