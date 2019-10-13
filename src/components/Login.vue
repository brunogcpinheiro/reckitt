<template>
  <v-content>
    <div class="main--container">
      <img src="@/assets/logo.png" alt />
      <div class="main--title">
        <h1>Login</h1>
      </div>
      <div class="main--form">
        <v-form @submit.prevent="login">
          <v-text-field
            type="text"
            label="email"
            color="#db338f"
            v-model="email"
          />
          <v-text-field
            type="password"
            label="senha"
            color="#db338f"
            v-model="password"
          />
          <v-btn color="#db338f" dark type="submit">Entrar</v-btn>
        </v-form>
        <p v-if="feedback" class="error--message">{{ feedback }}</p>
        <loading
          :active="isLoading"
          :is-full-page="fullPage"
          color="#db338f"
          loader="dots"
        />
      </div>
      <div class="main--register">
        <p>
          Ainda não é registrado?
          <span>
            <router-link to="/signup">Clique aqui</router-link>
          </span>
        </p>
      </div>
    </div>
  </v-content>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Login",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      if (this.email && this.password) {
        this.isLoading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: "dashboard" });
          })
          .catch(err => {
            this.isLoading = false;
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.isLoading = false;
        this.feedback = "Please enter the credentials!";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main--container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 50px;
  img {
    width: 200px;
    height: 120px;
  }
  h1 {
    color: #db338f;
    font-size: 2.2rem;
    margin-top: 40px;
  }
}

.main--form {
  margin-top: 20px;
}

.v-btn {
  width: 100%;
  margin-top: 10px;
}

.main--register {
  margin-top: 20px;
  span {
    a {
      color: #db338f;
    }
  }
}

.error--message {
  color: #db338f;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin: 25px 0 0 0;
  padding: 5px 10px;
  background: transparent;
  border: 2px solid #db338f;
  width: 250px;
}
</style>
