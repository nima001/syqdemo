const overview = {
  state: {
    params: {},
    type: '注册',
    defultKeys: '1'
  },
  mutations: {
    SET_PARAMS(state, payload) {
      state.params = payload;
    },
    SET_TYPE(state, payload) {
      state.type = payload;
    },
    SET_KEYS(state, payload) {
      state.defultKeys = payload;
    }
  },
  getters: {
    params: (state) => {
      return state.params;
    },
    type: (state) => {
      return state.type;
    },
    defultKeys: (state) => {
      return state.defultKeys;
    }
  }
}

export default overview;