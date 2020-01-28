<template>
  <v-content>
    <Header />
    <InitialData />
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
import InitialData from "@/components/InitialData.vue";

export default {
  name: "Initial",
  components: {
    Loading,
    Header,
    InitialData
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  }
};
</script>
