<template>
  <div id="app">
    <router-view />
    <customizer></customizer>
    <notify-container></notify-container>
  </div>
</template>

<script>
import NotifyContainer from "@/elements/Notify/NotifyContainer";
export default {
  components: {
    NotifyContainer,
  },
};
</script>
<style lang="scss">
#app {
  font-family: IRANSans !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  font-family: IRANSans !important;
}
</style>
