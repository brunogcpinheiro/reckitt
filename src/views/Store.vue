<template>
  <v-content>
    <Header />
    <StoreData />
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
import StoreData from "@/components/StoreData.vue";

export default {
  name: "Store",
  components: {
    Loading,
    Header,
    StoreData
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  }
};
</script>
