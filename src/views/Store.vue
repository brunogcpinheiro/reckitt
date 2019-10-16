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
          <v-card class="card">
            <v-card-title class="card--title">
              <p>MSL <small>(osa)</small></p>
            </v-card-title>
            <v-card-text>
              <small
                ><strong
                  >Para habilitar a segunda opção, por favor insira a
                  porcentagem no campo a frente e marque a opção para o
                  cálculo</strong
                ></small
              >
              <v-radio-group hide-details v-model="msl" :mandatory="false">
                <v-radio
                  color="#db338f"
                  label="0 - 64% (0 pts)"
                  value="0"
                ></v-radio>

                <div class="proportional">
                  <v-radio
                    class="proportional--radio"
                    color="#db338f"
                    label=">= 65% (proporcional a 40 pts)"
                    :value="proportionalResult"
                  ></v-radio>

                  <v-text-field
                    type="number"
                    outlined
                    class="proportional--input"
                    v-model="proportional"
                  ></v-text-field>
                </div>
                <v-radio
                  color="#db338f"
                  label="= 100% (40 pts)"
                  value="40"
                ></v-radio>
              </v-radio-group>
              <div class="result">
                <div class="result--info">
                  <h3>
                    Total:
                  </h3>
                  <small>Máximo: 40 pts</small>
                </div>
                <div class="points">
                  <span>{{ msl || 0 }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="card">
            <v-card-title class="card--title">
              <p>SOS</p>
            </v-card-title>
            <v-card-text>
              <v-checkbox
                v-for="cb in sosCbs"
                color="primary"
                :value="cb"
                :label="cb.label"
                :key="cb.id"
                v-model="sosCheckeds"
                hide-details
              ></v-checkbox>
              <div class="result">
                <div class="result--info">
                  <h3>
                    Total:
                  </h3>
                  <small>Máximo: 20 pts</small>
                </div>
                <div class="points">
                  <span>{{ sosSum || 0 }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="card">
            <v-card-title class="card--title">
              <p>CANVASS</p>
            </v-card-title>
            <v-card-text>
              <v-radio-group hide-details v-model="canvass" :mandatory="false">
                <v-radio
                  color="#db338f"
                  label="1 MARCA (5 pts)"
                  value="5"
                ></v-radio>

                <div>
                  <v-radio
                    color="#db338f"
                    label="2 MARCAS (10 pts)"
                    value="10"
                  ></v-radio>
                </div>

                <v-radio
                  color="#db338f"
                  label="+3 MARCAS (15 pts)"
                  value="15"
                ></v-radio>
              </v-radio-group>
              <div class="extra">
                <h3>Target de ponto extra:</h3>
                <p>Ilha, Terminal ou Display</p>
              </div>
              <div class="result">
                <div class="result--info">
                  <h3>
                    Total:
                  </h3>
                  <small>Máximo: 15 pts</small>
                </div>
                <div class="points">
                  <span>{{ canvass || 0 }}</span>
                </div>
              </div>
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
      msl: 0,
      sosCbs: [
        {
          id: 1,
          value: 5,
          label: "VMU 75% (5 pts)"
        },
        {
          id: 2,
          value: 1,
          label: "Cozinha 45% (1 pts)"
        },
        {
          id: 3,
          value: 1,
          label: "Banheiro 55% (1 pt)"
        },
        {
          id: 4,
          value: 1,
          label: "VLP 60% (1 pt)"
        },
        {
          id: 5,
          value: 1,
          label: "VPS 40% (1 pt)"
        },
        {
          id: 6,
          value: 1,
          label: "Desinfetantes 20% (1 pt)"
        },
        {
          id: 7,
          value: 5,
          label: "Vanish 70% (5 pts)"
        },
        {
          id: 8,
          value: 4,
          label: "Pest 20% (4 pts)"
        },
        {
          id: 9,
          value: 1,
          label: "Bom Ar 45% (1 pt)"
        }
      ],
      sosCheckeds: [],
      canvass: 0,
      proportional: null
    };
  },
  computed: {
    initialData() {
      return this.$store.state.initialData;
    },
    proportionalResult() {
      return Math.floor((parseInt(this.proportional) / 100) * 40);
    },
    sosSum() {
      return this.sosCheckeds.reduce((sum, addon) => sum + addon.value, 0);
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

.card {
  margin-bottom: 50px;
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

.proportional {
  display: flex;
}

.proportional--radio {
  flex: 4;
}

.proportional--input {
  flex: 1;
}

.result {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  h3 {
    align-self: flex-end;
  }
}

.result--info {
  display: flex;
  flex-direction: column;
}

.points {
  background: #db338f;
  color: #fff;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  margin: -10px 0 0 10px;
  border: 3px solid #f598cb;

  span {
    font-size: 1.5rem;
  }
}

.v-radio,
.extra {
  margin-top: 15px;
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
