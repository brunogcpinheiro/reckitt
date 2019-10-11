<template>
  <v-content>
    <div class="main--container">
      <p class="logout" @click="logout">
        <v-icon color="#db338f">mdi-exit-to-app</v-icon>
        <span>Sair</span>
      </p>
      <div>
        <h2>
          Bem vindo,
        </h2>
        <p>{{ user_name }}!</p>
      </div>
    </div>
    <div class="content">
      <div>
        <h4>Preencha os dados abaixo</h4>
      </div>
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
  mounted() {
    let user = firebase.auth().currentUser;

    db.collection("users")
      .where("user_id", "==", user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user_name = doc.data().name;
        });
      });
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
  float: right;

  span {
    text-decoration: underline;
    margin-left: 3px;
    margin-top: 5px;
  }
}

.content {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
</style>
