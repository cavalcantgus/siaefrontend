import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/login', name: 'Login', component: () => import("@/components/login/Login.vue")},
    { path: '/admin', name: 'Admin', component: () => import("@/components/admin/DashboardAdmin.vue")},
    { path: '/menu', name: 'Menu', component: () => import("@/components/Menu.vue")},
    { path: '/register', name: 'Register', component: () => import("@/components/cadastros/Register.vue")},
    { path: '/menu-pnae', name: 'Pnae', component: () => import("@/components/menus/MenuPnae.vue")},
    { path: '/cadastro-produtor', name: 'Produtor', component: () => import("@/components/cadastros/produtor/Produtor.vue")},
    { path: '/', redirect: '/login'},

]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export default router