<template>
  <v-container class="content">
    <div>
      <h4>1. Dados Iniciais</h4>
    </div>

    <div class="form">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          label="Nome"
          prepend-icon="mdi-account"
          v-model="name"
        ></v-text-field>

        <v-text-field
          label="Data de conferência"
          prepend-icon="mdi-calendar"
          v-model="due"
          disabled
        ></v-text-field>

        <v-btn dark color="#db338f" type="submit" width="100%" height="60">
          Salvar e Avançar
          <v-icon>mdi-content-save-move</v-icon>
        </v-btn>
      </v-form>
    </div>

    <div class="stepper">
      <v-stepper value="1" class="stepper-content" alt-labels vertical>
        <v-stepper-header>
          <v-stepper-step step="1">Iniciais</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Loja</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Enviar</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </div>
  </v-container>
</template>

<script>
import { firebaseAuth } from "@/firebase/init";
import format from "date-fns/format";
import { parseISO } from "date-fns/fp";
import ptBR from "date-fns/locale/pt-BR";

export default {
  name: "InitialData",
  data() {
    return {
      name: "",
      store: {},
      due: format(new Date(), "dd/MM/yyyy", { locale: ptBR })
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("saveInitialData", {
        name: this.name,
        store: this.store,
        due: this.due,
        user: firebaseAuth.currentUser.email
      });
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
