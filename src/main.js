import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { routes } from "./router";
import vueRouter from "vue-router";
import GlobalComponents from "./utils/globalComponents";
import ApiServiceLayer from "@/api/apiServiceLayer";
import GlobalMethods from "./utils/globalMethods";
import store from "./store";
import "./utils/globalLibraries";
import "../assets/vendors/css/vendors-rtl.min.css";
import "../assets/css-rtl/bootstrap.css";
import "../assets/css-rtl/bootstrap-extended.css";
import "../assets/css-rtl/colors.css";
import "../assets/css-rtl/components.css";
import "../assets/css-rtl/themes/dark-layout.css";
import "../assets/css-rtl/themes/semi-dark-layout.css";
import "../assets/css-rtl/core/menu/menu-types/vertical-menu.css";
import "../assets/css-rtl/core/colors/palette-gradient.css";
import "../assets/css-rtl/custom-rtl.css";
import "./assets/css-rtl/app.css";
import {
  PATH
} from "@/utils/applicationPath";

import Store from "./store/index";
import test from "./utils/testGlobal";

Vue.use(GlobalComponents);
Vue.use(vueRouter);

Vue.prototype.$ApiServiceLayer = new ApiServiceLayer();
Vue.prototype.$Store = Store;
Vue.prototype.$PATH = PATH;
Vue.prototype.$GlobalMethods = GlobalMethods;


Vue.config.productionTip = false;

export const router = new vueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  let token = store.state.login.loginTempToken;
  if (token) {
    if (to.path === "/login") {
      next("/dashboard");
    }
    next();
  } else {
    if (to.path !== "/login") {
      next("/login");
    }
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
