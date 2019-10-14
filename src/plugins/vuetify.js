import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#db338f",
        secondary: "#f598cb",
        anchor: "#db338f",
        error: "#eb5959"
      },
      dark: {
        primary: "#db338f",
        secondary: "#f598cb",
        anchor: "#db338f",
        error: "#eb5959"
      }
    }
  }
});
