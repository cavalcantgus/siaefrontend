<template>
  <NavBar></NavBar>

  <v-layout>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app width="260" expand-on-hover rail :permanent="$vuetify.display.mdAndUp" temporary>
      <v-list>
        <v-list-item title="Usuário"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main class="pa-5">
      <v-container>
        <h1 class="dashboard-title">Dashboard de Administrador</h1>
        <v-row justify="center mt-5">
          <v-col cols="5">
            <v-text-field class="" density="compact" variant="outlined" hide-details rounded label="Pesquisar" :append-inner-icon="'mdi-magnify'" clearable />
          </v-col>
        </v-row>
        <v-row justify="start">
          <v-col cols="auto" class="pa-0 mr-4">
            <span class="status-text">Usuários</span>
            <div class="d-flex align-center">
              <v-icon small color="primary" left>mdi-account-check</v-icon>
              <div class="d-flex flex-column ml-3 status-text align-start">
                <span class="text-xs font-weight-medium">
                  {{ this.users.length }}
                  {{ this.users.length === 1 ? "Usuário" : "Usuários" }} cadastrado(s)
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-data-table :items="filteredUsers" :headers="headers" class="fill-height d-flex flex-column mt-9" fixed-header :items-per-page="-1" mobile-breakpoint="600">
          <template v-slot:[`item.options`]="{ index }">
            <v-select
              style="position: absolute; margin-top: -20px"
              placeholder="Selecione algo"
              max-width="160px"
              v-model="this.pendingUsersList[index].selectedRole"
              min-width="160px"
              bg-color="blue"
              :items="options"
              item-title="title"
              item-value="value"
              density="compact"
              variant="outlined"
              rounded
              class="elevation-0"
              item-color="green"
              @update:model-value="handleSelectionChange(index, $event)"
            >
            </v-select>

          </template>
          <template v-slot:[`item.save`]="{item, index }">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn icon size="x-small" :color="selectedRow === index ? 'green':'grey'" v-bind="props" style="align-items: center;" @click="onSelectRow(item)">
                    <v-icon>mdi-check-bold</v-icon>
                </v-btn>
              </template>
              <span>Clique para salvar a alteração</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../NavBar.vue";

export default {
  name: "DashboardAdmin",
  components: {
    NavBar,
  },
  data: () => ({
    selectedRow: null,
    selectedValue: null,
    selectedItem: {},
    drawer: true,
    users: [],
    pendingUsersList: [],
    headers: [
      { title: "Nome do Usuário", align: "center", sortable: true, value: "username" },
      { title: "Email do Usuário", align: "center", sortable: true, value: "email" },
      { title: "Status", align: "center", sortable: true, value: "roles" },
      { title: "Atualizar", align: "center", sortable: true, value: "options" },
      { text: "Salvar", align: "center", value: "save", width: "50px" },
    ],
    options: [
      { title: "PENDENTE", value: "PENDENTE" },
      { title: "ADMIN", value: "ADMIN" },
      { title: "CPL", value: "CPL" },
      { title: "PRODUTOR", value: "PRODUTOR" },
      { title: "SECRETÁRIO", value: "SECRETÁRIO" },
    ],
  }),
  computed: {
    filteredUsers() {
      return this.pendingUsersList.map((user) => ({
        ...user,
        roles: user.roles.map((role) => role.name).join(),
        selected: false,
        selectedRole: "",
      }));
    },
  },
  methods: {
    handleSelectionChange(index, value) {
      console.log(value);
      if (this.selectedRow !== null && this.selectedRow !== index) {
        console.log("Caiu na condição");
        this.pendingUsersList[this.selectedRow].selected = false;
        this.pendingUsersList[this.selectedRow].selectedRole = "Selecione algo";
        console.log(this.selectedRow);
        console.log(this.pendingUsersList[this.selectedRow].selected);
      }

      this.selectedRow = index;
      this.pendingUsersList[this.selectedRow].selected = true;
      this.pendingUsersList[this.selectedRow].selectedRole = value;
      this.selectedValue = value
      console.log(index);
      console.log(this.pendingUsersList[index].selected);
    },

    async getPendingUsers() {
      try {
        const response = await axios.get("/admin/pending-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.pendingUsersList = response.data;
      } catch (error) {
        console.error("Error: ", error);
      }
    },

    async getUsers() {
      try {
        const { data } = await axios.get("public/users");
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser(fields) {
        console.log("ID: ", fields.user.id)
        try {
            const response = await axios.put(`public/users/${fields.user.id}`, fields)
            if(response !== 200) {
                throw new Error("Aconteceu um erro")
            }
        } catch (error) {
            console.error("Erro: ", error)
        }
    },
    
    onSelectRow(row) {
        this.selectedItem = JSON.parse(JSON.stringify({...row}))
        const fields = {
            user: this.selectedItem,
            role: this.selectedValue
        }
        this.updateUser(fields)
    }
  },
  mounted() {
    this.getPendingUsers(), this.getUsers();
  },
};
</script>

<style scoped>
/* Ajuste do título para ser responsivo */
.dashboard-title {
  color: #57a340;
  margin-top: 10px;
  padding: 20px;
  font-size: 3rem;
  text-align: center;
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem; /* Reduz tamanho no celular */
  }
}

.v-layout {
  min-height: 100vh;
}

.v-main {
  display: flex;
  flex-direction: column;
}

.text-xs {
  font-size: 12px;
}

.status-text {
  font-size: 14px;
  line-height: 1.1;
  font-weight: bold;
}
</style>
