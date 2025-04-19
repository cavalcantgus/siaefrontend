<template>
  <v-app id="inspire" style="width: 100vw; overflow-x: hidden;">
    <v-main :style="{ backgroundColor: isMobile ? '#ffffff' : '#e6f7e1'}">
      <v-img v-if="isMobile" src="./img/campo.jpg" :height="isMobile ? '252px' : '320px'" cover style="width: 100%"></v-img>
      <v-container class="py-8 pa-0" >
        <v-img v-if="!isMobile" src="./img/campo.jpg" :height="isMobile ? '252px' : '320px'" cover class="position-absolute" style="top: 0; left: 0; right: 0; z-index: 0; filter: none"></v-img>

        <v-sheet v-if="isMobile" color="#57a340" class="elevation-8" style="background: rgb(87, 163, 64); position: absolute; top:0; left: 0; right: 0; height: 70px;">
          <v-row align="center" style="height: 100px;">
            <!-- Botão do menu -->
            <v-col class="d-flex justify-center ml-n2">
              <v-btn icon color="transparent" class="elevation-0">
                <v-icon size="large">mdi-menu</v-icon>
              </v-btn>
            </v-col>

            <!-- Título centralizado -->
            <v-col class="d-flex justify-center">
              <span class="text-h5 font-weight-bold">SIAE</span>
            </v-col>

            <!-- Botão de notificação -->
            <v-col class="d-flex justify-center">
              <NotificationMenu :notifications="[]"></NotificationMenu>
            </v-col>
          </v-row>

          <v-row class="align-center" no-gutters>
            <v-col cols="12" md="3" class="d-flex justify-center justify-md-start">
              <v-avatar size="200" class="elevation-4 d-none d-sm-flex ml-6" style="border: 2px solid #ffffff; margin-top: 10px; margin-bottom: -120px; z-index: 1; display: flex; align-items: center; justify-content: center; background-color: #444444">
                <v-icon size="120" color="white"> mdi-account </v-icon>
              </v-avatar>

              <v-avatar size="150" class="d-sm-none mt-12" style="border: 2px solid #ffffff; background-color: #444444; box-shadow: 0px 2px 7px #444444;">
                <v-icon size="50" color="white"> mdi-account </v-icon>
              </v-avatar>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- v-sheet com conteúdo visível acima da imagem -->
        <v-sheet v-if="!isMobile" color="#57a340" class="pa-6 rounded-t-lg elevation-8" style="background: rgba(87, 163, 64, 0.7); position: relative; z-index: 1; top:0; left: 0; right: 0;">
          <v-row class="align-center justify-space-between">
            <!-- Botão do menu -->
            <v-col cols="2" md="1">
              <v-btn icon color="transparent" class="elevation-0">
                <v-icon size="large">mdi-menu</v-icon>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <!-- Título centralizado -->
            <v-col cols="6" md="auto" class="text-center text-md-left">
              <span class="text-h5 font-weight-bold">SIAE</span>
            </v-col>

            <!-- Botão de notificação -->
            <v-col cols="1" md="1" class="">
              <NotificationMenu :notifications="[]"></NotificationMenu>
            </v-col>
          </v-row>

          <v-row class="align-center" no-gutters>
            <v-col cols="12" md="3" class="d-flex justify-center justify-md-start">
              <!-- Avatar responsivo -->
              <v-avatar size="200" class="elevation-4 d-none d-sm-flex ml-6" style="border: 2px solid #ffffff; margin-top: 10px; margin-bottom: -120px; z-index: 1; display: flex; align-items: center; justify-content: center; background-color: #444444">
                <v-icon size="120" color="white"> mdi-account </v-icon>
              </v-avatar>

              <!-- Avatar para mobile, com margem superior ajustada -->
              <v-avatar size="80" class="elevation-4 d-sm-none" style="border: 2px solid #ffffff; margin-top: 100px; margin-bottom: -120px; z-index: 1; position: absolute; background-color: #444444">
                <v-icon size="50" color="white"> mdi-account </v-icon>
              </v-avatar>
            </v-col>

            <v-col cols="12" md="5" class="mb-md-8 text-center text-md-left mr-md-12 mb-9">
              <h1 class="font-weight-regular username" style="text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.6)">Olá, {{ user?.user?.username || "Não informado" }}</h1>
              <p class="text-h6 font-weight-regular welcome" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7)">Bem-vindo ao seu perfil</p>
            </v-col>
          </v-row>
        </v-sheet>

        <v-card color="#ffffff" :elevation="isMobile ? 0 : 8" class="pa-8" style="border-radius: 0px 0px 8px 8px">
          <v-row class="d-flex justify-md-end justify-start" align="center">
            <v-col v-if="!isMobile" cols="12" md="2" class="mb-md-n16 d-flex">
              <div class="flex-column text-md-start mb-md-n16 mt-4">
                <h1 class="font-weight-bold mb-1" style="font-size: 18px">{{ user?.user?.username || "Não informado" }}</h1>
                <span class="text-subtitle-2 text-grey">{{ user?.user?.role || "Sem cargo"}}</span>
              </div>
            </v-col>
            <v-row v-if="isMobile" class="justify-space-between align-end">
              <v-col cols="12" md="5" class="mb-md-8 text-center text-md-left mr-md-12 mb-9 mt-n3">
                <h1 style="font-size: 25px; color: #57a340;">Olá, {{ user?.user?.username || "Não informado"}}</h1>
                <p style="font-size: 16px; color: #57a340; font-weight: 300px;">Bem-vindo ao seu perfil</p>
              </v-col>
              <v-col cols="auto" class="d-flex align-end ">
                <div class="text-md-start mt-4">
                  <v-icon color="#57a340" class="mr-2 ml-n2">mdi-leaf-circle</v-icon>
                  <span class="text-subtitle-2 text-grey">{{ user?.user?.role || "Sem cargo"}}</span>
                </div>
              </v-col>

              <v-col cols="auto" class="mb-n1">
                <v-card @click="true" class="rounded d-flex align-center" style="background-color: #ffffff; color: #57a340; box-shadow: 0px 0px 3px 3px #ccc;">
                  <v-card-title class="text-caption text-start">Editar Perfil</v-card-title>
                </v-card>
              </v-col>
            </v-row>

            <!-- Parte superior com Nome, Email e Card de Cadastrado Desde -->
            <v-col cols="10" class="text-start d-flex" style="font-size: 15px;">
              <v-row align="end" class="ml-md-8 ml-n8 mt-4">
                <!-- Nome -->
                <v-col v-if="isMobile" cols="12" md="4" class="mb-n5">
                  <v-icon color="#57a340" class="" left>mdi-account</v-icon>
                  <span class="ml-2" style="margin-left: 30px; font-size: 13px">{{ user?.user?.completeName || "Não informado" }}</span>
                </v-col>

                <v-col v-if="!isMobile" cols="12" md="4" class="">
                  <v-icon color="#57a340" class="mr-2" left>mdi-account</v-icon>
                  <strong class="mr-3">Nome:</strong><br />
                  <span style="margin-left: 30px">{{ user?.user?.completeName || "Não informado" }}</span>
                </v-col>

                <!-- Email -->
                <v-col v-if="isMobile" cols="12" md="4" class="mb-n11">
                  <v-icon color="#57a340" class="" left>mdi-email</v-icon>
                  <span class="ml-2" style="margin-left: 30px; font-size: 13px">{{ user?.user?.email || "Não informado" }}</span>
                </v-col>

                <v-col v-if="!isMobile" cols="12" md="4" class="">
                  <v-icon color="#57a340" class="mr-2" left>mdi-email</v-icon>
                  <strong>Email:</strong><br />
                  <span style="margin-left: 30px">{{ user?.user?.email || "Não informado" }}</span>
                </v-col>

                <!-- Card de Cadastrado Desde -->
                <v-col cols="5" md="4">
                  <v-card v-if="!isMobile" @click="true" elevation="4" class="ml-md-8 rounded-lg px-5 text-start align-center d-flex" style="background-color: #ffffff; color: #57a340">
                    <v-icon size="small" color="#57a340">mdi-account-box-edit-outline</v-icon>
                    <v-card-title> Editar Perfil</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="10" class="text-start" style="font-size: 15px">
              <v-row class="d-flex ml-md-8 ml-n8 justify-center align-md-start align-center">
                <!-- Contato -->
                <v-col v-if="isMobile" cols="12" md="4" class="mb-n5">
                  <v-icon color="#57a340" class="" left>mdi-phone</v-icon>
                  <span class="ml-2" style="margin-left: 30px; font-size: 13px">{{ produtor?.contato || "Sem número" }}</span>
                </v-col>

                <v-col v-if="!isMobile" cols="12" md="4" class="">
                  <v-icon color="#57a340" class="mr-2" left>mdi-phone</v-icon>
                  <strong>Telefone:</strong><br />
                  <span  style="margin-left: 30px">{{ produtor?.contato || "Sem número" }}</span>
                </v-col>

                <!-- Email -->
                <v-col v-if="isMobile" cols="12" md="4">
                  <v-icon color="#57a340" class="" left>mdi-map-marker</v-icon>
                  <span class="ml-2" style="margin-left: 30px; font-size: 13px">{{ produtor?.municipio + " - " + produtor?.estado || "Não informado" }}</span>
                </v-col>

                <v-col v-if="!isMobile" cols="12" md="4" class="">
                  <v-icon color="#57a340" class="mr-2" left>mdi-map-marker</v-icon>
                  <strong>Localização:</strong><br />
                  <span style="margin-left: 30px">{{ produtor?.municipio + " - " + produtor?.estado || "Não informado" }}</span>
                </v-col>

                <v-col v-if="!isMobile" cols="12" md="4" class="pb-0">
                  <v-card elevation="4" class="ml-md-8 rounded-lg pa-md-7 text-start" style="background-color: #eaf6ea">
                    <v-row class="align-start">
                      <v-icon size="small" color="green darken-2" class="mr-2 mt-1">mdi-calendar-month-outline</v-icon>
                      <div>
                        <div class="text-caption font-weight-bold">Cadastrado desde:</div>
                        <div class="text-body-2">17/05/2025</div>
                      </div>
                    </v-row>

                    <v-divider class="my-7"></v-divider>

                    <v-row class="align-start">
                      <v-icon size="small" color="#57a340" class="mr-2 mt-1">mdi-check-circle</v-icon>
                      <div>
                        <div class="text-caption font-weight-bold">Perfil Ativo:</div>
                        <div class="text-body-2">Sim</div>
                      </div>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          
          <v-divider color="black" style="width: 100%" class="border-opacity-70 mt-4" :thickness="1" v-if="isMobile"></v-divider>

          <v-row v-if="isMobile" class="d-flex mt-1">
            <v-col cols="6" class="d-flex justify-center">
              <div class="text-start">
                <div class="text-caption font-weight-regular">Cadastrado desde:</div>
                <div class="text-caption ">17/05/2025</div>
              </div>
            </v-col>

            <v-col cols="6" class="d-flex justify-center">
              <div class="text-start">
                <div class="text-caption font-weight-regular">Perfil ativo:</div>
                <div class="text-caption ">Sim</div>
              </div>
            </v-col>
          </v-row>

          <v-spacer style="height: 50px"></v-spacer>
          <v-row>
            <v-col class="" cols="12" sm="12" md="4" v-for="(item, index) in sections" :key="item.id">
              <v-card class="d-flex flex-column justify-center" elevation="3" :rounded="isMobile ? 'lg' : 'xl'" max-height="260px" style="border: 2px solid #ccc;">
                <div class="" :style="{ backgroundColor: item.color }">
                  <v-card-title class="font-weight-bold" style="color: #ffffff; font-size: 17px">
                    <v-icon>{{ item.mdi }}</v-icon>
                    {{ item.title }}</v-card-title
                  >
                </div>
                <div class="d-flex justify-space-between align-center px-2 py-3">
                  <!-- Texto da Esquerda -->
                  <span class="status-text font-weight-bold" style="color: #212121; max-width: 45%">
                    {{ item.text1 }}
                  </span>

                  <!-- Texto da Direita com ícone colado -->
                  <div class="d-flex flex-column align-end text-center" style="max-width: 50%">
                    <div class="d-flex align-center flex-nowrap">
                      <v-icon small color="primary" class="mr-1" style="position: relative">mdi-account-check</v-icon>
                      <span class="text-xs font-weight-medium status-text" style="color: #212121; word-break: break-word; white-space: normal"> {{ item.items.length }} {{ item.items.length === 1 ? item.text2 : item.text3 }} {{ item.text4 }}(s) </span>
                    </div>
                  </div>
                </div>

                <v-row>
                  <v-col>
                    <div style="max-height: 120px; overflow-y: auto" class="scrollbar-custom">
                      <v-data-table-virtual :fixed-header="true" hover density="comfortable" :items="item.items" :headers="item.headers" class="text-xs elevation-1 custom-table" item-value="name">
                        <template v-slot:[`item.visualizar`]="{ item }">
                          <v-icon  @click="previewSection(index, item)">mdi-eye</v-icon>
                        </template>
                      </v-data-table-virtual>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="5" :rounded="isMobile ? 'lg' : 'xl'" color="#ffffff" max-height="260px" style="border: 2px solid #ccc">
                <div class="" style="background-color: #3c8dad">
                  <v-card-title class="font-weight-bold" style="color: #ffffff; font-size: 17px">
                    <v-icon>mdi-chart-box-outline</v-icon>
                    Relatórios Mensais
                  </v-card-title>
                </div>
                <v-row class="mb-5 mt-2 pl-1 ml-2  align-center" align="center">
                  <!-- Mês -->
                  <v-col cols="6" sm="6" md="4" lg="4" class="d-flex align-center pa-0 ml-md-4">
                    <v-icon class="mr-1 ml-n2">mdi-calendar-range</v-icon>
                    <span class="mr-2 status-text">Mês:</span>
                    <v-select v-model="filters.mes.value" variant="flat" density="" :items="months" item-title="title" item-value="value" :fixed-header="true" class="custom-select-date elevation-2 rounded mr-5" :hide-details="true" style="max-width: 150px" />
                  </v-col>

                  <!-- Ano -->
                  <v-col cols="6" sm="6" md="4" lg="4" class="d-flex align-center pa-0 ml-md-4">
                    <v-icon class="mr-1 ml-n3">mdi-calendar-range</v-icon>
                    <span class="mr-2 status-text">Ano:</span>
                    <v-select  v-model="filters.ano.value" variant="flat" density="" :items="gerarAnos" class="custom-select-date elevation-2 rounded mr-5" :hide-details="true" style="max-width: 150px" />
                  </v-col>

                  <v-col v-if="!isMobile" cols="1" sm="12" md="4" lg="3" class="d-flex justify-center align-center">
                    <v-icon @click="openEntregaMensalPreview()">mdi-eye</v-icon>
                  </v-col>

                  <!-- Ícone ao final -->
                  <v-col v-if="isMobile" cols="11" sm="12" md="4" lg="2" class="d-flex justify-center align-center mb-n7">
                    <v-btn size="x-small" @click="openEntregaMensalPreview()">Visualizar</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div style="max-height: 120px; overflow-y: auto" class="scrollbar-custom">
                      <v-data-table-virtual :fixed-header="true" hover density="comfortable" :items="filteredEntregas" :headers="headers" class="text-xs elevation-1 custom-table" item-value="name">
                        <template v-slot:[`item.visualizar`]="{ item }">
                          <v-icon @click="previewSection(index, item)">mdi-eye</v-icon>
                        </template>
                        <template v-slot:[`item.total`]="{ item }">
                          <span>{{ formatReal(item.total) }}</span>
                        </template>
                        <template v-slot:[`item.dataDaEntrega`]="{ item }">
                          <span>{{ formatDate(item.dataDaEntrega) }}</span>
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
import NavBar from "../NavBar.vue";
import UtilsService from "../../services/utilsService";
import NotificationMenu from "../menus/NotificationMenu.vue";
import { useDisplay } from "vuetify";

