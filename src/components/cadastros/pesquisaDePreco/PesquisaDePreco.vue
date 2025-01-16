<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Pesquisa De Preço</h1>
  <v-row justify="center" class="pr-2">
    <v-col cols="12">
      <v-data-table :items="filteredResearch" :headers="dinamycHeaders" :search="search" show-expand v-model:expanded="expanded" :fixed-header="true" height="700px" @update:expanded="onExpand">
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
                    <div class="d-flex flex-column compact-btn-text" style="font-size: 0.6rem"><span>Nova</span> <span>Pesquisa</span></div>
                  </v-btn>
                </template>
                <span>Clique para adicionar uma pesquisa</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12">
              <v-expand-transition>
                <v-card v-show="showFilters" variant="outlined" height="150px">
                  <h4 class="ml-4 mt-4" align="start">Filtrar por</h4>
                  <v-row dense class="py-2 px-4">
                    <v-col :cols="2">
                      <v-select density="compact" variant="outlined" :items="products" label="Produto" item-title="descricao" item-value="descricao" v-model="filters.product.value" outlined dense></v-select>
                    </v-col>
                    <v-col :cols="4">
                      <v-select density="compact" variant="outlined" :items="unidade" label="Unidade" item-title="type" item-value="value" v-model="filters.unidade.value"></v-select>
                    </v-col>
                    <!-- <v-col :cols="2">
                      <v-select hide-details :items="aquisicao" label="Nota Fiscal" item-text="nota_fiscal" item-value="id" v-model="filters.nota_fiscal.value" outlined dense></v-select>
                    </v-col> -->
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
        <template v-slot:[`item.delete`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDeleteRow(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para deletar um Produtor</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-row="{ item }">
          <tr>
            <td :colspan="9" style="background-color: #37622a" class="text-white">
              {{ console.log(item) }}
              <ProdutorExpand :pesquisaData="item"></ProdutorExpand>
            </td>
          </tr>
        </template>
        <template v-slot:[`item.precos`]="{ item }">
          {{ console.log(item.precos) }}
          <template v-for="(preco, index) in item.precos" :key="index">
            <span> {{ preco.valor }}</span>
            <span>-</span>
          </template>
        </template>
        <template v-slot:[`item.precoMedio`]="{ item }">
          <span>{{ formatPrice(item.precoMedio) }}</span>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Cadastro de Produto
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = false">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <NovaPesquisa :currentItem="newItem" :onSubmit="createProduct" :dialogAtivo="dialog.create"></NovaPesquisa>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form align-self-center" width="60%">
          <v-card-title class="sticky-title title-border">
            Editar Produtor: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = false">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <EditPesquisa :currentItem="selectedRow" :onSubmit="updateProduct"></EditPesquisa>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import NovaPesquisa from "./NovaPesquisa.vue";
import EditPesquisa from "./EditPesquisa.vue";
import ProdutorExpand from "./PesquisaExpand.vue";
import { useToast } from "vue-toastification";
import UtilsService from "../../../services/utilsService";
import BtnComeBack from '../../template/BtnComeBack.vue';
import ConfirmButton from "../../template/ConfirmButton.vue";


export default {
  name: "PesquisaDePreco",
  components: {
    NavBar,
    NovaPesquisa,
    ProdutorExpand,
    EditPesquisa,
    BtnComeBack,
    ConfirmButton,
  },
  data: () => ({
    dialog: {
      create: false,
      update: false,
    },
    search: "",
    showFilters: false,
    singleExpand: false,
    showFilters: false,
    products: [],
    research: [],
    filtered: [],
    unidade: [
      { type: "G", value: "G" }, // Gramas
      { type: "Kg", value: "Kg" }, // Kilogramas
      { type: "T", value: "T" }, // Toneladas
      { type: "L", value: "L" }, // Litros
      { type: "Ml", value: "Ml" }, // Mililitros
      { type: "UND", value: "Und" }, // Unidades
      { type: "Maço", value: "Maço" }, // Caixas
      { type: "Caixas", value: "Caixas" }, // Caixas
      { type: "Pacotes", value: "Pacotes" }, // Pacotes
      { type: "Fardos", value: "Fardos" }, // Fardos
      { type: "Sacos", value: "Sacos" }, // Sacos
    ],
    headers: [
      { text: "Editar", align: "center", value: "edit", width: "50px" },
      { text: "Remover", align: "center", value: "delete", width: "50px"},
      { title: "Produto", align: "center", sortable: true, value: "produto.descricao" },
      { title: "Unidade", align: "center", sortable: true, value: "produto.unidade" },
    ],
    newItem: {
      precos: [null, null, null],
    },
    selectedRow: {},
    expanded: [],
    filterActive: false,
    filters: {
      product: { value: null, compareType: "equal", prop: "produto.descricao" },
      unidade: {
        value: null,
        compareType: "equal",
        prop: "produto.unidade",
      },
      data: {
        value: null,
        compareType: "equal",
        prop: "dataPesquisa",
      },
    },
  }),
  watch: {
    "currentItem.precos": {
      handler(newValues) {
        newValues.forEach((preco, index) => {
          preco.valor = this.parseReal(preco.valor);
        });
      },
      deep: true,
    },
  },

  computed: {
    filteredResearch() {
      return this.research
        .filter((item) => {
          return this.filters.product.value ? item.produto.descricao === this.filters.product.value : true;
        })
        .filter((item) => {
          return this.filters.unidade.value ? item.produto.unidade === this.filters.unidade.value : true;
        });
    },
    dinamycHeaders() {
      const headers = [...this.headers];

      if (this.research.length > 0 && Array.isArray(this.research[0].precos)) {
        // this.research.forEach((item) => {
        //   item.precos.forEach((preco) => {
        //     preco.valor = this.formatPrice(preco.valor);
        //   });
        // });
        const numberOfPrices = this.research[0].precos.length;
        for (let i = 0; i < numberOfPrices; i++) {
          headers.push({ title: `Preço ${i + 1}`, align: "center", value: `precos[${i}].valor` });
        }
        headers.push({ title: "Preço Médio", align: "center", value: `precoMedio`})
      }
      return headers;
    },
  },
  methods: {
    onExpand(newExpanded) {
      this.expanded = newExpanded.length > 0 ? [newExpanded[newExpanded.length - 1]] : [];
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    applyFilters() {
      this.filterActive = true;
      this.filtered = this.research.filter((research) => {
        return Object.keys(this.filters).every((key) => {
          const filter = this.filters[key];
          if (filter.value !== null && filter.value !== "") {
            if (filter.compareType === "equal") {
              return research[filter.prop] === filter.value;
            }
          }

          return true;
        });
      });
    },

    clearFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key].value = null;
      });
      this.filterActive = false;
      this.filtered = [];
    },
    async getResearch() {
      try {
        const response = await axios.get("/public/pesquisas");
        console.log("Resposta da Api: ", response.data);

        if (Array.isArray(response.data)) {
          this.research = response.data;
          this.research.forEach((item) => {
            item.precos.forEach((preco) => {
              preco.valor = this.formatPrice(preco.valor);
            });
          });
        } else {
          console.log("A resposta da API não é um Array");
          this.research = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.research = [];
      }
    },

    async createProduct(fields) {
      const toast = useToast();
      console.log(fields);
      try {
        const response = await axios.post("/public/pesquisas/pesquisa", fields);
        console.log(response.data);
        if (response.status !== 201) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Pesquisa cadastrada com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao cadastrar pesquisa: ", error);
      } finally {
        this.dialog.create = false;
        this.getResearch();
      }
    },

    async updateProduct(fields) {
      console.log(fields);
      const toast = useToast();

      try {
        const response = await axios.put(`/public/pesquisas/pesquisa/${fields.id}`, fields);

        console.log(response.data);

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Pesquisa atualizada com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar a pesquisa: ", error);
      } finally {
        this.dialog.update = false;
        this.getResearch();
      }
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

    async deletePesquisa(fields) {
      const toast = useToast();
      try {
        const response = await axios.delete(`/public/pesquisas/pesquisa/${fields.id}`, fields);
        if (response.status !== 204) {
          throw new Error(`Erro: `, response.status);
        }
        toast.success("Pesquisa removida com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar pesquisa: ", error);
        console.error("Erro: ", error);
      } finally {
        this.getResearch();
      }
    },

    onSelectRow(row, dialog) {
      console.log("Linha selecionada: ", this.selectedRow);
      if(dialog === "update") {
        this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
        this.dialog.update = true;
      }
    },

    onDeleteRow(row) {
      this.selectedRow = { ...row };
      this.deletePesquisa(this.selectedRow);
    },
  },
  mounted() {
    this.getResearch(), this.getProducts();
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
