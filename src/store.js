import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialData: {}
  },
  mutations: {
    saveInitialData(state, payload) {
      state.initialData = payload;
    }
  },
  actions: {
    saveInitialData({ commit }, payload) {
      commit("saveInitialData", payload);
    }
  }
});
