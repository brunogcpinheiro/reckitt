import { firebaseStore } from "@/firebase/init";

export default {
  state: {
    items: []
  },

  mutations: {
    fetchKDB(state, kdb) {
      state.items = kdb;
    }
  },

  actions: {
    async fetchKDB(context) {
      await firebaseStore
        .collection("kdb")
        .get()
        .then(querySnapshot => {
          const kdb = querySnapshot.docs.map(doc => doc.data());
          context.commit("fetchKDB", kdb);
        });
    }
  }
};
