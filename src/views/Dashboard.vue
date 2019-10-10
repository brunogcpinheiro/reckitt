<template>
  <v-content>
    <div class="main--container">
      Bem vindo, {{ user_name }}!
      <p class="logout" @click="logout">
        <v-icon color="#db338f">mdi-exit-to-app</v-icon>
        <span>Sair</span>
      </p>
    </div>
    <loading
      :active="isLoading"
      :is-full-page="fullPage"
      color="#db338f"
      loader="dots"
    />
  </v-content>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/init";
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
      fullPage: true,
      user_name: ""
    };
  },
  created() {
    // this.active_user = firebase.auth().currentUser.email;
    console.log(firebase.auth());
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

<style lang="scss" scoped>
.main--container {
  padding: 20px;
}

.logout {
  display: flex;
  padding: 5px;
  color: #db338f;

  span {
    text-decoration: underline;
  }
}
</style>
