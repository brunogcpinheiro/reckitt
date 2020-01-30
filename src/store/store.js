import Vue from "vue";
import Vuex from "vuex";

import initialData from "./modules/initialData";
import storeData from "./modules/storeData";
import sos from "./modules/sos";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    initialData,
    storeData,
    sos
  }
});
