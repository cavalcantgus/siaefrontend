import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/login', name: 'Login', component: () => import("@/components/login/Login.vue")},
    { path: '/admin', name: 'Admin', component: () => import("@/components/admin/DashboardAdmin.vue")},
    { path: '/menu', name: 'Menu', component: () => import("@/components/Menu.vue")},
    { path: '/register', name: 'Register', component: () => import("@/components/cadastros/Register.vue")},
    { path: '/menu-pnae', name: 'Pnae', component: () => import("@/components/menus/MenuPnae.vue")},
    { path: '/cadastro-produtor', name: 'Produtor', component: () => import("@/components/cadastros/produtor/Produtor.vue")},
    { path: '/cadastro-produto', name: 'Produto', component: () => import("@/components/cadastros/produto/Produto.vue")},
    { path: '/pesquisa-de-preco', name: 'PesquisaDePreco', component: () => import("@/components/cadastros/pesquisaDePreco/PesquisaDePreco.vue")},
    { path: '/pauta-da-chamada', name: 'PautaDaChamada', component: () => import("@/components/cadastros/pautaDaChamada/PautaDaChamada.vue")},
    { path: '/projeto-de-venda', name: 'ProjetoDeVenda', component: () => import("@/components/cadastros/projetoDeVenda/ProjetoDeVenda.vue")},
    { path: '/comprovante', name: 'Entrega', component: () => import("@/components/cadastros/entrega/Entrega.vue")},
    { path: '/contrato', name: 'Contrato', component: () => import("@/components/cadastros/contratos/RelacoesContratuais.vue")},
    { path: '/', redirect: '/login'},
];

const router = createRouter({
    // Use o base correto para o GitHub Pages
    history: createWebHistory('/siaefrontend/'),  // Aqui você coloca o caminho base
    routes,
});

export default router;
