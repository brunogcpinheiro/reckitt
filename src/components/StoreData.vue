<template>
  <v-container class="content">
    <div>
      <h4>2. Dados da Loja</h4>
    </div>

    <div>
      <p>
        <small>Nome da loja.:</small>
        {{ storeName }}
      </p>
    </div>

    <div class="form">
      <v-form @submit.prevent="onSubmit">
        <v-card class="card">
          <v-card-title class="card--title">
            <p>
              MSL
              <small>(osa)</small>
            </p>
          </v-card-title>
          <v-card-text>
            <small>
              <strong>
                Para habilitar a segunda opção, por favor insira a porcentagem
                no campo a frente e marque a opção para o cálculo
              </strong>
            </small>
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
                <h3>Total:</h3>
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
                <h3>Total:</h3>
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
                <h3>Total:</h3>
                <small>Máximo: 15 pts</small>
              </div>
              <div class="points">
                <span>{{ canvass || 0 }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="card">
          <v-card-title class="card--title">
            <p>KDBs</p>
          </v-card-title>
          <v-card-text>
            <v-checkbox
              v-for="cb in kdbCbs"
              color="primary"
              :value="cb"
              :label="cb.label"
              :key="cb.id"
              v-model="kdbCheckeds"
              hide-details
            ></v-checkbox>
            <div class="result">
              <div class="result--info">
                <h3>Total:</h3>
                <small>Máximo: 25 pts</small>
              </div>
              <div class="points">
                <span>{{ kdbSum || 0 }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-btn class="total" width="100%" height="60" color="primary">
          Total:
          <span>{{ totalSum }}</span>
        </v-btn>
        <v-btn
          type="submit"
          class="total"
          width="100%"
          height="60"
          color="primary"
          >Avançar</v-btn
        >
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "StoreData",
  data() {
    return {
      msl: 0,
      sosCheckeds: [],
      canvass: 0,
      kdbCbs: [],
      kdbCheckeds: [],
      proportional: null
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("saveStoreData", {
        msl: this.msl,
        sosCheckeds: this.sosCheckedItems,
        sosTotal: this.sosSum,
        canvass: this.canvass,
        kdbCheckeds: this.kdbCheckedItems,
        kdbTotal: this.kdbSum,
        total: this.totalSum
      });

      //eslint-disable-next-line
      console.log(this.$store.state.storeData);

      this.isLoading = true;

      return this.$router.push({ name: "initial" });
    }
  },
  computed: {
    ...mapState({
      sosCbs: state => state.sos.items
    }),
    ...mapActions({
      fetchSOS: "fetchSOS"
    }),
    storeName() {
      return this.$store.state.initialData.items.store.name;
    },
    proportionalResult() {
      return Math.floor((parseInt(this.proportional) / 100) * 40);
    },
    sosSum() {
      return this.sosCheckeds
        .reduce((sum, addon) => sum + addon.value, 0)
        .toString();
    },
    kdbSum() {
      return this.kdbCheckeds
        .reduce((sum, addon) => sum + addon.value, 0)
        .toString();
    },
    totalSum() {
      return (
        parseInt(this.msl) +
        parseInt(this.sosSum) +
        parseInt(this.canvass) +
        parseInt(this.kdbSum)
      ).toString();
    },
    sosCheckedItems() {
      return this.sosCheckeds.map(sosChecked => sosChecked.label);
    },
    kdbCheckedItems() {
      return this.kdbCheckeds.map(kdbChecked => kdbChecked.label);
    }
  },
  mounted() {
    this.fetchSOS();
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
  border: 3px solid #f598cb;
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

.total {
  font-size: 1.2rem;
  font-family: "Montserrat", cursive, sans-serif;
  font-weight: bold;
  border: 5px solid #f598cb;

  span {
    font-size: 2rem;
    margin-left: 10px;
  }
}

.stepper {
  margin-top: 30px;
}

.stepper-content {
  background: #e5e5e5;
  padding: 0;
}
</style>
