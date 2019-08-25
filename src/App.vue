<template>
  <v-app>
    <div>
      <Login />
    </div>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",
  components: {
    Login
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", cursive, sans-serif;
}
</style>
