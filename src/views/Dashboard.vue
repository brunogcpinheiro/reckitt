<template>
  <v-content>
    <Header />
    <v-container class="content">
      <div>
        <h4>1. Dados Iniciais</h4>
      </div>

      <div class="form">
        <v-form>
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
                label="Dia"
                prepend-icon="mdi-calendar"
                v-on="on"
                :value="date"
              >
              </v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              color="#db338f"
              full-width
            ></v-date-picker>
          </v-menu>
        </v-form>
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

import Header from "@/components/Header.vue";

export default {
  name: "Dashboard",
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
      date: null
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
}
</style>
