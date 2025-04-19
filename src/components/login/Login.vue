<template>
  <v-app class="app">
    <v-main class="main">
      <v-container :class="isMobile ? 'container-md' : 'container'">
        <!-- Primeiro card (verde) -->
        <v-card v-if="!isMobile" class="card-first" color="#57a340">
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
        <v-row v-if="isMobile" justify="center" align="center" >
          <v-col cols="12"  class="d-flex justify-center align-center ">
            <v-avatar size="100" class="elevation-5 pa-2">
              <v-img src="./img/logo (1).svg" alt="Logo" cover class="rounded-circle" style="object-fit: contain" />
            </v-avatar>
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-center align-center options-bar">
              <router-link class="arch-left" to="/register">
                <p class="">Cadastrar</p>
              </router-link>
              <router-link class="rectangle" to="/login">
                <p class="">Login</p>
              </router-link>
              <router-link class="arch-right" to="/change-password">
                <p class="">Esqueci a senha</p>
              </router-link>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="isMobile" justify="center" align="center" class="d-flex justify-center w-100" >
          <v-form >
            <v-row no-gutters>
              <v-col cols="12" class="">
                <v-text-field v-model="username" bg-color="#f5f4f4" rounded variant="" placeholder="Usuário" density="comfortable" :rules="nomeRules"/>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  bg-color="#f5f4f4"
                  rounded
                  variant=""
                  placeholder="Senha"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  density="comfortable"
                  class="custom-text-field"
                  :rules="requiredField"
                />
              </v-col>
            </v-row>
            <v-row dense class="d-flex flex-column" no-gutters>
              <v-col class="text-end forgot-password-container">
                <router-link class="forgot_password" to="/change-password"> Esqueci minha senha </router-link>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center mt-4">
              <v-col cols="5" class="d-flex justify-center">
                <v-btn :loading="loading" type="submit" class="btn-login rounded-lg" block :disabled="!isFormValid">
                  <template v-slot:default>Entrar</template>
                  <template v-slot:loader>
                    <v-progress-circular indeterminate color="white" />
                  </template>
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center new-here-container"> <span>Ainda não faz parte?</span>&nbsp;<router-link class="forgot_password" to="/change-password">Junte-se a nós</router-link> </v-col>
            </v-row>
          </v-form>
        </v-row>
        <v-card v-if="isMobile" class="d-flex flex-column card mt-4" color="#57a340">
          <div class="welcome-mobile d-flex flex-column">
            <span class="">BEM-VINDO</span>
            <div class="siae-name">
              <h3 class="siae-text">SIAE</h3>
            </div>
          </div>
          <p style="font-size: 15px; font-weight: 200px; width: 100%">O sistema que garante alimentação de <br />qualidade para os nossos alunos</p>
        </v-card>

        
        <!-- Segundo card (branco) -->
        <v-card v-if="!isMobile" class="card-second" color="#ffffff">
          <v-row>
            <v-col class="text-center">
              <div class="logo-circle">
                <v-img class="logo-img" src=".\img\logo (1).svg"></v-img>
              </div>
            </v-col>
          </v-row>
          <v-form class="form-container" v-on:submit.prevent="login">
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
                  <v-text-field v-model="username" rounded variant="outlined" placeholder="Usuário" dense  :rules="nomeRules"/>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="password"
                    rounded
                    variant="outlined"
                    placeholder="Senha"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    dense
                    class="custom-text-field"
                    :rules="requiredField"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-btn :loading="loading" type="submit" class="btn-login" :disabled="!isFormValid">
                  <template v-slot:default> Entrar </template>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "@/services/axios.js";
import { useToast } from "vue-toastification";
import utilsFunc from "../../services/utilsFunc";
import { useDisplay } from "vuetify";

export default {
  name: "TwoCardsExample",

  data: () => ({
    smAndDown: false,
    username: null,
    password: null,
    showPassword: false,
    loading: false,
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
  }),
  computed: {
    isFormValid() {
      return !!(
        this.username &&
        this.password
      );
    },

    isMobile() {
      console.log("SMANDOWN: ", this.smAndDown);
      return this.smAndDown;
    }, 

    nomeRules() {
      return [(v) => !!v || "Obrigatório", (v) => /^[A-Za-zÀ-ÿ\s]+$/.test(v) || "Insira um nome válido"];
    },
  },
  methods: {
    async login() {
      this.loading = true;
      const toast = useToast();
      const { username, password } = this;

      try {
        console.log("Teste de requisição");

        const response = await axios.post("/login/auth", { username, password });
        const [_, token] = response.data.token.split(" ");

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data));

        const role = utilsFunc.getRoleFromToken();
        console.log("ROLE", typeof role);

        if (role === "PRODUTOR") {
          console.log("Caiu na condição");
          return this.$router.push("/profile-prod");
        }

        return this.$router.push("/menu");
      } catch (error) {
        this.handleLoginError(error, toast);
      } finally {
        this.loading = false;
      }
    },

    handleLoginError(error, toast) {
      if (error.response) {
        const { message } = error.response.data;

        if (message === "Seu login ainda não foi habilitado. Confirme o e-mail.") {
          toast.warning(message);
        } else {
          toast.error("Erro ao fazer o login. " + message);
        }
      } else {
        console.error("Erro de conexão: ", error);
      }
    },
  },
  mounted() {
    const display = useDisplay();
    this.smAndDown = display.smAndDown;
  },
};
</script>

