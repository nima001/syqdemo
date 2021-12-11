const home = {
  state: {
    isFristLogin: false
  },
  mutations: {
    set_isFristLogin(state, payload) {
      state.isFristLogin = payload;
    }
  },
  getters: {
    isFristLogin: (state) => {
      return state.isFristLogin;
    }
  }
}

export default home;