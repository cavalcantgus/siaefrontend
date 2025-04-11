<template>
  <v-app>
    <v-main class="d-flex justify-center align-center" style="background-color: #f4f6f8">
      <v-container class="d-flex justify-center">
        <v-card max-width="600" class="elevation-10 rounded-xl pa-6" style="background-color: #ffffff">
          <v-card-title class="text-h5 font-weight-bold text-center" style="color: #57a340"> Quase lá! Verifique seu e-mail </v-card-title>

          <v-card-text class="mt-4 text-body-1 text-center text-grey-darken-1"> Nós enviamos um e-mail de confirmação para <strong>{{ email }}</strong>. </v-card-text>

          <v-card-text class="text-body-2 text-center mt-2 text-grey-darken-2"> Clique no link do e-mail para completar seu cadastro. Caso não encontre o e-mail, verifique sua caixa de spam. </v-card-text>

          <v-card-text class="text-body-2 text-center mt-4 text-grey-darken-2"> Ainda não recebeu? </v-card-text>

          <v-card-actions class="justify-center mt-3">
            <v-btn class="px-7 py- text-white text-body-1 font-weight-bold" style="background-color: #57a340; box-shadow: 0 4px 10px #474a48"> Reenviar link </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
    data: () => ({
        name: "MailVerification"

    }),
    computed: {
        email() {
            return this.$route.query.email
        }
    },
    beforeRouteEnter(to, from, next) {
        const canAccess = localStorage.getItem("canAccessEmailVerification")

        if(canAccess === "true") {
            localStorage.removeItem("canAccessEmailVerification")
            next()
        } else {
            next('/login')
        }
    }
    
}
</script>
