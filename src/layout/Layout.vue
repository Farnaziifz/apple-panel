<template>
  <div class="wrapper">
    <Sidebar></Sidebar>
    <div class="main-panel">
      <TopNavbar></TopNavbar>
      <div class="col-md-12">
        <Content></Content>
        <div class="sidenav-overlay"></div>
        <div class="drag-target"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from "../layout/Content";
import Sidebar from "../layout/Sidebar";
import TopNavbar from "../layout/TopNavbar";
export default {
  components: {
    Content,
    Sidebar,
    TopNavbar,
  },
};
</script>

<style>
</style>