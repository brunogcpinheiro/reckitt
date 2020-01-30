import { firebaseStore } from "@/firebase/init";

export default {
  state: {
    items: []
  },

  mutations: {
    fetchSOS(state, sos) {
      state.items = sos;
    }
  },

  getters: {
    allSOS(state) {
      return state.items;
    }
  },

  actions: {
    async fetchSOS(context) {
      await firebaseStore
        .collection("sos")
        .get()
        .then(querySnapshot => {
          const sos = querySnapshot.docs.map(doc => doc.data());
          context.commit("fetch", sos);
        });
    }
  }
};
