<template>
  <v-app id="inspire">
    <v-app-bar color="#218a21" class="d-flex align-center justify-space-between px-10">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

      <v-toolbar-title>SIAE</v-toolbar-title>

      <v-avatar size="40" class="ml-auto">
        <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64">
          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>

        <div>{{ user.user?.username }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <!-- <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" :prepend-icon="icon" :title="text" link></v-list-item>
      </v-list> -->
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-sheet color="#57a340" class="d-flex align-center justify-center pa-6 rounded-t-xl elevation-8" style="background: linear-gradient(135deg, #57a340, #3b802e)">
          <div>
            <h1 class="text-white text-h4 mb-1">Olá, {{ user.user.username }}</h1>
            <p class="text-white text-subtitle-2">Bem-vindo ao seu perfil</p>
          </div>
        </v-sheet>
        <v-card class="pa-8 elevation-8" style="border-radius: 0px 0px 8px 8px">
          <v-row>
            <v-col cols="12" sm="10">
              <v-card elevation="4" class="pa-6 rounded-xl text-start" style="background-color: #f5f5f5">
                <v-row align="center">
                  <v-col cols="12" md="3" class="text-center">
                    <v-avatar size="100" class="elevation-3" style="border: 2px solid #4caf50">
                      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Foto de perfil" />
                    </v-avatar>
                    <h3 class="mt-3 font-weight-bold">{{ user.user.username }}</h3>
                    <span class="text-subtitle-2 text-grey">Produtor</span>
                  </v-col>

                  <v-col cols="12" md="9">
                    <v-row>
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-icon color="green darken-2" left>mdi-account</v-icon>
                        <strong>Nome:</strong><br />
                        {{ user.user.username }}
                      </v-col>

                      <v-col cols="12" sm="6" class="pb-0">
                        <v-icon color="green darken-2" left>mdi-email</v-icon>
                        <strong>Email:</strong><br />
                        {{ user.user.email }}
                      </v-col>

                      <v-col cols="12" sm="6" class="pt-4">
                        <v-icon color="green darken-2" left>mdi-phone</v-icon>
                        <strong>Telefone:</strong><br />
                        (98) 9 7400-8229
                      </v-col>

                      <v-col cols="12" sm="6" class="pt-4">
                        <v-icon color="green darken-2" left>mdi-map-marker</v-icon>
                        <strong>Localização:</strong><br />
                        São Luís - MA, Brasil
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2" class="">
              <v-card elevation="4" class="rounded-xl px-5 py-8 text-start" style="background-color: #eaf6ea">
                <v-row class="align-center">
                  <v-icon size="small" color="green darken-2" class="mr-2">mdi-calendar</v-icon>
                  <div>
                    <div class="text-caption font-weight-bold">Cadastrado desde:</div>
                    <div class="text-body-2">17/05/2025</div>
                  </div>
                </v-row>

                <v-divider class="my-5"></v-divider>

                <v-row class="align-center">
                  <v-icon size="small" color="green darken-2" class="mr-2">mdi-check-circle</v-icon>
                  <div>
                    <div class="text-caption font-weight-bold">Perfil Ativo:</div>
                    <div class="text-body-2">Sim</div>
                  </div>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-spacer style="height: 50px"></v-spacer>
          <v-row>
            <v-col cols="12" sm="12" md="4" v-for="(item, index) in sections" :key="item.id">
              <v-card elevation="5" rounded="xl" max-height="250px">
                <div style="background-color: #3d6e26">
                  <v-card-title class="text-white">{{ item.text1 }}</v-card-title>
                </div>
                <v-row class="mb-5 mt-2 pl-1 ml-4">
                  <v-col cols="6" class="pa-0 mr-4">
                    <span class="status-text">Total de Projetos</span>
                    <div class="d-flex align-center">
                      <v-icon small color="primary" left>mdi-account-check</v-icon>
                      <div class="d-flex flex-column ml-3 status-text align-start">
                        <span class="text-xs font-weight-medium"> {{ item.items.length }} {{ item.items.length === 1 ? item.text2 : item.text3 }} {{ item.text4 }}(s) </span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div style="max-height: 120px; overflow-y: auto" class="scrollbar-custom">
                      <v-data-table-virtual :fixed-header="true" hover density="compact" :items="item.items" :headers="item.headers" class="text-xs elevation-1 rounded-b-xl custom-table" item-value="name">
                        <template v-slot:[`item.visualizar`]="{ item }">
                          <v-icon @click="previewSection(index, item)">mdi-eye</v-icon>
                        </template>
                      </v-data-table-virtual>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-dialog v-model="dialog.visualizar" max-width="90vw" max-height="100vh" persistent>
          <v-card height="100%" class="d-flex flex-column elevation-0" color="transparent">
            <v-card-title class="sticky-title title-border">
              Pré-visualização do Relatório
              <v-spacer></v-spacer>
              <v-btn icon class="btn-close elevation-0" @click="dialog.visualizar = false">
                <v-icon prepend> mdi-close </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="flex-grow-1 pa-0">
              <iframe v-if="pdfUrl" :src="pdfUrl" style="border: none; width: 100%; height: 80vh"></iframe>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "@/services/axios.js";
import utilsFunc from "../../services/utilsFunc";

export default {
  data: () => ({
    user: utilsFunc.getUser(),
    dialog: {
      visualizar: false,
    },
    pdfUrl: null,
    projects: [],
    produtor: {},
    entregas: [],
    expanded: true,
    headers: [
      { title: "Id", align: "center", sortable: true, value: "id" },
      { title: "Total", align: "center", sortable: true, value: "total" },
      { title: "Data", align: "center", sortable: true, value: "dataProjeto" },
    ],

    sections: [
      {
        title: "Meus Projetos",
        text1: "Total de Projetos",
        text2: "Projeto",
        text3: "Projetos",
        text4: "cadastrado",
        items: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Total", value: "total" },
          { title: "Data", value: "dataProjeto" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },
      {
        title: "Minhas Entregas",
        text1: "Total de Entregas",
        text2: "Entrega",
        text3: "Entregas",
        text4: "cadastrada",
        items: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Nome", value: "total" },
          { title: "Status", value: "dataDaEntrega" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },

      {
        title: "Meus Pagamentos",
        text1: "Total de Pagamentos",
        text2: "Pagamento",
        text3: "Pagamentos",
        text4: "cadastrado",
        items: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Total", value: "total" },
          { title: "Data", value: "dataProjeto" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },
    ],

    drawer: false,
  }),
  methods: {
    previewSection(index, item) {
      const section = this.sections[index];
      if (section.title === "Meus Projetos") {
        this.openProjetoPreview(item);
      } else if (section.title === "Minhas Entregas") {
        this.openEntregaPreview(item);
      } else if (section.title === "Meus Pagamentos") {
        this.openPagamentoPreview(item);
      }
    },

    async findProductorByUser() {
      try {
        const response = await axios.get('public/produtores')
        console.log(response.data)
        console.log(this.user)
        this.produtor = response.data.find((p) => p.cpf === this.user.user.cpf)
        console.log(this.produtor.id)
      } catch (error) {
        console.error(error)
      }
    },

    async openProjetoPreview(item) {
      console.log(item)
      try {
        const response = await axios.get(`/public/projetos/relatorio/visualize/${item.id}`, {
          responseType: "blob", // MUITO IMPORTANTE
        });

        const blob = response.data;
        this.pdfUrl = URL.createObjectURL(blob) + "#zoom=100";
        this.dialog.visualizar = true;
      } catch (error) {
        console.error("Erro ao buscar ou exibir PDF:", error);
      }
    },

    async openEntregaPreview(item) {
      console.log(item)
      try {
        const response = await axios.get(`/public/comprovantes/relatorio/visualize/${item.id}`, {
          responseType: "blob", // MUITO IMPORTANTE
        });

        const blob = response.data;
        this.pdfUrl = URL.createObjectURL(blob) + "#zoom=100";
        this.dialog.visualizar = true;
      } catch (error) {
        console.error("Erro ao buscar ou exibir PDF:", error);
      }
    },

    async openPagamentoPreview(item) {
      console.log(item)
      try {
        const response = await axios.get(`/public/pagamentos/relatorio/visualize/${item.id}`, {
          responseType: "blob", // MUITO IMPORTANTE
        });

        const blob = response.data;
        this.pdfUrl = URL.createObjectURL(blob) + "#zoom=100";
        this.dialog.visualizar = true;
      } catch (error) {
        console.error("Erro ao buscar ou exibir PDF:", error);
      }
    },

    async getProjetoPerProductor() {
      try {
        const { data } = await axios.get(`public/projetos/projeto/${this.produtor.id}`);
        this.projects.push(data);
        this.sections[0].items = this.projects;
        console.log("projetos", this.projects);
      } catch (error) {
        console.error(error);
      }
    },

    async getEntregasPerProductor() {
      try {
        const { data } = await axios.get(`public/comprovantes/comprovante/${this.produtor.id}`);
        this.entregas = data;
        this.sections[1].items = this.entregas;
        console.log("entregas", this.entregas);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    try {
      await this.findProductorByUser();
      this.getProjetoPerProductor();
      this.getEntregasPerProductor();
    } catch(error) {
      console.error(error)
    }
  },
};
</script>

<style>
.sticky-title,
.sticky-icon {
  display: flex;
  font-weight: bold !important;
  background-color: #ffffff;
  top: 0 !important; /* Distância do topo da página */
  color: #0f0f0f;
  justify-content: flex-end;
  align-items: flex-end;
}

.scrollbar-custom {
  scrollbar-width: none; /* Firefox */
  scrollbar-color: #3d6e26 #e0e0e0; /* Firefox */
}

.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 8px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #3d6e26;
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #2d511c;
}

.custom-table thead th {
  background: #4caf50; /* verde */
  color: rgb(14, 128, 75);
  font-weight: bold;
}
.custom-table tbody tr:nth-child(odd) {
  background-color: #f1f8e9; /* verde bem claro */
}

.custom-table td {
  color: #2e7d32; /* verde escuro */
  font-size: 0.7rem;
  text-align: start;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  gap: 0.6rem;
  row-gap: 2px;
}

:deep(.v-list-group__wrap) {
  min-height: 10px; /* ajuste a altura conforme necessário */
  overflow-y: auto; /* ativa rolagem se o conteúdo for maior */
}

/* Estilo adicional para o item ativo do list-group */
:deep(.v-list-group--active .v-list-group__wrap) {
  min-height: 10px;
}

::v-deep(.v-list-item__subtitle) {
  color: blue;
  font-size: 0.6rem !important;
  height: 10px !important; /* Ajuste a altura conforme necessário */
  overflow-y: auto; /* Ativa rolagem se o conteúdo for maior */
}

.status-text {
  font-size: 12px;
  line-height: 1.1;
}

.text-xs {
  font-size: 12px;
}
</style>
