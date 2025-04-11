<template>
  <v-app>
    <v-main style="background-color: #f4f6f8">
      <v-container class="fill-height d-flex justify-center align-center">
        <transition name="fade-slide">
          <div class="d-flex flex-column align-center justify-center text-center mb-12" v-if="show" style="height: 300px">
            <h1 class="text-h2 font-weight-bold mb-1 gradient-text" style="color: transparent">OPA! ALGO DEU ERRADO</h1>
            <h2 class="text-subtitle-1 font-weight-regular mb-6" style="color: #7a7a7a"></h2>

            <img src="/img/bad-request.svg" style="height: 300px" />

            <p class="text-body-1 text-center" style="color: #2b2f30">O link de confirmação é inválido ou expirou. Por favor, solicite um novo link.</p>

            <div class="justify-center mt-9">
              <v-btn to="/login" class="rounded-lg px-7 py- text-white text-body-1 font-weight-bold" size="x-large" style="background-color: #57a340; box-shadow: 0 4px 10px #474a48"> Voltar para o login </v-btn>
            </div>
          </div>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Lottie from "lottie-web";
import warning from "@/assets/lottie/warning.json";

export default {
  name: "InvalidToken",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.show = true;
    Lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      animationData: warning,
      renderer: "svg",
      loop: false,
      autoplay: true,
    });
  },
};
</script>

<style scoped>
/* Gradiente no texto do 404 */
.gradient-text {
  background: linear-gradient(90deg, #565855, #0e4147);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Animação de fade e slide */
.fade-slide-enter-active {
  transition: all 0.6s ease;
}
.fade-slide-leave-active {
  opacity: 0;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
