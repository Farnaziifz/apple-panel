<template>
  <!-- BEGIN: Customizer-->
  <div class="customizer d-none d-md-block">
    <a @click="customizerToggle" class="customizer-close" href="#">
      <i class="feather icon-x"></i>
    </a>
    <a @click="customizerToggle" class="customizer-toggle" href="#">
      <i class="feather icon-settings fa fa-spin fa-fw white"></i>
    </a>
    <div class="customizer-content p-2">
      <h4 class="text-uppercase mb-0">خصوصی سازی پنل</h4>
      <small>رنگ ها را میتوانید مشخص کنید</small>
      <hr />
      <!-- Menu Colors Starts -->
      <div id="customizer-theme-colors">
        <h5>تغییر رنگ منوها</h5>
        <ul class="list-inline unstyled-list">
          <li
            @click="setMenuThemeConfig('dark-blue')"
            class="color-box bg-dark-blue"
            :class="[
              activedCustomizer.menuTheme == 'dark-blue' ? 'selected' : '',
            ]"
            data-color="theme-primary"
          ></li>

          <li
            @click="setMenuThemeConfig('primary')"
            class="color-box bg-primary"
            :class="[
              activedCustomizer.menuTheme == 'primary' ? 'selected' : '',
            ]"
            data-color="theme-primary"
          ></li>
          <li
            @click="setMenuThemeConfig('success')"
            class="color-box bg-success"
            :class="[
              activedCustomizer.menuTheme == 'success' ? 'selected' : '',
            ]"
            data-color="theme-success"
          ></li>
          <li
            @click="setMenuThemeConfig('danger')"
            class="color-box bg-danger"
            :class="[activedCustomizer.menuTheme == 'danger' ? 'selected' : '']"
            data-color="theme-danger"
          ></li>
          <li
            @click="setMenuThemeConfig('info')"
            class="color-box bg-info"
            :class="[activedCustomizer.menuTheme == 'info' ? 'selected' : '']"
            data-color="theme-info"
          ></li>
          <li
            @click="setMenuThemeConfig('warning')"
            class="color-box bg-warning"
            :class="[
              activedCustomizer.menuTheme == 'warning' ? 'selected' : '',
            ]"
            data-color="theme-warning"
          ></li>
          <li
            @click="setMenuThemeConfig('dark')"
            class="color-box bg-dark"
            :class="[activedCustomizer.menuTheme == 'dark' ? 'selected' : '']"
            data-color="theme-dark"
          ></li>
        </ul>
      </div>
      <!-- Menu Colors Ends -->
      <hr />
      <!-- Theme options starts -->
      <h5 class="mt-1">تغییر رنگ تم پنل</h5>
      <div class="theme-layouts">
        <div class="d-flex justify-content-start">
          <div class="mx-50 lidht">
            <fieldset>
              <div
                class="vs-radio-con vs-radio-primary"
                @click="setLayoutThemeConfig('light-layout')"
              >
                <input
                  type="radio"
                  name="layoutOptions"
                  value="false"
                  class="layout-name"
                  data-layout
                  :checked="activedCustomizer.layoutTheme == 'light-layout'"
                />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>روشن</span>
              </div>
            </fieldset>
          </div>
          <div class="mx-50 dark">
            <fieldset>
              <div
                class="vs-radio-con vs-radio-primary"
                @click="setLayoutThemeConfig('dark-layout')"
              >
                <input
                  type="radio"
                  name="layoutOptions"
                  value="false"
                  class="layout-name"
                  data-layout="dark-layout"
                  :checked="activedCustomizer.layoutTheme == 'dark-layout'"
                />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>تاریک</span>
              </div>
            </fieldset>
          </div>
          <div class="mx-50 semi-dark">
            <fieldset>
              <div
                class="vs-radio-con vs-radio-primary"
                @click="setLayoutThemeConfig('semi-dark-layout')"
              >
                <input
                  type="radio"
                  name="layoutOptions"
                  value="false"
                  class="layout-name"
                  data-layout="semi-dark-layout"
                  :checked="activedCustomizer.layoutTheme == 'semi-dark-layout'"
                />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>نیمه تاریک</span>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <!-- Theme options starts -->
      <hr />

      <!-- Collapse sidebar switch starts -->
      <!-- <div class="collapse-sidebar d-flex justify-content-between">
        <div class="collapse-option-title">
          <h5 class="pt-25 collapse_sidebar">Collapse Sidebar</h5>
          <h5 class="pt-25 collapse_menu d-none">Collapse Menu</h5>
        </div>
        <div class="collapse-option-switch">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="collapse-sidebar-switch" />
            <label class="custom-control-label" for="collapse-sidebar-switch"></label>
          </div>
        </div>
      </div>-->
      <!-- Collapse sidebar switch Ends -->
      <!-- <hr /> -->

      <!-- Navbar colors starts -->
      <div id="customizer-navbar-colors">
        <h5>تغییر رنگ منو بالای صفحه</h5>
        <ul class="list-inline unstyled-list">
          <li
            @click="setNavbarThemeConfig('bg-dark-blue')"
            :class="[
              activedCustomizer.navbarTheme == 'bg-dark-blue' ? 'selected' : '',
            ]"
            class="color-box bg-dark-blue"
            data-navbar-default
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-primary')"
            class="color-box bg-primary"
            :class="[
              activedCustomizer.navbarTheme == 'bg-primary' ? 'selected' : '',
            ]"
            data-navbar-color="bg-primary"
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-success')"
            class="color-box bg-success"
            :class="[
              activedCustomizer.navbarTheme == 'bg-success' ? 'selected' : '',
            ]"
            data-navbar-color="bg-success"
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-danger')"
            class="color-box bg-danger"
            :class="[
              activedCustomizer.navbarTheme == 'bg-danger' ? 'selected' : '',
            ]"
            data-navbar-color="bg-danger"
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-info')"
            class="color-box bg-info"
            :class="[
              activedCustomizer.navbarTheme == 'bg-info' ? 'selected' : '',
            ]"
            data-navbar-color="bg-info"
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-warning')"
            class="color-box bg-warning"
            :class="[
              activedCustomizer.navbarTheme == 'bg-warning' ? 'selected' : '',
            ]"
            data-navbar-color="bg-warning"
          ></li>
          <li
            @click="setNavbarThemeConfig('bg-dark')"
            class="color-box bg-dark"
            :class="[
              activedCustomizer.navbarTheme == 'bg-dark' ? 'selected' : '',
            ]"
            data-navbar-color="bg-dark"
          ></li>
        </ul>
        <hr />
      </div>
      <!-- Navbar colors starts -->
      <!-- Navbar Type Starts -->
      <!-- <div id="navbar-type">
        <h5 class="navbar_type">Navbar Type</h5>
        <h5 class="menu_type d-none">Menu Type</h5>
        <div class="navbar-type d-flex justify-content-start">
          <div class="mx-50">
            <fieldset>
              <div class="vs-radio-con vs-radio-primary">
                <input type="radio" name="navbarType" value="false" id="navbar-hidden" />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>Hidden</span>
              </div>
            </fieldset>
          </div>
          <div class="mx-50">
            <fieldset>
              <div class="vs-radio-con vs-radio-primary">
                <input type="radio" name="navbarType" value="false" id="navbar-static" />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>Static</span>
              </div>
            </fieldset>
          </div>
          <div class="mx-50">
            <fieldset>
              <div class="vs-radio-con vs-radio-primary">
                <input type="radio" name="navbarType" value="false" id="navbar-sticky" />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>Sticky</span>
              </div>
            </fieldset>
          </div>
          <div class="mx-50">
            <fieldset>
              <div class="vs-radio-con vs-radio-primary">
                <input type="radio" name="navbarType" value="false" id="navbar-floating" checked />
                <span class="vs-radio">
                  <span class="vs-radio--border"></span>
                  <span class="vs-radio--circle"></span>
                </span>
                <span class>Floating</span>
              </div>
            </fieldset>
          </div>
        </div>
        <hr />
      </div>-->
      <!-- Navbar Type Starts -->
    </div>
  </div>
  <!-- End: Customizer-->
