<template>
  <v-content>
    <div class="main--container">
      <img src="@/assets/logo.png" alt="" />
      <div class="main--title">
        <h1>Registrar</h1>
      </div>
      <div class="main--form">
        <v-form>
          <v-text-field
            type="text"
            color="#db338f"
            placeholder="nome completo"
            name="nome"
            v-model="nome"
          />
          <v-text-field
            type="text"
            color="#db338f"
            placeholder="email"
            name="email"
            v-model="email"
          />
          <v-text-field
            type="password"
            color="#db338f"
            placeholder="senha"
            name="senha"
            v-model="senha"
          />
          <p class="error--message" v-if="feedback">{{ feedback }}</p>
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

export default {
  name: "Signup",
  data() {
    return {
      nome: null,
      email: null,
      senha: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.nome && this.email && this.senha) {
        this.slug = slugify(this.nome, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "Este nome já está sendo utilizado!";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.senha)
              .catch(err => {
                this.feedback = err.message;
              });
            this.feedback = "Este nome pode ser utilizado!";
          }
        });
      } else {
        return (this.feedback = "Gentileza preencher todos os campos!");
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
  margin-top: 30px;
}

.error--message {
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  margin: -5px 0 0 0;
  padding: 5px 10px;
  background: #ff5252;
  width: 250px;
}
</style>
