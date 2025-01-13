<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Cadastro de Produtores</h1>
  <v-row justify="center">
    <v-col cols="12">
      <v-data-table-virtual :items="filteredProductors" :headers="headers" :search="search" show-expand single-expand v-model:expanded="expanded" :fixed-header="true" height="700px" @update:expanded="onExpand">
        <template v-slot:top>
          <v-row class="mt-2 mb-8 mx-3">
            <v-col cols="5">
              <v-text-field class="border rounded" dense outlined hide-details v-model="search" label="Pesquisar" :append-inner-icon="'mdi-magnify'" clearable />
            </v-col>
            <v-col class="text-end" cols="2">
              <v-badge location="top start" bordered overlap>
                <v-btn class="elevation-0" @click="showFilters = !showFilters">
                  <v-icon v-if="!showFilters" size="25px" left>mdi-filter</v-icon>
                  <v-icon v-else left size="25px">mdi-filter-off</v-icon>
                  FILTROS
                </v-btn>
              </v-badge>
            </v-col>
            <v-col class="button-group mr-4" align="end">
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <v-btn color="success" class="elevation-3 compact-btn ml-3" min-width="25%" @click="dialog.create = true" v-bind="props">
                    <v-icon small class="compact-icon" left>mdi-plus</v-icon>
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Novo</span> <span>Produtor</span></div>
                  </v-btn>
                </template>
                <span>Clique para adicionar um produtor</span>
              </v-tooltip>
            </v-col>

            <v-col cols="12">
              <v-expand-transition>
                <v-card v-show="showFilters" variant="outlined" height="150px">
                  <h4 class="ml-4 mt-4" align="start">Filtrar por</h4>
                  <v-row dense class="py-2 px-4">
                    <v-col :cols="2">
                      <v-autocomplete density="compact" variant="outlined" :items="uf" label="Estado" item-title="nome" item-value="nome" v-model="filters.estado.value" outlined dense clearable></v-autocomplete>
                    </v-col>
                    <v-col :cols="2">
                      <v-autocomplete density="compact" variant="outlined" :items="municipios" label="Município" item-title="nome" item-value="nome" v-model="filters.municipio.value" clearable></v-autocomplete>
                    </v-col>
                    <v-col :cols="1">
                      <v-select density="compact" :items="sexoOptions" label="Sexo" item-title="label" item-value="value" v-model="filters.sexo.value" variant="outlined" dense clearable></v-select>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-row dense>
                      <v-col class="text-end" height="200">
                        <v-btn align="start" justify="center" class="pb-8" color="error" text elevation="0" @click="clearFilters"> Limpar filtros </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-col>
          </v-row>
          <v-row class="mb-5 pl-1 ml-4">
            <v-col cols="auto" class="pa-0 mr-4" v-if="cafProxVenci > 0 || cafVencida > 0">
              <span class="status-text">CAF</span>
              <div class="d-flex align-center">
                <v-icon small color="error" left>mdi-alert</v-icon>
                <div class="d-flex flex-column ml-3 status-text align-start">
                  <span v-if="cafVencida > 0" class="text-error text-xs font-weight-medium"> {{ cafVencida }} {{ cafVencida === 1 ? "CAF" : "CAFS" }} vencida(s) </span>
                  <span v-if="cafProxVenci > 0" class="text-warning text-xs font-weight-medium"> {{ cafProxVenci }} {{ cafProxVenci === 1 ? "CAF" : "CAFS" }} próxima(s) do vencimento </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" @click="onSelectRow(item, 'update')" class="elevation-0">
                <v-icon color="green">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Clique para editar um Produtor</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.validadeCaf`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-chip color="white" v-if="uniqueValidateCaf(item.validadeCaf) === 1" v-bind="props">
                <span style="background-color: #f09900; height: 35px; width: 90px; padding-top: 6px; font-weight: bold">{{ formatData(item.validadeCaf) }}</span>
              </v-chip>
            </template>
            <span>A CAF está próxima de vencer</span>
          </v-tooltip>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-chip color="white" v-if="uniqueValidateCaf(item.validadeCaf) === 2" v-bind="props">
                <span style="background-color: #57a340; height: 35px; width: 90px; padding-top: 6px; font-weight: bold">{{ formatData(item.validadeCaf) }}</span>
              </v-chip>
            </template>
            <span>A CAF está longe de vencer</span>
          </v-tooltip>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-chip color="white" v-if="uniqueValidateCaf(item.validadeCaf) === 3" v-bind="props">
                <span style="background-color: #e60200; height: 35px; width: 90px; padding-top: 6px; font-weight: bold">{{ formatData(item.validadeCaf) }}</span>
              </v-chip>
            </template>
            <span>CAF vencida</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-row="{ item }">
          <tr>
            <td :colspan="9" style="background-color: #37622a" class="text-white">
              {{ console.log(item) }}
              <ProdutorExpand :produtorData="JSON.parse(JSON.stringify(item))"></ProdutorExpand>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form">
          <v-card-title class="sticky-title title-border">
            Cadastro de Produtor
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = false">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovoProdutor :currentItem="newItem" :onSubmit="createProductor" :files="files" :dialogAtivo="dialog.create"></NovoProdutor>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form">
          <v-card-title class="sticky-title title-border">
            Editar Produtor: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditProdutor :currentItem="selectedRow" :onSubmit="updateProductor" :files="files"></EditProdutor>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import NovoProdutor from "./NovoProdutor.vue";
import EditProdutor from "./EditProdutor.vue";
import ProdutorExpand from "./ProdutorExpand.vue";
import { useToast } from "vue-toastification";
import BtnComeBack from "../../template/BtnComeBack.vue";
import UtilsService from "../../../services/utilsService";

export default {
  name: "CadastroProdutor",
  components: {
    NavBar,
    NovoProdutor,
    ProdutorExpand,
    EditProdutor,
    BtnComeBack,
  },
  data: () => ({
    cafVencida: null,
    cafProxVenci: null,
    dialog: {
      create: false,
      update: false,
    },
    search: "",
    singleExpand: false,
    showFilters: false,
    productors: [],
    headers: [
      { text: "Editar", align: "center", value: "edit" },
      { title: "Nome do Produtor", align: "center", sortable: true, value: "nome" },
      { title: "Endereço", align: "center", sortable: true, value: "endereco" },
      { title: "CAF", align: "center", sortable: true, value: "validadeCaf" },
      { title: "CPF", align: "center", sortable: true, value: "cpf" },
      { title: "CEP", align: "center", sortable: true, value: "cep" },
      { title: "Estado", align: "center", sortable: true, value: "estado" },
      { title: "Municipio", align: "center", sortable: true, value: "municipio" },
    ],
    newItem: {
      sexo: "Masculino",
    },
    files: [],
    selectedRow: {},
    expanded: [],
    filterActive: false,
    filters: {
      estado: { value: null, compareType: "equal", prop: "estado" },
      municipio: { value: null, compareType: "equal", prop: "municipio" },
      sexo: { value: null, compareType: "equal", prop: "sexo" },
      cpf: { value: null, compareType: "equal", prop: "cpf" },
      cep: { value: null, compareType: "equal", prop: "cep" },
      estado_civil: { value: null, compareType: "equal", prop: "estadoCivil" },
    },
    uf: [],
    municipios: [],
    sexoOptions: [
      { label: "Masculino", value: "Masculino" },
      { label: "Feminino", value: "Feminino" },
    ],
  }),
  watch: {
    filteredProductors: function () {
      this.validateCafs();
    },
    deep: true,
  },
  computed: {
    filteredProductors() {
      return this.productors
        .filter((item) => {
          return this.filters.estado.value ? item.estado === this.filters.estado.value : true;
        })
        .filter((item) => {
          return this.filters.municipio.value ? item.municipio === this.filters.municipio.value : true;
        })
        .filter((item) => {
          return this.filters.sexo.value ? item.sexo === this.filters.sexo.value : true;
        });
    },
  },
  methods: {
    formatData(item) {
      return UtilsService.formatData(item);
    },
    validateCafs() {
      this.cafVencida = 0;
      this.cafProxVenci = 0;
      const alertThreshold = 30;
      const today = new Date();
      const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if (!this.filteredProductors || this.filteredProductors.length === 0) {
        console.warn("Nenhum produtor encontrado.");
        return;
      }
      this.productors.forEach((productor) => {
        const dateCaf = productor?.validadeCaf;

        if (!dateCaf) {
          console.warn("Data inválida: ", dateCaf);
        }
        const newCafValidity = new Date(dateCaf + "T00:00:00Z");
        const normalizedCafValidity = new Date(newCafValidity.getUTCFullYear(), newCafValidity.getUTCMonth(), newCafValidity.getUTCDate());
        console.log("Data da caf: ", normalizedCafValidity);

        const timeDiff = normalizedCafValidity.getTime() - normalizedToday.getTime();
        const diffInDays = timeDiff / (1000 * 60 * 60 * 24);

        if (diffInDays >= 0 && diffInDays <= alertThreshold) {
          this.cafProxVenci++;
        } else if (diffInDays < 0) {
          this.cafVencida++;
        }

        console.log(this.cafProxVenci);
        console.log(this.cafVencida);
      });
    },

    uniqueValidateCaf(item) {
      const alertThreshold = 30;
      const today = new Date();
      const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const newCafValidity = new Date(item + "T00:00:00Z");
      const normalizedCafValidity = new Date(newCafValidity.getUTCFullYear(), newCafValidity.getUTCMonth(), newCafValidity.getUTCDate());

      const timeDiff = normalizedCafValidity.getTime() - normalizedToday.getTime();
      const diffInDays = timeDiff / (1000 * 60 * 60 * 24);

      if (diffInDays >= 0 && diffInDays <= alertThreshold) {
        return 1; // Amarelo
      }
      if (diffInDays > alertThreshold) {
        return 2; // Verde
      } else {
        return 3;
      }
    },
    onExpand(newExpanded) {
      if (this.expanded !== newExpanded) {
        this.expanded = newExpanded;
      }
    },

    clearFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key].value = null;
      });
      this.filterActive = false;
      this.filtered = [];
    },

    async getProductors() {
      try {
        const response = await axios.get("/public/produtores");
        console.log(response.data);

        this.productors = response.data;
      } catch (error) {
        console.log("Error: ", error);
        this.productors = [];
      }
    },
    async createProductor() {
      const toast = useToast();
      try {
        const formData = new FormData();
        this.files.forEach((file) => {
          formData.append("file", file);
        });
        formData.append("produtor", JSON.stringify(this.newItem));

        const response = await axios.post("/public/produtores/produtor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        if (response.status !== 201) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Produtor cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao cadastrar produtor: ", error);
      } finally {
        this.dialog.create = false;
        this.getProductors();
      }
    },

    async updateProductor(fields) {
      const toast = useToast();
      const { currentItem, files } = fields;

      try {
        const formData = new FormData();
        files.forEach((file) => {
          console.log("Arquivo enviado: ", file);
          formData.append("file", file);
        });
        formData.append("produtor", JSON.stringify(currentItem));

        const response = await axios.put(`/public/produtores/atualizar/${currentItem.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Produtor atualizado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar produtor: ", error);
      } finally {
        this.dialog.update = false;
        this.getProductors();
      }
    },

    onSelectRow(row, dialog) {
      if (dialog === "update") {
        this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
        this.dialog.update = true;
      }
      console.log("Linha selecionada: ", this.selectedRow);
    },

    async getUF() {
      try {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        console.log(response.data);
        this.uf = response.data;
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getCd() {
      console.log("Teste de chamada");
      try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);
        console.log("Municípios: ", response.data);
        this.municipios = response.data;
      } catch (error) {
        console.log("Erro: ", error);
      }
    },
  },
  mounted() {
    this.getProductors(), this.getUF(), this.getCd();
  },
};
</script>

<style scoped>
.sticky-title,
.sticky-icon {
  display: flex;
  font-weight: bold !important;
  top: 0 !important; /* Distância do topo da página */
  color: #57a340;
  justify-content: flex-end;
  align-items: flex-end;
}
.card-form::-webkit-scrollbar {
  width: 10px;
}

.card-form::-webkit-scrollbar-track {
  background: transparent;
}

.card-form::-webkit-scrollbar-thumb {
  background-color: rgba(87, 163, 64, 0.7);
  border-radius: 10px;
}

.card-form::-webkit-scrollbar-button {
  display: none;
}

td {
  padding: 16px;
  background-color: #f9f9f9;
}

.compact-btn {
  font-size: 12px !important;
  letter-spacing: -0.2px !important;
  padding: 0 12px !important;
  height: 42px !important;
}

.compact-btn-text {
  font-size: 12px !important;
  line-height: 1.2 !important;
  text-align: center !important;
}

.button-group {
  gap: 10px !important;
}

.text-xs {
  font-size: 12px;
}

.status-text {
  font-size: 12px;
  line-height: 1.1;
}
</style>
