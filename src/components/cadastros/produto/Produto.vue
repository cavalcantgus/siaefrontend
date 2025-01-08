<template>
  <NavBar></NavBar>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Cadastro de Produtos</h1>
  <v-row justify="center" class="pr-2">
    <v-col cols="12">
      <v-data-table-virtual :items="filteredProductors" :headers="headers" :search="search" single-expand v-model:expanded="expanded" :fixed-header="true" height="700px">
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
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Novo</span> <span>Produto</span></div>
                  </v-btn>
                </template>
                <span>Clique para adicionar um produto</span>
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
            <span>Clique para editar um Produtor</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.precoMedio`]="{ item }">
          <span v-if="item.precoMedio !== null">{{ formatPrice(item.precoMedio) }}</span>
          <span v-else>-</span>
        </template>
          <!-- <template v-slot:expanded-row="{ item }">
            <tr>
              <td :colspan="9">
                {{ console.log(item) }}
                <ProdutorExpand :produtorData="item"></ProdutorExpand>
              </td>
            </tr>
          </template> -->
      </v-data-table-virtual>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Cadastro de Produto
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = !dialog.create">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovoProduto :currentItem="newItem" :onSubmit="createProduct" :files="files"></NovoProduto>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Editar Produtor: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditProdutor :currentItem="selectedRow" :onSubmit="updateProduct" :files="files"></EditProdutor>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import NovoProduto from "./NovoProduto.vue";
import EditProdutor from "./EditProduto.vue";
import ProdutorExpand from "./ProdutorExpand.vue";
import { useToast } from "vue-toastification";
import UtilsService from '../../../services/utilsService';

export default {
  name: "CadastroProdutor",
  components: {
    NavBar,
    NovoProduto,
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
    products: [],
    headers: [
      { text: "Editar", align: "center", value: "edit" },
      { title: "Descrição do Produto", align: "center", sortable: true, value: "descricao" },
      { title: "Unidade", align: "center", sortable: true, value: "unidade" },
      { title: "Preço Médio", align: "center", sortable: true, value: "precoMedio" },
    ],
    newItem: {},
    selectedRow: {},
    expanded: [],
  }),
  computed: {
    filteredProductors() {
      return this.products;
    },
  },
  methods: {
    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    async getProducts() {
      try {
        const response = await axios.get("/public/produtos");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.products = response.data;
        } else {
          console.log("A resposta da API não é um Array");
          this.products = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.products = [];
      }
    },
    async createProduct(fields) {
      const toast = useToast();
      console.log(fields);
      try {
        const response = await axios.post("/public/produtos/produto", fields);
        console.log(response.data);

        if (response.status !== 201) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Produto cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao cadastrar produto: ", error);
      } finally {
        this.dialog = false;
        this.getProducts();
      }
    },

    async updateProduct(fields) {
      const toast = useToast();

      try {
        const response = await axios.put(`/public/produtos/produto/${fields.id}`, fields);

        console.log(response.data);

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Produto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar produto: ", error);
      } finally {
        this.dialog.update = false
        this.getProducts()
      }
    },

    onSelectRow(row, dialog) {
      this.selectedRow = { ...row };
      this.dialog[dialog] = true;
    },
  },
  mounted() {
    this.getProducts();
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
