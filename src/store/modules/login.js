export const login = {
  namespaced: true,
  state: {
    loginTempToken: "",
    loginTempData: null,
  },
  mutations: {
    synsLoginTempToken(state, payload) {
      state.loginTempToken = payload;
    },
    loginData(state, payload) {
      state.loginTempData = payload;
    },
    clearToken(state, payload) {
      state.loginTempToken = undefined;
    },
  },
};
