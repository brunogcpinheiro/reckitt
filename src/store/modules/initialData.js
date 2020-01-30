export default {
  state: {
    items: {}
  },

  mutations: {
    saveInitialData(state, payload) {
      state.items = payload;
    }
  },

  actions: {
    saveInitialData({ commit }, payload) {
      commit("saveInitialData", payload);
    }
  }
};
