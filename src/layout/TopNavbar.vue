<template>
  <div>
    <nav
      class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-dark navbar-shadow"
    >
      <div class="navbar-wrapper">
        <div class="navbar-container content">
          <div class="navbar-collapse" id="navbar-mobile">
            <div
              class="mr-auto float-left bookmark-wrapper d-flex align-items-center"
            >
              <ul class="nav navbar-nav">
                <li
                  class="nav-item mobile-menu d-xl-none mr-auto"
                  @click="sidebarOpenByHamburgerMenu()"
                >
                  <a
                    class="nav-link nav-menu-main menu-toggle hidden-xs"
                    href="#"
                  >
                    <i class="ficon feather icon-menu"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <div class="user-nav d-sm-flex d-none title-page">
                    <span class="user-name text-bold-600 fasele">
                      {{ $route.meta.title }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <p class="mr-2 exit" @click="logOut">خروج از پنل</p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: null,
      photo: "",
      showMenu: false,
    };
  },

  methods: {
    sidebarOpenByHamburgerMenu() {
      document.body.classList.remove("menu-hide");
      document.body.classList.add("menu-open");
    },

    logOut() {
      window.localStorage.removeItem("almas-admin-store");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.profile-container {
  position: relative;
  cursor: pointer;

  &:hover {
    .profile-menu {
      opacity: 1;
      visibility: visible;
    }
  }
}
.profile-menu {
  min-width: 100px;
  padding: 15px;
  background-color: #7367f0;
  position: absolute;
  left: 0;
  top: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
}
.show-menu {
  top: 100%;
  opacity: 1;
  visibility: visible;
}
.item-container {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  a {
    padding: 0 !important;
  }

  .user-name {
    font-size: 0.85rem;
    cursor: pointer;
  }
}
.fasele {
  margin-left: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-page {
  height: 100%;
  display: flex;
  align-items: center;
}
.exit {
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
