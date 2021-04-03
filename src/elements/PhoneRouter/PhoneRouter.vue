<template>
  <router-link :to="customUrl + '/' + phone" tag="span" class="phone-container">
    {{ phone }}
  </router-link>
</template>

<script>
export default {
  name: "PhoneRouter",
  props: {
    customUrl: {
      default: "/customerDetail"
    },
    phone: {
      type: String
    }
  }
};
</script>

<style scoped>
  .phone-container{
    cursor: pointer;
  }
</style>