export default {
  name: "ProfileProdutor",
  components: {
    NavBar,
    NotificationMenu,
  },
  data: () => ({
    smAndDown: false,
    user: utilsFunc.getUser(),
    dialog: {
      visualizar: false,
    },
    pdfUrl: null,
    pagamentos: [],
    projects: [],
    produtor: {},
    entregas: [],
    filters: {
      mes: { value: null, compareType: "equal" },
      ano: { value: null, compareType: "equal" },
    },
    expanded: true,
    headers: [
      { title: "COD", align: "center", sortable: true, value: "id" },
      { title: "Total", align: "center", sortable: true, value: "total" },
      { title: "Data", align: "center", sortable: true, value: "dataDaEntrega" },
    ],

    sections: [
      {
        title: "Projetos",
        text1: "Projetos",
        text2: "Projeto",
        text3: "Projetos",
        text4: "cadastrado",
        mdi: "mdi-clipboard-outline",
        color: "#e1b12c",
        items: [],
        headers: [
          { title: "COD", align: "center", value: "id" },
          { title: "Total", align: "center", value: "total" },
          { title: "Data", align: "center", value: "dataProjeto" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },
      {
        title: "Entregas",
        text1: "Entregas",
        text2: "Entrega",
        text3: "Entregas",
        text4: "cadastrada",
        mdi: "mdi-check-circle",
        color: "#2e8b57",
        items: [],
        headers: [
          { title: "COD", align: "center", value: "id" },
          { title: "Total", align: "center", value: "total" },
          { title: "Data", align: "center", value: "dataDaEntrega" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },

      {
        title: "Pagamentos",
        text1: "Pagamentos",
        text2: "Pagamento",
        text3: "Pagamentos",
        text4: "cadastrado",
        mdi: "mdi-currency-usd",
        color: "#E9762B",
        items: [],
        headers: [
          { title: "COD", align: "center", value: "id" },
          { title: "Total", align: "center", value: "total" },
          { title: "Data", align: "center", value: "data" },
          { title: "Visualizar", align: "center", sortable: true, value: "visualizar" },
        ],
      },
    ],
    months: [
      { title: "Janeiro", value: 1 },
      { title: "Fevereiro", value: 2 },
      { title: "Março", value: 3 },
      { title: "Abril", value: 4 },
      { title: "Maio", value: 5 },
      { title: "Junho", value: 6 },
      { title: "Julho", value: 7 },
      { title: "Agosto", value: 8 },
      { title: "Setembro", value: 9 },
      { title: "Outubro", value: 10 },
      { title: "Novembro", value: 11 },
      { title: "Dezembro", value: 12 },
    ],

    drawer: false,
  }),
  computed: {
    isMobile() {
      console.log("SMANDOWN: ", this.smAndDown);
      return this.smAndDown;
    },

    gerarAnos() {
      const anoAtual = new Date().getFullYear();
      const anoInicio = 1900; // Define o ano inicial
      return Array.from({ length: anoAtual - anoInicio + 1 }, (_, i) => anoAtual - i);
    },

    filteredEntregas() {
      return this.entregas
        .map((entrega) => ({ ...entrega }))
        .filter((item) => {
          const mes = Number(this.filters.mes.value); // Converter para número
          const ano = Number(this.filters.ano.value);

          // Garantindo que a string de data está no formato correto
          console.log("Data recebida do backend: ", item.dataDaEntrega);

          // Criando um objeto Date corretamente
          const data = new Date(`${item.dataDaEntrega}T00:00:00`); // Garante que não há problemas com fuso horário

          const mesData = data.getMonth() + 1; // getMonth() retorna 0-11, então somamos 1
          const anoData = data.getFullYear();

          // Aplicando o filtro corretamente
          const filtroMesAno = mes && ano ? mesData === mes && anoData === ano : true;

          console.log("Filtro Mes Ano: ", filtroMesAno);

          return filtroMesAno;
        });
    },
  },
  methods: {
    formatReal(val) {
      return UtilsService.formatReal(val);
    },

    formatDate(val) {
      return UtilsService.formatData(val);
    },

    formatMonth(mes) {
      switch (mes) {
        case 1:
          return "01";
        case 2:
          return "02";
        case 3:
          return "03";
        case 4:
          return "04";
        case 5:
          return "05";
        case 6:
          return "06";
        case 7:
          return "07";
        case 8:
          return "08";
        case 9:
          return "09";
        case 10:
          return "10";
        case 11:
          return "11";
        case 12:
          return "12";
        default:
          return "??"; // ou "" se preferir vazio no default
      }
    },
    formatDates(field) {
      this.sections.forEach((section) => {
        const campo = section.headers.find((h) => h.title.toLowerCase().includes(field))?.value;
        if (campo && section.items.length > 0) {
          section.items = section.items.map((item) => {
            if (field === "total") {
              const totalOriginal = item[campo];

              if (totalOriginal) {
                return {
                  ...item,
                  [campo]: UtilsService.formatReal(totalOriginal),
                };
              }
            } else {
              const dataOriginal = item[campo];

              if (dataOriginal) {
                return {
                  ...item,
                  [campo]: UtilsService.formatData(dataOriginal),
                };
              }
            }
            return item;
          });
        }
      });
    },

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
        const response = await axios.get("public/produtores");
        console.log(response.data);
        console.log(this.user);
        this.produtor = response.data.find((p) => p.cpf === this.user?.user?.cpf);
        console.log(this.produtor?.id);
      } catch (error) {
        console.error(error);
      }
    },

    async openProjetoPreview(item) {
      console.log(item);
      try {
        const response = await axios.get(`/public/projetos/relatorio/visualize/${item.id}`, {
          responseType: "blob", // MUITO IMPORTANTE
        });
        console.log(response.data);

        const blob = response.data;
        this.pdfUrl = URL.createObjectURL(blob) + "#zoom=100";
        this.dialog.visualizar = true;
      } catch (error) {
        console.error("Erro ao buscar ou exibir PDF:", error);
      }
    },

    async openEntregaMensalPreview() {
      const mes = this.formatMonth(this.filters.mes.value);
      const ano = this.filters.ano.value;

      try {
        const response = await axios.get(`/public/comprovantes/relatorio/mensal/produtor/generate/${mes}/${ano}/${5}`, {
          responseType: "blob",
        });
        console.log(response.data);
        const blob = response.data;

        this.pdfUrl = URL.createObjectURL(blob) + "#zoom=100";
        this.dialog.visualizar = true;
      } catch (error) {
        console.error("Erro ao buscar ou exibir PDF:", error);
      }
    },

    async openPagamentoPreview(item) {
      console.log(item);
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

    async openEntregaPreview(item) {
      console.log(item);
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

    async getProjetoPerProductor() {
      try {
        const { data } = await axios.get(`public/projetos/projeto/${this.produtor?.id}`);
        this.projects.push(data);
        this.sections[0].items = this.projects;
        console.log("projetos", this.projects);
      } catch (error) {
        console.error(error);
      }
    },

    async getEntregasPerProductor() {
      try {
        const { data } = await axios.get(`public/comprovantes/comprovante/${this.produtor?.id}`);
        this.entregas = data;
        this.sections[1].items = this.entregas;
        console.log("entregas", this.entregas);
      } catch (error) {
        console.error(error);
      }
    },

    async getPagamentosPerProductor() {
      try {
        const { data } = await axios.get(`public/pagamentos/pagamento/${this.produtor?.id}`);
        this.pagamentos = data;
        this.sections[2].items = this.pagamentos;
        console.log("pagamentos", this.pagamentos);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    const display = useDisplay();
    this.smAndDown = display.smAndDown;
    try {
      await this.findProductorByUser();
      await this.getProjetoPerProductor();
      await this.getEntregasPerProductor();
      await this.getPagamentosPerProductor();

      this.filters.ano.value = new Date().getFullYear();
      this.filters.mes.value = new Date().getMonth() + 1;

      this.formatDates("data");
      this.formatDates("total");
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>

.full-width-row {
  width: 100vw;
  margin-left: -40px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px; /* Altere a altura conforme desejar */
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.container {
  background-color: rgba(87, 163, 64, 0.3);
}

::v-deep(.v-field__input) {
  font-size: 12px !important;
  padding: 5px !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  white-space: normal !important;
}

::v-deep(.v-list-item-title) {
  font-size: 12px !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  white-space: normal !important;
}

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

::v-deep(.scrollbar-custom) {
  scrollbar-width: none; /* Firefox */
  scrollbar-color: #686868 #e0e0e0; /* Firefox */
}

::v-deep(.scrollbar-custom::-webkit-scrollbar) {
  width: 8px;
}

::v-deep(.scrollbar-custom::-webkit-scrollbar-track) {
  background: #e0e0e0;
  border-radius: 8px;
}

::v-deep(.scrollbar-custom::-webkit-scrollbar-thumb) {
  background-color: #3d6e26;
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
}

::v-deep(.scrollbar-custom::-webkit-scrollbar-thumb:hover) {
  background-color: #1d1d1d;
}
::v-deep(.custom-table) thead th {
  background: #f5f5f5; /* verde */
  color: #1d1d1d;
  font-weight: bold;
  min-height: 20px;
}
::v-deep(.custom-table) tbody tr:nth-child(odd) {
  background-color: #f1f8e9; /* verde bem claro */
}

::v-deep(.custom-table) td {
  color: #212121; /* verde escuro */
  font-size: 0.7rem;
  text-align: start;
  padding: 10px;
}

.custom-table tbody tr {
  margin-bottom: 5px; /* Adiciona espaçamento entre as linhas */
  border-bottom: 1px solid #ddd; /* Opcional, adiciona linha divisória entre as linhas */
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
  line-height: 1.2;
}

.text-xs {
  font-size: 12px;
}

.custom-select-date {
  background-color: rgb(226, 226, 226);
}
</style>
