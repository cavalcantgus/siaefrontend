<template>
  <v-app>
    <v-main>
    <v-container :class="isMobile ? 'container-md' : 'd-flex container'">

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
          <v-form v-on:submit.prevent="register">
            <v-row no-gutters>
              <v-col cols="12" class="">
                <v-text-field class="required" v-model="completeName"  placeholder="Nome Completo " bg-color="#f5f4f4" rounded variant=""  density="compact" :rules="nomeRules"/>
              </v-col>
              <v-col cols="12" class="">
                <v-text-field  v-model="username"  placeholder="Nome de Usuário " bg-color="#f5f4f4" rounded variant=""  density="compact"  :rules="requiredField"/>
                  
              </v-col>
              <v-col cols="12" class="">
                <v-text-field v-model="cpf"  placeholder="CPF " bg-color="#f5f4f4" rounded variant=""  density="compact"  v-mask="'###.###.###-##'"  :rules="cpfRules"/>
                  
              </v-col>
              <v-col cols="12" class="">
                <v-text-field  v-model="email"  placeholder="Email " bg-color="#f5f4f4" rounded variant=""  density="compact"  :rules="emailRules"/>
                  
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  placeholder="Senha "
                  bg-color="#f5f4f4"
                  rounded
                  variant=""  density="compact" 
                  
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  class="custom-text-field"
                  :rules="requiredField" 
                />
                
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center mt-4">
              <v-col cols="5" class="d-flex justify-center">
                <v-btn :loading="loading" type="submit" class="btn-login rounded-lg" block :disabled="!isFormValid">
                  <template v-slot:default>Cadastrar</template>
                  <template v-slot:loader>
                    <v-progress-circular indeterminate color="white" />
                  </template>
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center new-here-container"> <span>Ainda não faz parte?</span>&nbsp;<router-link class="forgot_password" to="/change-password">Junte-se a nós</router-link> </v-col>
            </v-row>
          </v-form>
        </v-row>

      <v-row v-if="!isMobile" dense align="center" justify="center" class="">
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
                <v-row dense class="">
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="completeName" rounded variant="outlined" density="compact" placeholder="Nome Completo" dense :rules="nomeRules"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="username" rounded variant="outlined" density="compact" placeholder="Usuário" dense :rules="requiredField"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="cpf" rounded variant="outlined" density="compact" placeholder="CPF" dense :rules="cpfRules"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="6">
                    <v-text-field v-model="email" rounded variant="outlined" density="compact" placeholder="Email" dense  :rules="emailRules"/>
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
                      class="custom-text-field"
                      density="compact"
                      :rules="requiredField"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="">
                <v-container>
                  <v-btn :loading="loading" type="submit" class="btn-login">
                    Cadastrar
                    <template v-slot:loader>
                      <v-progress-circular indeterminate color="white"></v-progress-circular>
                    </template>
                  </v-btn>
                </v-container>
              </v-card-actions>
              
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  </v-app>
</template>

<script>
import axios from "@/services/axios.js";
import { useToast } from "vue-toastification";
import { useDisplay } from "vuetify";

export default {
  name: "TwoCardsExample",

  data: () => ({
    smAndDown: false,
    loading: false,
    username: null,
    completeName: null,
    email: null,
    password: null,
    cpf: null,
    showPassword: false,
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
    emailRules: [(v) => (v !== null && v !== undefined && v !== "") || "Obrigatório", (v) => !v || /.+@.+\..+/.test(v) || "E-mail deve ser válido"],
  }),

  computed: {
    isFormValid() {
      return !!(
        this.completeName &&
        this.username &&
        this.cpf &&
        this.email &&
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

    cpfRules() {
      return [(v) => !!v || "Obrigatório", (v) => this.validateCpf(v) || "CPF inválido"];
    },
  },

  methods: {
    validateCpf(cpf) {
      const cpfClean = cpf.replace(/\D/g, "");
      if (cpfClean.length !== 11) return false;
      if (/^(\d)\1+$/.test(cpf)) return false;

      let add = 0;

      for (let i = 0; i < 9; i++) {
        add += parseInt(cpfClean.charAt(i)) * (10 - i);
      }
      let firstDigit = add % 11 < 2 ? 0 : 11 - (add % 11);
      if (firstDigit !== parseInt(cpfClean.charAt(9))) return false;
      add = 0;
      for (let i = 0; i < 10; i++) {
        add += parseInt(cpfClean.charAt(i)) * (11 - i);
      }
      let secondDigit = add % 11 < 2 ? 0 : 11 - (add % 11);
      if (secondDigit !== parseInt(cpfClean.charAt(10))) return false;

      if (cpfClean.length !== 11) return false;
      return true;
    },
    
    async register() {
      const toast = useToast();
      this.loading = true;
      const fields = {
        completeName: this.completeName,
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
  mounted() {
    const display = useDisplay();
    this.smAndDown = display.smAndDown;
  }
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
  background-color: #57a340;
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
  background-color: #75cc54;
  margin-top: -80px;
  margin-left: 1px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.arch-right {
  background-color: #75cc54;
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
  border-color: #05703e;
}

@media (max-width: 768px) {
  ::v-deep(.v-field__outline ) {
  border: 3px solid transparent;
}

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

  ::v-deep(.required .v-label) {
  color: black; /* cor padrão do label */
}

::v-deep(.required .v-label::after) {
  content: '*';
  color: red;
  margin-left: 2px;
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
    height: 20px;
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
