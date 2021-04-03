<template>
  <!-- Sidebar Dropdown component, customized dropdown for use in sidebar -->
  <li class="nav-item">
    <a class="nav-link" @click="show" data-toggle="collapse">
      <i class="feather" :class="iconName"></i>
      <p class="title">
        {{ title }}
        <i
          class="feather icon-chevron-down"
          v-bind:class="{ rotate: isActive }"
        ></i>
      </p>
    </a>
    <div class="collapse animation" v-bind:class="{ show: isActive }">
      <ul class="nav">
        <slot name="navItems"></slot>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  // get title for dropdown with title prop and icon name with iconName prop
  props: ["title", "iconName"],
  data: function() {
    return {
      isActive: false,
    };
  },
  methods: {
    // toggle isActive variable between true or false
    show() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.nav-item {
  margin-bottom: 10px;
}
.title {
  font-size: 13px;
}
.animation {
  animation: fadeIn 2s;
}

.sidebar .nav .icon {
  position: absolute;
  right: unset;
  left: -30px;
  font-size: 14px;
}

.rotate {
  transform: rotate(180deg);
}

a {
  &:hover {
    cursor: pointer;
  }
}

.icon-chevron-down {
  font-size: 14px !important;
}
</style>
