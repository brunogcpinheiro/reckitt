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

  actions: {
    async fetchSOS(context) {
      await firebaseStore
        .collection("sos")
        .get()
        .then(querySnapshot => {
          const sos = querySnapshot.docs.map(doc => doc.data());
          console.log(sos);
          context.commit("fetchSOS", sos);
        });
    }
  }
};
