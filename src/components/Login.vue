<template>
  <v-content>
    <div class="main--container">
      <img src="@/assets/logo.png" alt="" />
      <div class="main--title">
        <h1>Login</h1>
      </div>
      <div class="main--form">
        <v-form>
          <v-text-field type="text" placeholder="usuario" />
          <v-text-field type="password" placeholder="senha" />
        </v-form>
      </div>
    </div>
  </v-content>
</template>

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
</style>
