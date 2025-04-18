<template>
    <v-app-bar class="navbar elevation-5 px-4" flat>
      <div class="d-flex align-center" style="width: 20%;">
        <v-img class="logo-img" src="./img/logo (1).svg" />
        <v-toolbar-title class="logo-name ml-2">SIAE</v-toolbar-title>
      </div>
  
      <v-spacer></v-spacer>
  
      <div class="d-flex align-center gap-4">
        <NotificationMenu :notifications="menu[role.toLowerCase()]?.notifications || []" />
        <ProfileMenu :profileItems="menu[role.toLowerCase()]?.profileItems" />
      </div>
    </v-app-bar>
  </template>
  
<script>
import NotificationMenu from "./menus/NotificationMenu.vue";
import services from "@/services/utilsFunc.js";
import ProfileMenu from "./menus/ProfileMenu.vue";

export default {
  name: "NavBar.vue",
  components: {
    NotificationMenu,
    ProfileMenu,
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
      },

      central: {
        notifications: [],
        profileItems: [
          { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
          { title: "Sair", icon: "mdi-logout", action: "logout" },
        ],
      },

      pagamento: {
        notifications: [],
        profileItems: [
          { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
          { title: "Sair", icon: "mdi-logout", action: "logout" },
        ],
      },

      produtor: {
        notifications: [],
        profileItems: [
          { title: "Meu Perfil", icon: "mdi-account-outline", to: "/profile" },
          { title: "Sair", icon: "mdi-logout", action: "logout" },
        ],
      },
    },

    role: services.getRoleFromToken(),
  }),
  methods: {
    async aggregatingNotifications() {
      if (this.menu.admin && this.role.toLowerCase() === "admin") {
        this.menu.admin.notifications = await services.getPendingUsers();
      } else if (this.menu.pagamento && this.role.toLowerCase() === "pagamento") {
        this.menu.pagamento.notifications = await services.getNotificationsByUser();
      } else if (this.menu.produtor && this.role.toLowerCase() === "produtor") {
        this.menu.produtor.notifications = await services.getNotificationsByUser();
      } else {
        this.menu.pendente.notifications = [];
      }
    },
  },
  mounted() {
    this.aggregatingNotifications();
  },
};
</script>

<style scoped>
.logo-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logo-name {
  color: #f5f5f5;
  font-size: 22px;
  font-weight: bold;
}

.gap-4 {
  gap: 1rem;
}

.navbar {
  background-color: #3d7c28;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>