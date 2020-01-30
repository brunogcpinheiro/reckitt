import { firebaseStore } from "@/firebase/init";

export default actions = {
  async fetchSOS(context) {
    await firebaseStore
      .collection("sos")
      .get()
      .then(querySnapshot => {
        const sos = querySnapshot.docs.map(doc => doc.data());
        context.commit("fetch", sos);
      });
  },

  saveInitialData({ commit }, payload) {
    commit("saveInitialData", payload);
  },

  saveStoreData({ commit }, payload) {
    commit("saveStoreData", payload);
  }
};
