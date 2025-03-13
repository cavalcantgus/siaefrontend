<template>
  <div class="main">
    <NavBar class="navbar"></NavBar>
    <div class="container">
      <CardsTemplate
        main-title="Sistema Integrado de Alimentação Escolar"
        sysTitle="PAA"
        route="/menu-paa"
        width="350px"
        height="250px"
        :customClass="{
          card: 'card',
          sysName: 'sys-name',
          program: 'program',
          accessProgram: 'access-program',
        }"
        @click="route"
      >
      </CardsTemplate>
      <CardsTemplate
        main-title="Sistema Integrado de Alimentação Escolar"
        sysTitle="PNAE"
        route="/menu-pnae"
        width="350px"
        height="250px"
        :customClass="{
          card: 'card',
          sysName: 'sys-name',
          program: 'program',
          accessProgram: 'access-program',
        }"
      >
      </CardsTemplate>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import CardsTemplate from "./template/CardsTemplate.vue";
import services from '@/services/utilsFunc.js'
import { useToast } from "vue-toastification";

export default {
  name: "MenuPnae.vue",
  components: {
    NavBar,
    CardsTemplate,
  },
  data: () => ({
    pendingUsers: 3,
    items: [],
    title1: "PAA",
    title2: "PNAE", 
    role: services.getRoleFromToken()   
  }),
  methods: {
    route() {
      console.log("Chamou o método")
      const toast = useToast()
      console.log(this.role)
      if(this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "cpl") {
        this.$router.push("/menu-pnae");
      } else {
        toast.error("Você não tem permissões para acessar esta página.")
      }
    }
  },
};
</script>

<style scoped>
.navbar {
  align-items: center;
  margin: 0;
  justify-content: flex-start;
}

.container {
  display: flex;
  flex-direction: row;
  margin-top: 0;
  width: 100vw;
  height: 100vh;
  padding-left: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
}

.card {
  margin-top: 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.sys-name {
  font-size: 0.6rem ;
  font-weight: 400;
}

.program {
  margin-left: 20px;
  margin-top: 140px;
  justify-self: flex-start;
}

.access-program {
  display: flex;
  width: auto; 
  justify-self: flex-end;
  margin-right: 15px;
  margin-top: -30px;
  background-color: #ffffff;
  color: #57a340;
  font-weight: bold;
  padding: 5px 10px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.access-program:hover {
  transform: scale(1.1);
}

</style>
