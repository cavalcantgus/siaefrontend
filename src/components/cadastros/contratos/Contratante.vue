<template>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Contratante</h1>
  <v-row justify="center" class="pr-2">
    <v-col cols="12">
      <v-data-table :items="contratantes" :headers="headers" :search="search" :fixed-header="true" height="700px">
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
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Novo</span> <span>Contratante</span></div>
                  </v-btn>
                </template>
                <span>Clique para cadastrar um contratante</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row class="mb-5 pl-1 ml-4">
            <v-col
              cols="auto"
              class="pa-0 mr-4"
            >
              <span class="status-text">Contratantes</span>
              <div class="d-flex align-center">
                <v-icon small color="primary" left>mdi-account-check</v-icon>
                <div class="d-flex flex-column ml-3 status-text align-start">
                  <span
                    
                    class="text-xs font-weight-medium"
                  >
                    {{ this.contratantes.length }}
                    {{ this.contratantes.length === 1 ? "Contratante" : "Contratantes" }} cadastrado(s)
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
            <span>Clique para editar um Contratante</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDeleteRow(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para deletar um Contratante</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.nome`]="{ item }">
          <span>{{ item?.nome }}</span>
        </template>
        <template v-slot:[`item.cpf`]="{ item }">
          <span>{{ item?.cpf}}</span>
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
         <!-- <template v-slot:expanded-row="{ item }">
            <tr>
              <td :colspan="9">
                {{ console.log(item) }}
                <ProdutorExpand :produtorData="item"></ProdutorExpand>
              </td>
            </tr>
          </template> -->
      </v-data-table>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Novo Contratante
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = !dialog.create">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovoContratante :currentItem="newItem" :onSubmit="createContratante" :dialogAtivo="dialog.create"></NovoContratante>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Editar Contratante: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditContratante :currentItem="selectedRow" :onSubmit="updateContratante"></EditContratante>
        </v-card>
      </v-dialog> 
    </v-col>
  </v-row>
</template>

<script>
import BtnComeBack from "../../template/BtnComeBack.vue";
import NovoContratante from './NovoContratante.vue';
import EditContratante from "./EditContratante.vue";
import { useToast } from "vue-toastification";
import axios from "@/services/axios.js";

export default {
  name: "Contratante",
  components: {
    BtnComeBack,
    NovoContratante,
    EditContratante,
  },
  data: () => ({
    selectedRow: {},
    search: null,
    expanded: false,
    showFilters: false,
    singleExpand: false,
    newItem: {},
    contratantes: [],
    dialog: {
      create: false,
      update: false,
    },
    headers: [
      { text: "Editar", align: "center", value: "edit", width: "40px" },
      { text: "Remover", align: "center", value: "delete", width: "40px" },
      { title: "Nome", align: "center", sortable: true, value: "nome" },
      { title: "CPF", align: "center", sortable: true, value: "cpf" },
      { title: "Baixar", align: "center", sortable: true, value: "download" },
    ],
  }),
  methods: {
    async createContratante(fields) {
        console.log("FIELDS: ", fields)
        const toast = useToast()
        try{
            const response = await axios.post("/public/contratantes/contratante", fields)
            console.log("Resposta: ", response)
            if (response.status !== 201) {
            throw new Error(`Erro: ${response.status}`);
            }

            toast.success("Contratante cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro: ", error);
            toast.error("Erro ao cadastrar contratante: ", error);
        } finally {
            this.dialog.create = false;  
        }
    },

    async updateContratante(fields) {
      const toast = useToast()
      try {
        const response = await axios.put(`/public/contratantes/contratante/${fields.id}`, fields)
        if(response.status !== 200) {
          throw new Error(`Erro: ${response.status}`)
        }

        toast.success("Contratante atualizado com sucesso!")
      } catch (error) {
        console.error("Erro: ", error)
        toast.error("Erro ao cadastrar contratante: ", error)
      } finally {
        this.dialog.update = false
      }
    },

    async getContratantes() {
        try {
        const response = await axios.get("/public/contratantes");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.contratantes = response.data;
          this.contratantes.sort((a, b) => a.nome.localeCompare(b.nome))
        } else {
          console.log("A resposta da API não é um Array");
          this.contratantes = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.contratantes = [];
      }
    },

    onSelectRow(row, dialog) {
      this.selectedRow = { ...row };
      this.dialog[dialog] = true;
    },

  },
  mounted() {
    this.getContratantes()
  }
};
</script>


<style scoped>
.sticky-title,
.sticky-icon {
  display: flex;
  font-weight: bold !important;
  top: 0 !important; 
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
