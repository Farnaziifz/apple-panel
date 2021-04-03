import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { login } from "./modules/login";
import { appConfig } from "./modules/appConfig";
const PATH = require("@/utils/applicationPath.js");

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "almas-admin-store",
  storage: window.localStorage,
  reducer: (state) => ({
    login: state.login,
    appConfig: state.appConfig,
  }),
});
export default new Vuex.Store({
  modules: {
    login,
    appConfig,
  },
  plugins: [vuexLocal.plugin],
});