<style scoped>

::v-deep(.v-messages__message){
  text-align: end;
  padding-bottom: 5px;
  font-size: 11px;
  color: rgb(175, 5, 5); /* ou qualquer outra cor */
}

.container {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 100vh; /* Ocupa a altura total da tela */
  position: relative;
}
.card-first {
  position: absolute;
  border-radius: 20px;
  z-index: 1;
  width: 550px;
  height: 550px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translate(-180px);
}

.card-second {
  position: absolute;
  border-radius: 20px;
  z-index: 2;
  width: 430px;
  height: 550px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translate(220px);
}

.form-container {
  margin-top: 70px;
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
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  position: relative;
}

.welcome {
  font-size: 1.6rem;
  margin-top: 100px;
  margin-right: 90px;
}

.logo-name {
  margin-top: 110px;
  margin-right: 110px;
}

.logo-name-container {
  display: inline-block;
  background-color: #469230; /* Cor de fundo */
  height: 35px;
  width: 120px;
  margin-top: 110px;
  margin-left: 15px !important;
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
  margin-right: 90px;
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
  background-color: #75cc54;
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
  background-color: #57a340;
  margin-top: -80px;
  margin-left: 1px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.arch-right {
  border-radius: 0 100px 100px 0;
  cursor: pointer;
  width: 120px;
}

.arch-left:hover,
.arch-right:hover {
  background-color: #57a340;
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .app {
    min-height: 100dvh;
  }
  
  .main {
    min-height: 100dvh;
  }
  .container-md {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    min-height: 100dvh;
    
  }

  .card {
    padding-top: 1rem;
    margin-bottom: -16px;
    display: flex;
    height: 180px;
    width: 100vw;
    border-radius: 30px 30px 0px 0px;
  }

  .logo-name-container {
    display: inline-block;
    background-color: #469230; /* Cor de fundo */
    height: 35px;
    width: 120px;
    margin-top: 110px;
    margin-left: 15px !important;
    transform: skew(20deg); /* Inclinação do paralelogramo */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Sombra */
  }

  .welcome-mobile {
    align-items: center;
    font-size: 25px;
    font-weight: 400px;
    justify-content: center;
    width: 100%;
    height: auto;
  }

  .siae-name {
    display: inline-block;
    background-color: #498238; /* Cor de fundo */
    height: 35px;
    width: 120px;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
    transform: skew(20deg); /* Inclinação do paralelogramo */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* Sombra */
  }

  .siae-text {
    transform: skew(-20deg);
  }

  .card-first,
  .card-second {
    position: static;
    width: 100%;
    height: auto;
    transform: none;
    margin: 1rem auto;
    border-radius: 24px 24px 0px 0px;
  }

  .form-container {
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .welcome,
  .slogan {
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-right: 0;
    text-align: center;
  }

  .logo-name-container {
    margin: 1rem auto;
    transform: none;
  }

  .logo-name {
    text-align: center;
    font-size: 1.4rem;
    transform: none;
    align-content: center;
  }

  .btn-login {
    width: 100%;
    height: 50px;
  }

  .logo-circle {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .logo-img {
    width: 100px;
    height: 100px;
  }

  .options-bar {
    word-wrap: break-word;
    flex-direction: row;
    height: auto;
    gap: 0.2rem;
    margin-bottom: 20px;
  }

  .rectangle,
  .arch-left,
  .arch-right {
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    text-overflow: ellipsis; 
    overflow: hidden; 
    margin-top: 0.8rem;
    text-align: center;
    height: 40px;
    font-size: 0.9rem;
  }

  .forgot-password-container {
    display: flex;
    margin-top: 0.2rem;
    margin-left: -10px;
    justify-content: end;
    margin-bottom: 5px;
  }

  .new-here-container {
    display: flex;
    margin-top: 0.2rem;
    justify-content: center;
    margin-bottom: 5px;
  }
  .mobile-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .mobile-subheading {
    display: flex;
    font-size: 1rem;
    color: #666;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
}
</style>
