-<template>
  <!-- BEGIN: Main Menu-->
  <div
    class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
    data-scroll-to-active="true"
  >
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <a class="navbar-brand" href="">
            <h2 class="brand-text mb-0">پنل مدیریتی</h2>
          </a>
        </li>
        <li @click="sidebarCollapsed()" class="nav-item nav-toggle">
          <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
            <i
              @click="closeSidebar"
              class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"
            ></i>
            <i
              class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary"
              data-ticon="icon-disc"
            ></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
      <ul
        class="navigation navigation-main"
        id="main-menu-navigation"
        data-menu="menu-navigation"
      >
        <li class="nav-item">
          <router-link to="/intro">
            <i class="feather icon-home"></i>
            <span class="menu-title" data-i18n="Dashboard">داشبرد</span>
          </router-link>
        </li>
        <fav-sidebar-dropdown
          class="side-dropdown"
          title="مدیریت سایت"
          iconName="feather icon-grid"
        >
          <template slot="navItems">
            <div>
              <li class="nav-item">
                <router-link to="/sliders" class="nav-link">
                  <i class="feather"></i>
                  <p>مدیریت اسلایدر</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/siteSetting" class="nav-link">
                  <i class="feather"></i>
                  <p>تنظیمات سایت</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contact" class="nav-link">
                  <i class="feather"></i>
                  <p>فرم تماس با ما</p>
                </router-link>
              </li>
            </div>
          </template>
        </fav-sidebar-dropdown>

        <fav-sidebar-dropdown
          class="side-dropdown"
          title="مدیریت محصولات"
          iconName="feather icon-archive"
        >
          <template slot="navItems">
            <div>
              <li class="nav-item">
                <router-link to="/productGroupCategory" class="nav-link">
                  <i class="feather"></i>
                  <p>مدیریت دسته بندی‌ها</p>
                </router-link>
              </li>
            </div>

            <div>
              <li class="nav-item">
                <router-link to="/productList" class="nav-link">
                  <i class="feather"></i>
                  <p>مدیریت محصولات</p>
                </router-link>
              </li>
            </div>
          </template>
        </fav-sidebar-dropdown>

        <fav-sidebar-dropdown
          class="side-dropdown"
          title="مدیریت مقالات"
          iconName="feather icon-file-text"
        >
          <template slot="navItems">
            <div>
              <li class="nav-item">
                <router-link to="/tagList" class="nav-link">
                  <i class="feather "></i>
                  <p>مدیریت تگ‌های بلاگ</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/blogList" class="nav-link">
                  <i class="feather icon-order"></i>
                  <p>مدیریت مقالات</p>
                </router-link>
              </li>
            </div>
          </template>
        </fav-sidebar-dropdown>
        <!-- <fav-sidebar-dropdown
          class="side-dropdown"
          title="مدیریت نظرات"
          iconName="feather icon-message-circle"
        >
          <template slot="navItems">
            <div>
              <li class="nav-item">
                <router-link to="/comments" class="nav-link">
                  <i class="feather"></i>
                  <p>لیست نظرات</p>
                </router-link>
              </li>
            </div>
          </template>
        </fav-sidebar-dropdown> -->
      </ul>
    </div>
  </div>
  <!-- END: Main Menu-->
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "gac",
          value: "df"
        },
        {
          text: "gace",
          value: "def"
        }
      ]
    };
  },
  mounted() {
    window.addEventListener(
      "resize",
      function() {
        let screenSize = window.matchMedia("(max-width: 1200px)");
        this.checkScreenMDSize(screenSize.matches);
      }.bind(this),
      false
    );

    if (document.body.clientWidth < "1200") {
      this.checkScreenMDSize(true);
    }

    let body = document.body;
    let sidebar = document.getElementsByClassName("main-menu")[0];
    let navbar_header = document.getElementsByClassName("navbar-header")[0];
    sidebar.addEventListener(
      "mouseenter",
      function(event) {
        sidebar.classList.add("expanded");
        navbar_header.classList.add("expanded");
      },
      false
    );

    sidebar.addEventListener(
      "mouseleave",
      function(event) {
        if (!document.body.classList.contains("menu-expanded")) {
          sidebar.classList.remove("expanded");
          navbar_header.classList.remove("expanded");
        }
      },
      false
    );
  },
  methods: {
    sidebarCollapsed() {
      let sidebar = document.getElementsByClassName("main-menu")[0];
      // normal
      if (document.body.classList.contains("menu-expanded")) {
        document.body.classList.remove("menu-expanded");
        document.body.classList.add("menu-collapsed");
      } else {
        // collapsed
        document.body.classList.remove("menu-collapsed");
        document.body.classList.add("menu-expanded");
      }
    },
    closeSidebar() {
      document.body.classList.add("menu-hide");
      document.body.classList.remove("menu-open");
    },
    checkScreenMDSize(sizeStatus) {
      if (sizeStatus) {
        document.body.classList.add("vertical-overlay-menu");
        document.body.classList.add("menu-hide");
        document.body.classList.remove("vertical-menu-modern");
        document.body.classList.remove("menu-expanded");
      } else {
        document.body.classList.remove("vertical-overlay-menu");
        document.body.classList.remove("menu-hide");
        document.body.classList.add("vertical-menu-modern");
        document.body.classList.add("menu-expanded");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-menu .main-menu-content #main-menu-navigation .nav-item:hover {
  padding-right: 5px;
  transition: padding 0.35s ease 0s !important;
}

.side-dropdown p {
  font-size: 12px !important;
}
.side-dropdown i {
  font-size: 24px !important;
  line-height: 24px !important;
}
.nav-link {
  display: flex;
  align-items: center;

  i {
    font-size: 1rem !important;
  }
  p {
    font-size: 12px !important;
    margin-bottom: 0;
  }
}
.small-icon {
  font-size: 16px !important;
}

.router-link-exact-active {
  p {
    color: #7367f0 !important;
  }
  i {
    color: #7367f0 !important;
  }
  span {
    color: #7367f0 !important;
  }
}
</style>
