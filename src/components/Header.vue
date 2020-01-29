<template>
  <div class="main--container">
    <p class="logout" @click="logout">
      <v-icon color="#fff">mdi-exit-to-app</v-icon>
      <span>Sair</span>
    </p>
    <div>
      <div class="greet">
        <h3>Bem vindo,</h3>
        <p>{{ user_name }}!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseStore, firebaseAuth } from "@/firebase/init";

export default {
  name: "Header",
  data() {
    return {
      user_name: ""
    };
  },
  created() {
    let user = firebaseAuth.currentUser;

    firebaseStore
      .collection("users")
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
      firebaseAuth.signOut().then(() => {
        this.isLoading = false;
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main--container {
  padding: 10px 20px;
  background-color: #db338f;
  color: #fff;
}

.logout {
  display: flex;
  padding: 5px;
  float: right;
  cursor: pointer;

  span {
    text-decoration: underline;
    margin-left: 3px;
    margin-top: 5px;
  }
}

.greet {
  p {
    font-weight: bold;
    font-size: 0.85rem;
  }
}
</style>
