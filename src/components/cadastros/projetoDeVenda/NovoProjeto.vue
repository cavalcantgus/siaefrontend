<template>
  <div class="pa-3 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-row class="ml-1 w-100">
          <v-col cols="">
            <v-select density="compact" name="producer" :items="producers" item-title="nome" item-value="id" v-model="currentItem.produtorId" variant="outlined" :rules="requiredField" clearable>
              <template v-slot:label>
                <span>Produtor <span style="color: red">*</span></span>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row class="w-100" style="margin-top: -50px; margin-left: -8px">
          <v-col cols="12">
            <v-btn size="30px" icon style="margin-left: -26px; margin-bottom: -85px" color="primary" @click="addItem">
              <v-icon left size="20px">mdi-plus</v-icon>
            </v-btn>
            <div v-for="(produtoId, index) in items.itemsProducts" :key="index" class="grid-second-container">
              <v-col cols="">
                <v-select :color="isDuplicate? 'error': ''" density="compact" name="product" :items="products" item-title="produto.descricao" item-value="id" v-model="items.itemsProducts[index].produtoId" variant="outlined" :rules="requiredField" clearable>
                  <template v-slot:label>
                    <span>Produto <span style="color: red">*</span></span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" name="unidade" label="Unidade" v-model="items.itemsProducts[index].unidade" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" name="precoMedio" label="Preço Médio" v-model="items.itemsProducts[index].precoMedio" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="2">
                <vuetify-money density="compact" name="quantidade" label="Quantidade" :options="options" v-model="items.itemsQuantity[index]" variant="outlined" :disabled="isDuplicate"></vuetify-money>
              </v-col>
              <v-btn v-if="items.itemsProducts.length > 1" size="30px" icon color="error" style="margin-top: 15px" @click="removeItem(index)">
                <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
              <v-alert v-if="quantityWarnings[index]" color="error" class="mt-2 mb-6 ml-4" density="compact" style="font-size: 0.8rem; height: 70px">
                {{ quantityWarnings[index] }}
              </v-alert>
              <span v-if="isDuplicate" class="text-start text-error ml-3" style="font-size: 0.8rem; font-weight: bold; width: 100%; margin-top: -25px; margin-bottom: 20px;">
                {{ `Itens duplicados. Por favor, remova-os, ou escolha outro.` }}
            </span>
            </div>
          </v-col>
        </v-row>
        <v-row class="w-100" style="margin-top: 15px; margin-left: 3px">
          <v-col cols="4">
            <v-tooltip location="end">
              <template #activator="{ props }">
                <v-text-field v-bind="props" max-width="170px" density="compact" name="dataProjeto" label="Data do Projeto" type="date" v-model="currentItem.dataProjeto" variant="outlined" :rules="requiredField"></v-text-field>
              </template>
              <span>Obs: Utilizar a data de realização da Chamada Pública</span>
            </v-tooltip>
          </v-col>
          <v-col align="end" class="align-self-center">
            <h4>Total</h4>
            <span>{{ formatPrice(totalGeral) }}</span>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-row class="justify-end dense pt-6">
      <v-col class="text-end">
        <v-tooltip location="top" :disabled="isFormValid">
          <template #activator="{ props }">
            <span v-bind="props">
              <ConfirmButton :color="isFormValid ? 'success' : 'grey'" :onConfirm="localOnSubmit" :loading="isSubmitting" :disabled="!isFormValid || isSubmitting">Salvar</ConfirmButton>
            </span>
          </template>
          <span>Preencha todos os campos obrigatórios (*) para habilitar o botão</span>
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
    totalGeral: 0,
    unidade: "",
    precoMedio: "",
    isSubmitting: false,
    isDuplicate: false,
    products: [],
    producers: [],
    items: {
      itemsProducts: [
        {
          produtoId: null,
          unidade: null,
          precoMedio: null,
        },
      ],
      itemsQuantity: [],
    },
    options: {
      decimal: ",",
      thousands: ".",
      precision: "2",
      masked: false
    },
    quantityWarnings: [],
    quantityValid: true,
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
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
               this.isDuplicate = newVal.some((prod, i) => i !== index && prod.produtoId === item.produtoId);
            }
            const produto = this.products.find((p) => p.id === item.produtoId);
            console.log(item.produtoId)
              if (produto) {
                this.items.itemsProducts[index].unidade = produto.produto.unidade;
                this.items.itemsProducts[index].precoMedio = produto.produto.precoMedio;
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
      const areItemsProductsValid = this.items.itemsProducts.every((item) => item.produtoId && item.unidade && item.precoMedio);
      return !!(this.currentItem.produtorId && areItemsProductsValid && this.quantityValid && !this.isDuplicate);
    },
  },
  methods: {
    validateQuantity() {
      this.quantityWarnings = this.items.itemsProducts.map((pesquisa, index) => {
        const pesquisaId = pesquisa.produtoId;
        const quantity = this.items.itemsQuantity[index] || 0;

        if (!pesquisaId) return null;

        const selectedPesquisa = this.products.find((p) => p.id === pesquisaId);

        if (selectedPesquisa && quantity > selectedPesquisa.quantidade) {
          this.quantityValid = false;
          return `A quantidade inserida excede o limite permitido para ${selectedPesquisa.produto.descricao} (${selectedPesquisa.quantidade}).`;
        }
        this.quantityValid = true;
        return null;
      });
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
    },
    addItem() {
      this.items.itemsProducts.push({
        produtoId: null,
        unidade: null,
        precoMedio: null,
      });
      this.items.itemsQuantity.push(null);
    },
    removeItem(index) {
      this.items.itemsProducts.splice(index, 1);
      this.items.itemsQuantity.splice(index, 1);
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
      } catch (error) {
        console.log("Error: ", error);
        this.products = [];
      }
    },

    async getProductors() {
      try {
        const response = await axios.get("/public/produtores");
        console.log(response.data);

        this.producers = response.data;
      } catch (error) {
        console.log("Error: ", error);
        this.producers = [];
      }
    },
  },
  mounted() {
    this.getResearchs(), this.getProductors();
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
</style>
