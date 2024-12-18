<template>
  <NavBar></NavBar>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Cadastro de Produtores</h1>
  <v-row justify="center">
    <v-col cols="12">
      <v-data-table-virtual :items="filteredProductors" :headers="headers" :search="search" show-expand single-expand v-model:expanded="expanded" :fixed-header="true" height="700px">
        <template v-slot:top>
          <v-row class="mt-2 mb-8 mx-3">
            <v-col cols="5">
              <v-text-field class="border rounded" dense outlined hide-details v-model="search" label="Pesquisar" :append-inner-icon="'mdi-magnify'" clearable />
            </v-col>
            <v-col class="text-end" cols="2">
              <v-badge left bordered overlap>
                <v-btn class="elevation-0" @click="showFilters = !showFilters">
                  <v-icon v-if="!showFilters" left>mdi-filter</v-icon>
                  <v-icon v-else left>mdi-filter-off</v-icon>
                </v-btn>
              </v-badge>
            </v-col>
            <v-col class="text-end">
              <v-btn color="success" class="mx-4 elevation-0" @click="dialog.create = true">
                <v-icon left>mdi-plus</v-icon>
                Novo
              </v-btn>
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
        <template v-slot:expanded-row="{ item }">
          <tr>
            <td :colspan="9">
              {{ console.log(item) }}
              <ProdutorExpand :produtorData="item"></ProdutorExpand>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form">
          <v-card-title class="sticky-title title-border">
            Cadastro de Produtor
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = !dialog.create">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovoProdutor :currentItem="newItem" :onSubmit="createProductor" :files="files"></NovoProdutor>
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

export default {
  name: "CadastroProdutor",
  components: {
    NavBar,
    NovoProdutor,
    ProdutorExpand,
    EditProdutor,
  },
  data: () => ({
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
  }),
  computed: {
    filteredProductors() {
      return this.productors;
    },
  },
  methods: {
    async getProductors() {
      try {
        const response = await axios.get("/public/produtores");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.productors = response.data;
        } else {
          console.log("A resposta da API não é um Array");
          this.productors = [];
        }
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
        this.dialog = false;
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao cadastrar produtor: ", error);
        this.dialog = false;
      }
    },

    async updateProductor(fields) {
      const toast = useToast();
      const { currentItem, files } = fields;

      try {
        const formData = new FormData();
        files.forEach((file) => {
          console.log("Arquivo enviado: ", file)
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
        this.dialog.update = false;
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar produtor: ", error);
        this.dialog.update = false;
      }
    },

    onSelectRow(row, dialog) {
      this.selectedRow = { ...row };
      this.dialog[dialog] = true;
    },
  },
  mounted() {
    this.getProductors();
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
</style>
