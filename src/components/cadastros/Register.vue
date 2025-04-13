<template>
  <v-main>
    <v-container class="d-flex container">
      <v-row dense align="center" justify="center" class="">
        <!-- Primeiro card (verde) -->
        <v-col cols="12" sm="6" md="4" class="d-flex">
          <v-card class="flex-grow-1 align-center rounded-xl elevation-4 card-1" color="#57a340" height="550px">
            <div class="green-card-container">
              <h3 class="welcome">BEM-VINDO</h3>
              <div class="logo-name-container">
                <h3 class="logo-name">SIAE</h3>
              </div>
            </div>
            <p class="slogan">
              O sistema que garante alimentação<br />
              de qualidade para os nossos alunos
            </p>
          </v-card>
        </v-col>

        <!-- Segundo card (branco) -->
        <v-col cols="12" sm="6" md="5" class="d-flex justify-center card-2">
          <v-card class="flex-grow-1 rounded-xl elevation-4" color="#ffffff" height="550px">
            <v-row>
              <v-col class="text-center">
                <div class="logo-circle">
                  <v-img class="logo-img" src=".\img\logo (1).svg"></v-img>
                </div>
              </v-col>
            </v-row>
            <v-form class="form-container" v-on:submit.prevent="register">
              <v-card-text>
                <v-row dense>
                  <v-col dense>
                    <div class="options-bar">
                      <router-link class="arch-left" to="/register">
                        <p>Cadastrar</p>
                      </router-link>
                      <router-link class="rectangle" to="/login">
                        <p>Login</p>
                      </router-link>
                      <router-link class="arch-right" to="/change-password">
                        <p>Esqueci a senha</p>
                      </router-link>
                    </div>
                  </v-col>
                </v-row>
                <v-row dense class="mt-5">
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="username" rounded variant="outlined" density="compact" placeholder="Usuário" dense hide-details />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="cpf" rounded variant="outlined" density="compact" placeholder="CPF" dense hide-details />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="email" rounded variant="outlined" density="compact" placeholder="Email" dense hide-details />
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field
                      v-model="password"
                      rounded
                      variant="outlined"
                      placeholder="Senha"
                      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append-inner="showPassword = !showPassword"
                      dense
                      hide-details
                      class="custom-text-field"
                      density="compact"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-7">
                <v-container>
                  <v-btn :loading="loading" type="submit" class="btn-login">
                    Cadastrar
                    <template v-slot:loader>
                      <v-progress-circular indeterminate color="white"></v-progress-circular>
                    </template>
                  </v-btn>
                </v-container>
              </v-card-actions>
              <v-row dense justify="end">
                <v-col class="text-end forgot-password-container">
                  <router-link class="forgot_password" to="/change-password">Esqueci minha senha</router-link>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "@/services/axios.js";
import { useToast } from "vue-toastification";

export default {
  name: "TwoCardsExample",

  data: () => ({
    loading: false,
    username: null,
    email: null,
    password: null,
    cpf: null,
    showPassword: false,
  }),

  methods: {
    async register() {
      const toast = useToast();
      this.loading = true;
      const fields = {
        username: this.username,
        email: this.email,
        password: this.password,
        cpf: this.cpf
      };

      try {
        console.log("Teste de requisição");
        const response = await axios.post("/public/users/register", fields);
        if (response.status === 409) {
          throw new Error("Um erro ocorreu:");
        }
        console.log(response);
        localStorage.setItem("canAccessEmailVerification", "true");
        this.$router.push({
          name: "MailVerification",
          query: { email: this.email },
        });
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Erro inesperado.";
        toast.error(errorMessage);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  flex-wrap: wrap;
  align-items: center; /* Centraliza verticalmente */
  min-height: 100vh; /* Garante que ocupe ao menos 100% da altura da tela */
  position: relative;
  overflow-y: hidden; /* Impede o scroll */
}

.card-1 {
  z-index: 1;
}

.card-2 {
  z-index: 2;
  
}

.form-container {
  margin-top: 50px;
}

.enter-text {
  font-size: 1rem;
  font-weight: bold;
  color: #57a340;
  padding-bottom: 20px;
  text-align: center;
  margin: auto;
}

.green-card-container {
  display: grid;
  justify-items: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  position: relative;
}

.welcome {
  font-size: 1.6rem;
  margin-top: 100px;
 
}

.logo-name {
  margin-top: 110px;
}

.logo-name-container {
  display: inline-block;
  background-color: #469230; /* Cor de fundo */
  height: 35px;
  width: 120px;
  margin-top: 110px;
  transform: skew(20deg); /* Inclinação do paralelogramo */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Sombra */
}

.logo-name {
  color: #ffffff;
  font-size: 1.5rem; /* Tamanho do texto */
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transform: skew(-20deg); /* Inclinação do paralelogramo */
  margin: 0; /* Remove qualquer margem padrão */
}

.slogan {
  font-size: 1.1rem;
  margin-top: 100px;
}

.btn-login {
  color: #ffffff;
  background-color: #57a340;
  width: 30%;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(34, 107, 16, 0.4);
}

.logo-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  margin-top: 10px;
  box-shadow: 0px 4px 2px rgba(34, 107, 16, 0.4);
}

.logo-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0;
}

.forgot_password {
  color: #57a340;
  font-weight: 400;
  text-decoration: underline;
  font-size: 0.9rem;
}

.forgot-password-container {
  margin-top: -100px;
  margin-right: 25px;
}

.options-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}

.arch-left,
.arch-right {
  color: #ffffff;
  font-weight: 400;
  width: 90px;
  padding-top: 10px;
  background-color: #62a84d;
  height: 40px;
  border-radius: 100px 0 0 100px;
  margin-top: -80px;
  margin-left: 1px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.rectangle {
  color: #ffffff;
  font-weight: 400;
  width: 100px;
  height: 40px;
  padding-top: 10px;
  background-color: #80c25c;
  margin-top: -80px;
  margin-left: 1px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.arch-right {
  background-color: #80c25c;
  border-radius: 0 100px 100px 0;
  cursor: pointer;
  width: 120px;
}

.arch-right:hover,
.rectangle:hover {
  background-color: #57a340;
  transform: scale(0.9);
}

::v-deep(.v-field__input) {
  font-size: 12px !important;
  padding: 5px 20px !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: justify !important;
  white-space: normal !important;
}

</style>
