<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Ata Da Chamada</h1>
  <v-row justify="center" class="pr-2">
    <v-col cols="12">
      <v-data-table :items="filteredAtas" :headers="headers" :search="search" single-expand show-expand v-model:expanded="expanded" :fixed-header="true" height="700px">
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
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="success" class="elevation-3 compact-btn ml-3" min-width="25%" @click="dialog.create = true" v-bind="attrs" v-on="on">
                    <v-icon small class="compact-icon" left>mdi-plus</v-icon>
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Nova</span> <span>Ata</span></div>
                  </v-btn>
                </template>
                <template v-slot:default>
                  <span>Clique para adicionar uma ata</span>
                </template>
              </v-tooltip>
            </v-col>

            <!-- <v-col cols="12">
                <v-expand-transition>
                  <v-card v-show="showFilters" variant="outlined" height="150px">
                    <h4 class="ml-4 mt-4" align="start">Filtrar por</h4>
                    <v-row dense class="py-2 px-4">
                      <v-col cols="12" md="6" lg="4">
                        <v-autocomplete density="compact" variant="outlined" :items="products" label="Produto" item-title="descricao" item-value="descricao" v-model="filters.produto.value" outlined dense clearable></v-autocomplete>
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
              </v-col> -->
          </v-row>
          <v-row class="mb-5 pl-1 ml-4">
            <v-col cols="auto" class="pa-0 mr-4">
              <span class="status-text">Atas</span>
              <div class="d-flex align-center">
                <v-icon small color="primary" left>mdi-account-check</v-icon>
                <div class="d-flex flex-column ml-3 status-text align-start">
                  <span class="text-xs font-weight-medium">
                    {{ this.atas.length }}
                    {{ this.atas.length === 1 ? "Ata" : "Atas" }} cadastrada(s)
                  </span>
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
            <span>Clique para editar uma Ata</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDeleteRow(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para deletar uma Ata</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.download`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDownloadRow(item)" class="elevation-0">
                <v-icon color="primary">mdi-download</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para baixar uma Ata</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.data`]="{ item }">
          <span>{{ formatDate(item.data) }}</span>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog.create" height="85%">
        <v-card class="card-form align-self-center" width="80%" height="200px">
          <v-card-title class="sticky-title title-border">
            Cadastro de Ata
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = !dialog.create">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <AtaDaChamada :currentItem="newItem" :onSubmit="createAta" :dialogAtivo="dialog.create"></AtaDaChamada>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update" height="85%">
        <v-card class="card-form align-self-center" width="80%" height="200px">
          <v-card-title class="sticky-title title-border">
            Editar Ata: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditAta :currentItem="selectedRow" :onSubmit="updateAta"></EditAta>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import NavBar from "../../NavBar.vue";
import BtnComeBack from "../../template/BtnComeBack.vue";
import axios from "@/services/axios.js";
import AtaDaChamada from "./AtaDaChamada.vue";
import EditAta from "./EditAta.vue";
import { useToast } from "vue-toastification";
import ConfirmButton from "../../template/ConfirmButton.vue";
import UtilsService from "../../../services/utilsService";

export default {
  name: "Ata",
  components: {
    NavBar,
    BtnComeBack,
    AtaDaChamada,
    EditAta,
    ConfirmButton,
  },
  data: () => ({
    atas: [],
    dialog: {
      create: false,
      update: false,
    },
    search: "",
    singleExpand: false,
    showFilters: false,
    headers: [
      { text: "Editar", align: "center", value: "edit", width: "40px" },
      { text: "Remover", align: "center", value: "delete", width: "40px" },
      { title: "Presidente", align: "center", sortable: true, value: "presidente" },
      { title: "Sec. Da CPL", align: "center", sortable: true, value: "secCpl", width: "300px" },
      { title: "Data", align: "center", sortable: true, value: "data" },
      { title: "Ata", align: "center", sortable: true, value: "download" },
    ],
    newItem: {},
    selectedRow: {},
    deleteRow: {},
    expanded: [],
    isAllowed: false,
    filters: {
      produto: { value: null, compareType: "equal", prop: "produto.descricao" },
    },
  }),
  computed: {
    filteredAtas() {
      return this.atas;
    },
  },
  methods: {
    formatDate(val) {
      return UtilsService.formatData(val);
    },

    async getAtas() {
      try {
        const { data } = await axios.get("public/atas");
        this.atas = data;
        console.log(this.atas);
      } catch (error) {
        console.error(error);
      }
    },

    async createAta(fields) {
      const toast = useToast();
      try {
        const response = await axios.post("public/atas/ata", fields);

        console.log(response.data);

        if (response.status !== 201) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Entrega cadastrada com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao cadastrar entrega: ", error);
      } finally {
        this.dialog.create = false;
        this.getAtas();
      }
    },

    async updateAta(fields) {
      const toast = useToast();
      try {
        const response = await axios.put(`public/atas/ata/${fields.id}`, fields);

        console.log(response.data);

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Ata atualizada com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar ata: ", error);
      } finally {
        this.dialog.update = false;
        this.getAtas();
      }
    },

    async deleteAta(fields) {
      const toast = useToast();
      try {
        const response = await axios.delete(`/public/atas/ata/${fields.id}`, fields);
        if (response.status !== 204) {
          throw new Error(`Erro: `, response.status);
        }
        toast.success("Ata removida com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar ata: ", error);
        console.error("Erro: ", error);
      } finally {
        this.getAtas();
      }
    },

    downloadAta(item) {
      const url = `https://siaeserver.com/public/atas/ata/generate/${item.id}`;

      axios({
        url: url,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          console.log("Content-Disposition:", response);
          const contentDisposition = response.headers["content-disposition"];
          let fileName = "arquivo.pdf";

          if (contentDisposition) {
            let fileNameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/);
            if (!fileNameMatch) {
              fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
            }

            if (fileNameMatch?.[1]) {
              console.log("Nome do arquivo bruto:", fileNameMatch[1]);
              fileName = decodeURIComponent(fileNameMatch[1]);
              console.log("Nome decodificado:", fileName);
            }
          }

          const blob = new Blob([response.data], { type: "application/pdf" });
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        })
        .catch((error) => {
          console.error("Erro ao baixar o contrato:", error);
        });
    },

    onSelectRow(row, dialog) {
      this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
      this.dialog[dialog] = true;
    },

    onDeleteRow(row) {
      this.selectedRow = { ...row };
      this.deleteAta(this.selectedRow);
    },

    onDownloadRow(row) {
      console.log("Método chamado");
      this.selectedRow = { ...row };
      this.downloadAta(this.selectedRow);
    },
  },
  mounted() {
    this.getAtas();
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

/* Estilo para mover o ícone de expandir para a esquerda */
.v-data-table__mobile-row .v-data-table__expand-icon {
  order: -1; /* Mover o ícone para a esquerda */
  margin-right: 0; /* Remover qualquer margem direita */
}

.v-data-table__expand-icon {
  margin-left: 0; /* Remover qualquer margem esquerda */
}
</style>
