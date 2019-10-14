import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialData: {},
    storeData: {}
  },
  mutations: {
    saveInitialData(state, payload) {
      state.initialData = payload;
    },
    saveStoreData(state, payload) {
      state.storeData = payload;
    }
  },
  actions: {
    saveInitialData({ commit }, payload) {
      commit("saveInitialData", payload);
    },
    saveStoreData({ commit }, payload) {
      commit("saveStoreData", payload);
    }
  }
});
