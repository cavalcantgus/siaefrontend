<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Comprovante de Recebimento</h1>
  <v-row justify="center" class="pr-2">
    <v-col cols="12">
      <v-data-table-virtual :items="filteredProofs" :headers="headers" :search="search" single-expand show-expand v-model:expanded="expanded" :fixed-header="true" height="700px">
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
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Gerar</span>Comprovante <span></span></div>
                  </v-btn>
                </template>
                <span>Clique para gerar um comprovante</span>
              </v-tooltip>
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
            <span>Clique para editar um Comprovante</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDeleteRow(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para deletar um comprovante</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.download`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDownloadRow(item)" class="elevation-0">
                <v-icon color="primary">mdi-download</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para emitir um comprovante</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.dataDaEntrega`]="{ item }">
          <span>{{ formatDate(item.dataDaEntrega) }}</span>
        </template>
        <template v-slot:[`item.total`]="{ item }">
          <span>{{ formatPrice(item.total) }}</span>
        </template>
        <template v-slot:expanded-row="{ item }">
          <tr>
            <td :colspan="9" style="background-color: #37622a" class="text-white">
              {{ console.log(item) }}
              <ProjetoDeVendaExpand :projetoData="item"></ProjetoDeVendaExpand>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
      <v-dialog v-model="dialog.create" width="75%">
        <v-card class="card-form align-self-center">
          <v-card-title class="sticky-title title-border">
            Gerar Comprovante
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = !dialog.create">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovaEntrega :currentItem="newItem" :onSubmit="createProof" :dialogAtivo="dialog.create"></NovaEntrega>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form align-self-center" width="100%">
          <v-card-title class="sticky-title title-border">
            Editar Comprovante: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditProjeto :currentItem="selectedRow" :onSubmit="updateProject"></EditProjeto>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import NovaEntrega from "./NovaEntrega.vue";
import EditProjeto from "./EditProjeto.vue";
import ProjetoDeVendaExpand from "./ProjetoDeVendaExpand.vue";
import { useToast } from "vue-toastification";
import UtilsService from "../../../services/utilsService";
import BtnComeBack from "../../template/BtnComeBack.vue";
import ConfirmButton from "../../template/ConfirmButton.vue";

export default {
  name: "CadastroProdutor",
  components: {
    NavBar,
    NovaEntrega,
    ProjetoDeVendaExpand,
    EditProjeto,
    BtnComeBack,
    ConfirmButton,
  },
  data: () => ({
    dialog: {
      create: false,
      update: false,
    },
    search: "",
    singleExpand: false,
    showFilters: false,
    proofs: [],
    headers: [
      { text: "Editar", align: "center", value: "edit", width: "40px" },
      { text: "Remover", align: "center", value: "delete", width: "40px" },
      { title: "Produtor", align: "center", sortable: true, value: "produtor.nome" },
      { title: "Endereço", align: "center", sortable: true, value: "produtor.endereco", width: "300px" },
      { title: "Data Entrega", align: "center", sortable: true, value: "dataDaEntrega" },
      { title: "Quantidade", align: "center", sortable: true, value: "quantidade" },
      { title: "Total Geral", align: "center", sortable: true, value: "total" },
      { title: "Relatório", align: "center", sortable: true, value: "download" },
    ],
    newItem: {},
    selectedRow: {},
    deleteRow: {},
    expanded: [],
  }),
  computed: {
    filteredProofs() {
      return this.proofs;
    },
  },
  methods: {
    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    formatDate(val) {
      return UtilsService.formatData(val);
    },

    downloadRelatorio(item) {
      console.log("Método chamado");
      const url = `http://localhost:8080/public/comprovantes/relatorio/generate/${item.id}`;
      window.location.href = url; // Redireciona o navegador e força o download
    },

    async getProofs() {
      try {
        const response = await axios.get("/public/comprovantes");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.proofs = response.data;
        } else {
          console.log("A resposta da API não é um Array");
          this.proofs = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.proofs = [];
      }
    },
    async createProof(fields) {
      const toast = useToast();
      console.log(fields);
      try {
        const response = await axios.post("/public/comprovantes/comprovante", fields);
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
        this.getProjects();
      }
    },

    async updateProof(fields) {
      const toast = useToast();

      try {
        const response = await axios.put(`/public/projetos/projeto/${fields.id}`, fields);

        console.log(response.data);
        console.log(response)

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Projeto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar produto: ", error);
      } finally {
        this.dialog.update = false;
        this.getProjects();
      }
    },

    async deleteProof(fields) {
      const toast = useToast();
      try {
        const response = await axios.delete(`/public/projetos/projeto/${fields.id}`, fields);
        if (response.status !== 204) {
          throw new Error(`Erro: `, response.status);
        }
        toast.success("Projeto removido com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar produto: ", error);
        console.error("Erro: ", error);
      } finally {
        this.getProducts();
      }
    },

    onSelectRow(row, dialog) {
      this.selectedRow = { ...row };
      this.dialog[dialog] = true;
    },

    onDeleteRow(row) {
      console.log("Método chamado");
      this.selectedRow = { ...row };
      this.deleteProject(this.selectedRow);
    },

    onDownloadRow(row) {
      console.log("Método chamado");
      this.selectedRow = { ...row };
      this.downloadRelatorio(this.selectedRow);
    },
  },
  mounted() {
    this.getProofs();
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
