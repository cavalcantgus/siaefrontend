<template>
  <div class="pa-3 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-row class="ml-1 w-100">
          <v-col cols="12">
            <v-select
              density="compact"
              name="producer"
              :items="producers"
              item-title="nome"
              item-value="id"
              v-model="currentItem.produtorId"
              variant="outlined"
              :rules="requiredField"
              clearable
            >
              <template v-slot:label>
                <span>Produtor <span style="color: red">*</span></span>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row class="w-100" style="margin-top: -50px; margin-left: -8px">
          <v-col cols="11">
            <v-btn
              size="30px"
              icon
              style="margin-left: -26px; margin-bottom: -85px"
              color="primary"
              @click="addItem"
            >
              <v-icon left size="20px">mdi-plus</v-icon>
            </v-btn>
            <div
              style="
                border-bottom: 3px solid rgba(0, 100, 0, 0.5);
                width: 109%;
                height: 150px;
                margin-bottom: 10px;
              "
              v-for="(produtoId, index) in items.itemsProducts"
              :key="index"
              class="grid-second-container"
            >
              <v-col cols="3">
                <v-select item-color="green"
                  :color="isDuplicate ? 'error' : ''"
                  density="compact"
                  name="product"
                  :items="products"
                  item-title="produto.descricao"
                  item-value="id"
                  v-model="items.itemsProducts[index].produtoId"
                  variant="outlined"
                  :rules="requiredField"
                  clearable
                >
                  <template v-slot:label>
                    <span>Produto <span style="color: red">*</span></span>
                  </template>

                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props">
                      <v-row class="d-flex justify-space-between align-start">
                        <v-col class="text-right text-start" >
                          <strong>{{"Estoque: " + item.raw.quantidade }}</strong>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="2" style="margin-left: -9px">
                <v-text-field
                  density="compact"
                  name="unidade"
                  label="Unidade"
                  v-model="items.itemsProducts[index].unidade"
                  variant="outlined"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="2" style="margin-left: -9px">
                <v-text-field
                  density="compact"
                  name="precoMedio"
                  label="Preço Médio"
                  v-model="items.itemsProducts[index].precoMedio"
                  variant="outlined"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="1" lg="2" style="margin-left: -9px">
                <vuetify-money
                  density="compact"
                  name="quantidade"
                  label="Quantidade"
                  :options="options"
                  v-model="items.itemsQuantity[index]"
                  variant="outlined"
                  :disabled="isDuplicate"
                ></vuetify-money>
              </v-col>
              <v-btn
                v-if="items.itemsProducts.length > 1"
                size="30px"
                icon
                color="error"
                style="margin-top: 15px"
                @click="removeItem(index)"
              >
                <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
              <v-alert
                max-width="170px"
               v-show="quantityWarnings[index]"
                color="error"
                class="mt-2 mb-6 ml-4"
                density="compact"
                style="font-size: 0.7rem; height: 80px; font-weight: bold; position: absolute; z-index: 10; left: 75%"

              >
                {{ quantityWarnings[index] }}
              </v-alert>
              <span
                v-if="isDuplicate"
                class="text-start text-error ml-3"
                style="
                  font-size: 0.8rem;
                  font-weight: bold;
                  width: 100%;
                  margin-top: -25px;
                  margin-bottom: 20px;
                "
              >
                {{
                  `Itens duplicados. Por favor, remova-os, ou escolha outro.`
                }}
              </span>
                <span
                class="text-center"
                style="
                  font-size: 0.8rem;
                  font-weight: bold;
                  display: inline-block;
                  text-align: left !important;
                  width: 100%;
                  margin-top: 60px;
                  margin-left: 782px;
                  position: absolute;
                "
            >
              {{ `Estoque: ${items.estoque[index] || 0}`}}
            </span>

              <v-row>
                <div class="mt-1 ml-6 mb-9">
                  <v-text-field
                    density="compact"
                    name="inicioEntrega"
                    label="De"
                    type="date"
                    v-model="items.itemsInicioEntrega[index]"
                    variant="outlined"
                    :rules="requiredField"
                  ></v-text-field>
                </div>

                <div class="mt-1 ml-3 mr-3">
                  <v-text-field
                    density="compact"
                    name="fimEntrega"
                    label="Até"
                    type="date"
                    v-model="items.itemsFimEntrega[index]"
                    variant="outlined"
                    :rules="requiredField"
                  ></v-text-field>
                </div>
              </v-row>
              
            </div>
          </v-col>
        </v-row>

        <v-row class="w-100" style="margin-top: 15px; margin-left: 3px">
          <v-col cols="4">
            <v-tooltip location="end">
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  max-width="170px"
                  density="compact"
                  name="dataProjeto"
                  label="Data do Projeto"
                  type="date"
                  v-model="currentItem.dataProjeto"
                  variant="outlined"
                  :rules="requiredField"
                ></v-text-field>
              </template>
              <span>Obs: Utilizar a data de realização da Chamada Pública</span>
            </v-tooltip>
          </v-col>
          <v-col align="end" class="align-self-center">
            <h4>Total</h4>
            <span>{{ formatPrice(totalGeral) }}</span
            ><br />
            <span
              v-if="passedOfLimit"
              style="
                color: red;
                font-size: 0.8rem;
                font-weight: bold;
                width: 100%;
                margin-top: -25px;
                margin-bottom: 20px;
              "
            >
              {{ `Limite máximo atingido. Por favor, reduza a quantidade` }}
            </span>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-row class="justify-end dense pt-6">
      <v-col class="text-end">
        <v-tooltip location="top" :disabled="isFormValid">
          <template #activator="{ props }">
            <span v-bind="props">
              <ConfirmButton
                :color="isFormValid ? 'success' : 'grey'"
                :onConfirm="localOnSubmit"
                :loading="isSubmitting"
                :disabled="!isFormValid || isSubmitting"
                >Salvar</ConfirmButton
              >
            </span>
          </template>
          <span
            >Preencha todos os campos obrigatórios (*) para habilitar o
            botão</span
          >
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ConfirmButton from "../../template/ConfirmButton.vue";
import axios from "@/services/axios.js";
import { useToast } from "vue-toastification";
import UtilsService from "../../../services/utilsService";

