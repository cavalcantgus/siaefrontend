<template>
    <v-app-bar class="navbar align-center justify-space-between">
        <v-row dense>
            <v-col cols="2" class="d-flex align-center">
                <v-img class="logo-img" src="./img/logo (1).svg"></v-img>
                <h2 class="logo-name ml-2">SIAE</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="d-flex justify-end align-center">
                <NotificationMenu :notifications="menu[role.toLowerCase()]?.notifications || []" />
                <ProfileMenu :profileItems="menu[role.toLowerCase()]?.profileItems"></ProfileMenu>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
import NotificationMenu from "./menus/NotificationMenu.vue";
import services from '@/services/utilsFunc.js'
import ProfileMenu from "./menus/ProfileMenu.vue";

export default {
    name: 'NavBar.vue',
    components: {
        NotificationMenu,
        ProfileMenu
    },
    data: () => ({
        menu: {
            admin: {
                notifications: [],
                profileItems: [
                    { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
                    { title: "Dashboard", icon: "mdi-view-dashboard", to: "/admin" },
                    { title: "Sair", icon: "mdi-logout", action: "logout" },
                ],
            },

            cpl: {
                notifications: [],
                profileItems: [
                    { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
                    { title: "Sair", icon: "mdi-logout", action: "logout" },
                ],
            },

            pendente: {
                notifications: [],
                profileItems: [
                    { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
                    { title: "Sair", icon: "mdi-logout", action: "logout" },
                ],
            }
        },

        role: services.getRoleFromToken()
    }),
    methods: {
       async aggregatingNotifications() {
            if(this.menu.admin && this.role.toLowerCase() === 'admin') {
                this.menu.admin.notifications = await services.getPendingUsers()
            } else {
                this.menu.pendente.notifications = []
            }
        }
    },
    mounted() {
        this.aggregatingNotifications()
    }
}
</script>

<style scoped>
.logo-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.logo-name {
  color: #37622a;
  justify-self: flex-start;
}

</style>