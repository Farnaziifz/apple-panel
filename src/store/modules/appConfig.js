export const appConfig = {
  namespaced: true,
  state: {
    layoutTheme: "",
    navbarTheme: "",
    menuTheme: "",
  },
  mutations: {
    setLayoutTheme(state, payload) {
      state.layoutTheme = payload;
    },
    setNavbarTheme(state, payload) {
      state.navbarTheme = payload;
    },
    setMenuTheme(state, payload) {
      state.menuTheme = payload;
    },
  },
};