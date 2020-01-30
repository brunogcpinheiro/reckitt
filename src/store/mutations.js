export default mutations = {
  fetchSOS(state, sos) {
    state.sos = sos;
  },
  saveInitialData(state, payload) {
    state.initialData = payload;
  },
  saveStoreData(state, payload) {
    state.storeData = payload;
  }
};
