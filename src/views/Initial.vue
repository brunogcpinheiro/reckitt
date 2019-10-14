<template>
  <v-content>
    <Header />
    <v-container class="content">
      <div>
        <h4>1. Dados Iniciais</h4>
      </div>

      <div class="form">
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            label="Nome"
            prepend-icon="mdi-account"
            color="#db338f"
            v-model="name"
          ></v-text-field>
          <v-text-field
            label="Loja"
            prepend-icon="mdi-cart"
            color="#db338f"
            v-model="store"
          ></v-text-field>
          <v-menu full-width>
            <template v-slot:activator="{ on }">
              <v-text-field
                color="#db338f"
                label="Data"
                prepend-icon="mdi-calendar"
                v-on="on"
                :value="formattedDate"
              >
              </v-text-field>
            </template>
            <v-date-picker
              v-model="due"
              color="#db338f"
              full-width
            ></v-date-picker>
          </v-menu>

          <v-btn color="#db338f" dark type="submit" width="100%" height="60"
            >Salvar e Avançar <v-icon>mdi-content-save-move</v-icon></v-btn
          >
        </v-form>
      </div>

      <div class="stepper">
        <v-stepper value="1" class="stepper-content" alt-labels vertical>
          <v-stepper-header>
            <v-stepper-step color="#db338f" step="1">Iniciais</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">Loja</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Enviar</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </div>
    </v-container>
    <loading
      :active="isLoading"
      :is-full-page="fullPage"
      color="#db338f"
      loader="dots"
    />
  </v-content>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import format from "date-fns/format";
import { parseISO } from "date-fns/fp";
import ptBR from "date-fns/locale/pt-BR";

import Header from "@/components/Header.vue";

export default {
  name: "Initial",
  components: {
    Loading,
    Header
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      name: "",
      store: "",
      due: null
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("saveInitialData", {
        name: this.name,
        store: this.store,
        due: this.due,
        user: firebase.auth().currentUser.email
      });

      //eslint-disable-next-line
      console.log(this.$store.state.initialData);

      this.isLoading = true;

      return this.$router.push({ name: "store" });
    }
  },
  computed: {
    formattedDate() {
      let parsedDate = parseISO(this.due);
      return this.due ? format(parsedDate, "dd/MM/yyyy", { locale: ptBR }) : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 980px) {
    max-width: 500px;
  }
}

.v-btn {
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
}

.stepper {
  margin-top: 30px;
}

.stepper-content {
  background: #e5e5e5;
  padding: 0;
}
</style>
