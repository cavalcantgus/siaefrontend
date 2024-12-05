import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/login', name: 'Login', component: () => import("@/components/login/Login.vue")},
    { path: '/admin', name: 'Admin', component: () => import("@/components/admin/DashboardAdmin.vue")},
    { path: '/user', name: 'User', component: () => import("@/components/admin/User.vue")},
    { path: '/', redirect: '/login'},

]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export default router