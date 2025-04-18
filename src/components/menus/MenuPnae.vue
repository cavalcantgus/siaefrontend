<template>
  <div class="main">
    <NavBar class="navbar"></NavBar>
    <BtnComeBack></BtnComeBack>
    <div class="container">
      <v-row dense class="justify-start" align="center" wrap>
        <v-col v-for="(card, index) in cardTitles" :key="index" cols="12" sm="6" md="3" lg="3" xl="3">
          <CardsTemplate
            class="txt_program"
            :key="index"
            :title="card.title"
            route="/menu-pnae"
            width="250px"
            height="150px"
            :customClass="{
              card: 'card',
              sysName: 'sys-name',
              programName: 'program-name',
              accessCard: 'access-card',
            }"
            :onClick="() => route(card.route)"
          ></CardsTemplate>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavBar from "../NavBar.vue";
import CardsTemplate from "../template/CardsTemplate.vue";
import BtnComeBack from "../template/BtnComeBack.vue";
import services from "@/services/utilsFunc.js";
import { useToast } from "vue-toastification";

export default {
  name: "MenuPnae.vue",
  components: {
    NavBar,
    CardsTemplate,
    BtnComeBack,
  },
  data: () => ({
    pendingUsers: 3,
    items: [],
    cardTitles: [
      { title: "PRODUTORES", route: "/cadastro-produtor" },
      { title: "PRODUTOS", route: "/cadastro-produto" },
      { title: "PESQUISA DE PREÇO", route: "/pesquisa-de-preco" },
      { title: "PAUTA DA CHAMADA", route: "/pauta-da-chamada" },
      { title: "PROJETO DE VENDA", route: "/projeto-de-venda" },
      { title: "CRONOGRAMA DE ENTREGA", route: "/cadastro-produtor" },
      { title: "COMPROVANTE DE RECEBIMENTO", route: "/comprovante" },
      { title: "CONTRATOS", route: "/contrato" },
      { title: "RELATÓRIOS", route: "/relatorio" },
      { title: "ATAS", route: "/ata" },
      { title: "PAGAMENTOS", route: "/pagamento" },
    ],
    role: services.getRoleFromToken(),
  }),
  methods: {
    route(route) {
      console.log("Chamou o método");
      const toast = useToast();
      console.log(this.role);

      switch (route) {
        case "/cadastro-produtor":
          if (this.role.toLowerCase() === "admin") {
            this.$router.push("/cadastro-produtor");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/cadastro-produto":
          if (this.role.toLowerCase() === "admin") {
            this.$router.push("/cadastro-produto");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/pesquisa-de-preco":
          if (this.role.toLowerCase() === "admin") {
            this.$router.push("/pesquisa-de-preco");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/pauta-da-chamada":
          if (this.role.toLowerCase() === "admin") {
            this.$router.push("/pauta-da-chamada");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/projeto-de-venda":
          if (this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "cpl") {
            this.$router.push("/projeto-de-venda");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/comprovante":
          if (this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "central") {
            this.$router.push("/comprovante");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/contrato":
          if (this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "cpl") {
            this.$router.push("/contrato");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/relatorio":
          if (this.role.toLowerCase() === "admin") {
            this.$router.push("/relatorio");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/ata":
          if (this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "cpl") {
            this.$router.push("/ata");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        case "/pagamento":
          if (this.role.toLowerCase() === "admin" || this.role.toLowerCase() === "pagamento") {
            this.$router.push("/pagamento");
          } else {
            toast.error("Você precisa de permissão de Administrador para acessar essa página.");
          }
          break;

        default:
          toast.error("Rota inválida.");
      }
    },
  },
  async mounted() {
    console.log("Notificacoes: ", await services.getNotificationsByUser())
  }
};
</script>

<style scoped>
.navbar {
  align-items: center;
  margin: 0;
  justify-content: flex-start;
}

:deep(.container) {
  display: flex;
  flex-direction: row;
  margin-top: 10;
  width: 100vw;
  height: 100vh;
  padding-left: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
}

.card {
  display: flexbox;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.sys-name {
  font-size: 0.6rem;
  font-weight: 600;
}

.programName {
  margin-top: 100px;
  margin-left: 0;
  height: 20px;
  justify-self: center;
  font-size: 1rem;
}

.access-program {
  background-color: #ffffff;
  color: #57a340;
  font-weight: bold;
  width: 100%;
  max-height: 30px;
  justify-self: center;
  margin-top: 30px;
  margin-right: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.access-program:hover {
  transform: scale(0.9);
}
</style>
