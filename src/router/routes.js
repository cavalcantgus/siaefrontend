import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", name: "Login", component: () => import("@/components/login/Login.vue") },
  { path: "/admin", name: "Admin", component: () => import("@/components/admin/DashboardAdmin.vue"), meta: { requiresAuth: true } },
  { path: "/menu", name: "Menu", component: () => import("@/components/Menu.vue"), meta: { requiresAuth: true } },
  { path: "/register", name: "Register", component: () => import("@/components/cadastros/Register.vue"), meta: { requiresAuth: false } },
  { path: "/menu-pnae", name: "Pnae", component: () => import("@/components/menus/MenuPnae.vue"), meta: { requiresAuth: true } },
  { path: "/cadastro-produtor", name: "Produtor", component: () => import("@/components/cadastros/produtor/Produtor.vue"), meta: { requiresAuth: true } },
  { path: "/cadastro-produto", name: "Produto", component: () => import("@/components/cadastros/produto/Produto.vue"), meta: { requiresAuth: true } },
  { path: "/pesquisa-de-preco", name: "PesquisaDePreco", component: () => import("@/components/cadastros/pesquisaDePreco/PesquisaDePreco.vue"), meta: { requiresAuth: true } },
  { path: "/pauta-da-chamada", name: "PautaDaChamada", component: () => import("@/components/cadastros/pautaDaChamada/PautaDaChamada.vue"), meta: { requiresAuth: true } },
  { path: "/projeto-de-venda", name: "ProjetoDeVenda", component: () => import("@/components/cadastros/projetoDeVenda/ProjetoDeVenda.vue"), meta: { requiresAuth: true } },
  { path: "/comprovante", name: "Entrega", component: () => import("@/components/cadastros/entrega/Entrega.vue"), meta: { requiresAuth: true } },
  { path: "/contrato", name: "Contrato", component: () => import("@/components/cadastros/contratos/RelacoesContratuais.vue"), meta: { requiresAuth: true } },
  { path: "/relatorio", name: "Relatorio", component: () => import("@/components/cadastros/relatorios/Relatorios.vue"), meta: { requiresAuth: true } },
  { path: "/ata", name: "Ata", component: () => import("@/components/cadastros/ata/Ata.vue"), meta: { requiresAuth: true } },
  { path: "/pagamento", name: "Pagamento", component: () => import("@/components/cadastros/pagamento/Pagamento.vue"), meta: { requiresAuth: true } },
  { path: "/email-verification", name: "MailVerification", component: () => import("@/components/mailTemplates/MailVerification.vue"), meta: { requiresAuth: false } },
  { path: "/confirmed-email", name: "ConfirmEmail", component: () => import("@/components/mailTemplates/ConfirmEmail.vue"), meta: { requiresAuth: false } },
  {
    path: "/invalid-token",
    name: "InvalidToken",
    component: () => import("@/components/errors/InvalidToken.vue"),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      if (to.query.reason === "expired") {
        next(); // libera o acesso
      } else {
        next("/login"); // redireciona pra login se acessar manualmente
      }
    },
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory("/siaefrontend/"), // Ajuste do caminho base
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Verifica se o usuário tem um token válido

  if (to.meta.requiresAuth && !token) {
    next("/login"); // Redireciona para login se tentar acessar uma página protegida sem token
  } else {
    next(); // Permite a navegação normal
  }
});

export default router;
