<template>
  <v-content>
    <div class="main--container">
      <div class="icon">
        <v-icon color="#db338f">mdi-arrow-left-circle</v-icon>
        <router-link to="/">voltar</router-link>
      </div>
      <img src="@/assets/logo.png" alt />
      <div class="main--title">
        <h1>Registrar</h1>
      </div>
      <div class="main--form">
        <v-form>
          <v-text-field
            type="text"
            label="nome completo"
            name="name"
            v-model="name"
          />
          <v-text-field
            type="text"
            label="email"
            name="email"
            v-model="email"
          />
          <v-text-field
            type="password"
            color="#db338f"
            label="senha"
            name="password"
            v-model="password"
          />
          <p class="error--message" v-if="feedback">
            {{ feedback }}
          </p>
          <loading
            :active="isLoading"
            :is-full-page="fullPage"
            color="#db338f"
            loader="dots"
          />
          <v-btn color="#db338f" dark @click="signup">Registrar</v-btn>
        </v-form>
      </div>
    </div>
  </v-content>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import * as firebase from "firebase/app";
import "firebase/auth";
import bcrypt from "bcryptjs";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Signup",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      name: null,
      email: null,
      password: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      this.feedback = null;
      if (this.name && this.email && this.password) {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        this.isLoading = true;
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.isLoading = false;
            this.feedback = "This name is already in use!";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                this.isLoading = true;
                const hash = bcrypt.hashSync(this.password, 3);
                ref
                  .set({
                    name: this.name,
                    email: this.email,
                    password: hash,
                    isAdmin: false,
                    user_id: cred.user.uid
                  })
                  .then(() => {
                    this.isLoading = false;
                    this.feedback = null;
                    this.$router.push({ name: "login" });
                  });
              })
              .catch(err => {
                this.isLoading = false;
                this.feedback = err.message;
              });
          }
        });
      } else {
        return (this.feedback = "Please, complete all fields!");
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
  padding-top: 20px;
  .icon {
    align-self: flex-start;
    margin: 0 0 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
      color: #db338f;
      text-decoration: none;
      font-size: 0.8rem;
      margin-left: 3px;
    }
  }
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
  margin-top: 30px;
}

.error--message {
  color: #db338f;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin: -5px 0 0 0;
  padding: 5px 10px;
  background: transparent;
  border: 2px solid #db338f;
  width: 250px;
}
</style>
