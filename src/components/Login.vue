<template>
  <v-content>
    <div class="main--container">
      <img src="@/assets/logo.png" alt="" />
      <div class="main--title">
        <h1>Login</h1>
      </div>
      <div class="main--form">
        <v-form>
          <v-text-field type="text" placeholder="usuario" color="#db338f" />
          <v-text-field type="password" placeholder="senha" color="#db338f" />
          <v-btn color="#db338f" dark>Entrar</v-btn>
        </v-form>
      </div>
      <div class="main--register">
        <p>
          Ainda não é registrado?
          <span><router-link to="/signup">Clique aqui</router-link></span>
        </p>
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

.v-btn {
  width: 100%;
  margin-top: 30px;
}

.main--register {
  margin-top: 20px;
  span {
    a {
      color: #db338f;
    }
  }
}
</style>