</template>

<script>
export default {
  data() {
    return {
      activedCustomizer: {
        layoutTheme: "",
        menuTheme: "",
        navbarTheme: "",
      },
    };
  },
  mounted() {
    this.activedCustomizer.layoutTheme = this.$Store.state.appConfig.layoutTheme;
    this.activedCustomizer.menuTheme = this.$Store.state.appConfig.menuTheme;
    this.activedCustomizer.navbarTheme = this.$Store.state.appConfig.navbarTheme;
    this.xxx = this.activedCustomizer.menuTheme;
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.setNavbarThemeConfig(this.activedCustomizer.navbarTheme);
        this.setMenuThemeConfig(this.activedCustomizer.menuTheme);
        this.setLayoutThemeConfig(this.activedCustomizer.layoutTheme);
      }
    };
  },
  methods: {
    addCssClassToElement(elementClassName, setClassName, action) {
      let htmlElement = document.getElementsByClassName(elementClassName)[0];
      htmlElement.classList.add(setClassName);
    },
    removeCssClassOfElement(elementClassName, setClassName) {
      let htmlElement = document.getElementsByClassName(elementClassName)[0];
      htmlElement.classList.remove(setClassName);
    },
    customizerToggle() {
      let customizer = document.getElementsByClassName("customizer")[0]
        .classList;
      if (customizer.contains("open")) {
        customizer.remove("open");
      } else {
        customizer.add("open");
      }
    },
    setLayoutThemeConfig(key) {
      this.setConfigToStorage("appConfig/setLayoutTheme", key);
      this.removeCssClassOfElement("body", "dark-layout");
      this.removeCssClassOfElement("body", "semi-dark-layout");
      this.removeCssClassOfElement("body", "light-layout");
      this.addCssClassToElement("body", key);
    },
    setNavbarThemeConfig(bg) {
      let navbar = document.getElementsByClassName("header-navbar")[0]
        .classList;
      for (let i = 0; i < navbar.length; i++) {
        if (navbar[i].startsWith("bg-")) {
          this.removeCssClassOfElement("header-navbar", navbar[i]);
        }
      }
      this.addCssClassToElement("header-navbar", bg);
      this.setConfigToStorage("appConfig/setNavbarTheme", bg);
      this.changeItemActive("#customizer-navbar-colors .list-inline li", bg);
    },
    setMenuThemeConfig(bg) {
      let selectedMenuTheme = "";
      let menuTheme = [
        {
          menuBackground: "primary",
          background: " rgb(115, 103, 240), rgba(115, 103, 240, 0.7)",
          boxShadow: "rgba(115, 103, 240, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "success",
          background: "rgb(40, 199, 111), rgba(40, 199, 111, 0.7)",
          boxShadow: "rgba(40, 199, 111, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "danger",
          background: "rgb(234, 84, 85), rgba(234, 84, 85, 0.7)",
          boxShadow: "rgba(234, 84, 85, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "info",
          background: " rgb(0, 207, 232), rgba(0, 207, 232, 0.7)",
          boxShadow: "rgba(0, 207, 232, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "warning",
          background: "rgb(255, 159, 67), rgba(255, 159, 67, 0.7)",
          boxShadow: "rgba(255, 159, 67, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "dark",
          background: "rgb(30, 30, 30), rgba(30, 30, 30, 0.7)",
          boxShadow: "rgba(30, 30, 30, 0.7) 0px 0px 10px 1px",
        },
        {
          menuBackground: "dark-blue",
          background: "rgb(16,22,58), rgba(16,22,58, 0.7)",
          boxShadow: "rgba(16,22,58, 0.7) 0px 0px 10px 1px",
        },
      ];

      for (let i = 0; i < menuTheme.length; i++) {
        if (menuTheme[i].menuBackground == bg) {
          selectedMenuTheme = menuTheme[i];
        }
      }

      let menu = document.querySelectorAll(
        ".main-menu.menu-light .navigation  li.active > a"
      )[0];
      let sidebarTitle = document.querySelectorAll(
        ".main-menu .navbar-header .navbar-brand .brand-text"
      )[0];
      let sidebarToggleIcon = document.querySelectorAll(
        ".nav-toggle .modern-nav-toggle .collapse-toggle-icon"
      )[0];
      let sidebarCloseIcon = document.querySelectorAll(
        ".nav-toggle .modern-nav-toggle .toggle-icon"
      )[0];

      let textColor = [
        "primary",
        "danger",
        "success",
        "info",
        "warning",
        "dark",
        "dark-blue",
      ];
      for (let i = 0; i < textColor.length; i++) {
        sidebarTitle.classList.remove(textColor[i]);
        sidebarToggleIcon.classList.remove(textColor[i]);
        sidebarCloseIcon.classList.remove(textColor[i]);
      }
      sidebarTitle.classList.add(bg);
      sidebarToggleIcon.classList.add(bg);
      sidebarCloseIcon.classList.add(bg);
      menu.style["boxShadow"] = selectedMenuTheme.boxShadow;
      menu.style.background =
        "linear-gradient(-118deg, " + selectedMenuTheme.background + ")";
      this.setConfigToStorage("appConfig/setMenuTheme", bg);
      this.changeItemActive(
        "#customizer-theme-colors .list-inline li",
        "bg-" + bg
      );
    },
    setConfigToStorage(location, value) {
      this.$Store.commit(location, value);
    },
    changeItemActive(elementCssClass, newCssClass) {
      let item = document.querySelectorAll(elementCssClass);
      for (let i = 0; i < item.length; i++) {
        if (item[i].classList.contains("selected")) {
          item[i].classList.remove("selected");
        }
        if (item[i].classList.contains(newCssClass)) {
          item[i].classList.add("selected");
        }
      }
    },
  },
};
</script>

<style></style>
