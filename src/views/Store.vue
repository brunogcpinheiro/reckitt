<template>
  <v-content>
    <Header />
    <v-container class="content">
      <div>
        <h4>2. Dados da Loja</h4>
      </div>

      <div>
        <p>
          <small>Nome da loja.: </small>
          {{ initialData.store }}
        </p>
      </div>

      <div class="form">
        <v-form>
          <v-card>
            <v-card-title class="card--title">
              <p>MSL <small>(osa)</small></p>
            </v-card-title>
            <v-card-text>
              <v-checkbox
                color="#db338f"
                label="0-64% (0pts)"
                :value="msl.first"
              ></v-checkbox>
              <v-checkbox
                color="#db338f"
                label=">65% (proporcional a 40pts)"
                :value="msl.second"
              ></v-checkbox>
              <v-checkbox
                color="#db338f"
                label="=100% (40pts)"
                :value="msl.third"
              ></v-checkbox>
            </v-card-text>
          </v-card>
        </v-form>
      </div>

      <div class="stepper">
        <v-stepper value="2" class="stepper-content" alt-labels vertical>
          <v-stepper-header>
            <v-stepper-step color="#db338f" step="1" complete
              >Iniciais</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step color="#db338f" step="2">Loja</v-stepper-step>

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

import Header from "@/components/Header.vue";

export default {
  name: "Store",
  components: {
    Loading,
    Header
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      msl: {
        first: 0,
        second: 0,
        third: 0
      }
    };
  },
  computed: {
    initialData() {
      return this.$store.state.initialData;
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

.card--title {
  background: #db338f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  p {
    padding: 0;
    margin: 0;
    small {
      font-size: 0.8rem;
    }
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
