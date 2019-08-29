<template>
  <div>
    <div>
      Bem vindo a Dashboard!
      <a @click="logout">Deslogar</a>
    </div>
    <loading
      :active="isLoading"
      :is-full-page="fullPage"
      color="#db338f"
      loader="dots"
    />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Dashboard",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    logout() {
      this.isLoading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: "login" });
        });
    }
  }
};
</script>
