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
    { path: '/', redirect: '/login'},
];

const router = createRouter({
    // Use o base correto para o GitHub Pages
    history: createWebHistory('/siaefrontend/'),  // Aqui você coloca o caminho base
    routes,
});

export default router;