export default {
  name: "NovoProduto",
  components: {
    ConfirmButton,
  },
  props: {
    onSubmit: Function,
    currentItem: {
      type: Object,
    },
    dialogAtivo: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    passedOfLimit: false,
    totalGeral: 0,
    unidade: "",
    precoMedio: "",
    isSubmitting: false,
    isDuplicate: false,
    products: [],
    producers: [],
    projects: [],
    items: {
      itemsProducts: [
        {
          produtoId: null,
          unidade: null,
          precoMedio: null,
        },
      ],
      itemsQuantity: [],
      itemsInicioEntrega: [],
      itemsFimEntrega: [],
      estoque: []
    },
    options: {
      decimal: ",",
      thousands: ".",
      precision: "2",
      masked: false,
    },
    quantityWarnings: [],
    quantityValid: true,
    requiredField: [
      (e) => (e !== null && e !== undefined && e !== "") || "Obrigatório",
    ],
  }),
  watch: {
    dialogAtivo(newValue) {
      if (!newValue) {
        this.resetState();
      }
    },

    "items.itemsProducts": {
      handler(newVal) {
        this.validateQuantity();
        this.updateTotalGeral();
        newVal.forEach((item, index) => {
          if (item && item.produtoId) {
            if (item && item.produtoId) {
              // Verifica se o produto já existe em outro índice
              this.isDuplicate = newVal.some(
                (prod, i) => i !== index && prod.produtoId === item.produtoId
              );
            }
            const produto = this.products.find((p) => p.id === item.produtoId);
            console.log(item.produtoId);
            if (produto) {
              this.items.itemsProducts[index].unidade = produto.produto.unidade;
              this.items.itemsProducts[index].precoMedio =
                produto.produto.precoMedio;
            }
          }
        });
      },
      deep: true,
    },

    "items.itemsQuantity": {
      handler() {
        this.validateQuantity();
        this.updateTotalGeral();
      },
      deep: true,
    },
  },
  computed: {
    isFormValid() {
      const areItemInicioEntrega = this.items.itemsInicioEntrega.every(
        (item) => item && item.trim() !== "" && !isNaN(Date.parse(item))
      );
      const areItemFimEntrega = this.items.itemsFimEntrega.every(
        (item) => item && item.trim() !== "" && !isNaN(Date.parse(item))
      );
      const areItemsProductsValid = this.items.itemsProducts.every(
        (item) => item.produtoId && item.unidade && item.precoMedio
      );
      return !!(
        this.currentItem.produtorId &&
        areItemsProductsValid &&
        areItemInicioEntrega &&
        areItemFimEntrega &&
        this.quantityValid &&
        !this.isDuplicate &&
        !this.passedOfLimit
      );
    },
  },
  methods: {
    validateQuantity() {
      this.quantityWarnings = this.items.itemsProducts.map(
        (pesquisa, index) => {
          const pesquisaId = pesquisa.produtoId;
          const quantity = this.items.itemsQuantity[index] || 0;

          if (!pesquisaId) return null;

          const selectedPesquisa = this.products.find(
            (p) => p.id === pesquisaId
          );

          this.items.estoque[index] = selectedPesquisa.quantidade - quantity;

          if (selectedPesquisa && quantity > selectedPesquisa.quantidade) {
            this.quantityValid = false;
            return `Limite permitido para ${selectedPesquisa.produto.descricao} (${selectedPesquisa.quantidade}).`;
          }
          this.quantityValid = true;
          return null;
        }
      );
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    updateTotalGeral() {
      this.totalGeral = this.items.itemsProducts
        .reduce((total, product, index) => {
          const quantity = this.items.itemsQuantity[index] || 0;
          const precoMedio = parseFloat(product.precoMedio) || 0;
          return total + precoMedio * quantity;
        }, 0)
        .toFixed(2);

      this.passedOfLimit = this.totalGeral > 40000 ? true : false;
    },
    addItem() {
      this.items.itemsProducts.push({
        produtoId: null,
        unidade: null,
        precoMedio: null,
      });
      this.items.itemsQuantity.push(null);
      this.items.itemsInicioEntrega.push(null);
      this.items.itemsFimEntrega.push(null);
    },
    removeItem(index) {
      this.items.itemsProducts.splice(index, 1);
      this.items.itemsQuantity.splice(index, 1);
      this.items.itemsInicioEntrega.splice(index, 1);
      this.items.itemsFimEntrega.splice(index, 1);
    },
    resetState() {
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null;
      });
    },
    async localOnSubmit() {
      try {
        const fields = {
          ...this.currentItem,
          pesquisasId: this.items.itemsProducts.map((item) => item.produtoId),
          inicioEntrega: this.items.itemsInicioEntrega,
          fimEntrega: this.items.itemsFimEntrega,
          quantidade: this.items.itemsQuantity,
        };
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getResearchs() {
      try {
        const response = await axios.get("/public/pesquisas");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.products = response.data;
          console.log(response.data);
        } else {
          console.log("A resposta da API não é um Array");
          this.products = [];
        }
        this.products.sort((a, b) => a.produto.descricao.localeCompare(b.produto.descricao))
      } catch (error) {
        console.log("Error: ", error);
        this.products = [];
      }
    },

    async getProductors() {
      try {
        const { data } = await axios.get("/public/produtores");

        if (!this.projects?.length) {
          console.warn("Nenhum projeto encontrado!");
          return;
        }

        // Obtém todos os IDs de produtores que devem ser removidos
        const excludedProducerIds = this.projects.map(project => project.produtor.id);

        // Filtra os produtores, excluindo os que estão na lista de IDs
        this.producers = data.filter(prod => !excludedProducerIds.includes(prod.id));

        console.log("PRODUTORES: ", this.producers);
        this.producers.sort((a, b) => a.nome.localeCompare(b.nome))
      } catch (error) {
        console.error("Error: ", error);
        this.producers = [];
      }
    },


    async getProjects() {
      try {
        const response = await axios.get(`/public/projetos`);
        this.projects = response.data;
      } catch (error) {
        console.error("Error: ", error);
        this.projects = [];
      }
    },
  },
  async mounted() {
    this.getResearchs();
    try {
      await this.getProjects()

      this.getProductors()
    } catch (error) {
      console.error("Erro: ", error)
    }
  },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  gap: 0.6rem;
  row-gap: 6px;
}

.grid-second-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  margin-bottom: -20px;
}

.grid-container .v-text-field {
  flex: 1 1 200px;
}

.flex-item-nome {
  flex: 1 1 350px !important;
}

.flex-item-especificao {
  flex: 1 1 550px !important;
}

.v-menu .v-list-item {
  font-size: 14px;
  border-bottom: 2px solid #949494; /* Linha entre os itens */
}

.v-menu .v-list-item:last-child {
  border-bottom: none; /* Remove a borda do último item */
}

</style>
