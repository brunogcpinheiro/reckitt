export default {
  state: {
    items: {}
  },

  mutations: {
    saveStoreData(state, payload) {
      state.items = payload;
    }
  },

  actions: {
    saveStoreData({ commit }, payload) {
      commit("saveStoreData", payload);
    }
  }
};
