<template>
  <v-app>
    <v-main class="d-flex justify-center align-center" style="background-color: #f4f6f8">
      <v-container class="d-flex justify-center">
        <v-card max-width="600" class="elevation-10 rounded-xl pa-6" style="background-color: #ffffff">
          <v-card-title class="text-h5 font-weight-bold text-center" style="color: #57a340"> Tudo certo! Seu e-mail foi confirmado </v-card-title>

          <v-card-text class="mt-4 text-body-1 text-center text-grey-darken-1"> Seja muito bem-vindo ao <strong>SIAE</strong>! Agora você já pode acessar todos os recursos da nossa plataforma. </v-card-text>

          <v-card-text class="text-body-2 text-center mt-2 text-grey-darken-2"> Estamos felizes em ter você com a gente. Aproveite a experiência! </v-card-text>

          <div ref="lottieContainer" style="width: 150px; height: 150px; margin: auto"></div>

          <v-card-actions class="justify-center mt-5">
            <v-btn to="/login" class="px-7 text-white text-body-1 font-weight-bold" style="background-color: #57a340; box-shadow: 0 4px 10px #474a48"> Ir para o login </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Lottie from "lottie-web";
import confetti from "canvas-confetti";

import successCheck from "@/assets/lottie/success-check.json";
export default {
  data: () => ({
    name: "ConfirmEmail",
  }),
  mounted() {
    Lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      animationData: successCheck,
      renderer: "svg",
      loop: false,
      autoplay: true,
    }),
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 1000);
  },

  beforeRouteEnter(to, from, next) {
    const token = to.query.token

    if(token) {
        next()
    }
    else {
        next('/login')
    }
  },
};
</script>
