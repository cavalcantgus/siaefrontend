<template>
  <div class="pa-3 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-row class="ml-1 w-100">
          <v-col cols="12" sm="6" md="4" lg="11" xl="12">
            <v-select 
            density="compact" 
            name="producer" 
            :items="producers" 
            item-title="nome" 
            item-value="id" 
            return-object 
            v-model="currentItem.produtor" 
            variant="outlined" 
            :rules="requiredField" 
            clearable>
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
            icon style="margin-left: -26px; margin-bottom: -85px" 
            color="primary" 
            @click="addItem"
            >
              <v-icon left size="20px">mdi-plus</v-icon>
            </v-btn>
            <div v-for="(entrega, index) in currentItem.detalhesEntrega" :key="index" 
            class="grid-second-container
            ">
              <v-col cols="3">
                <v-select item-color="green" 
                :color="isDuplicate ? 'error' : ''" 
                density="compact" 
                :items="products" 
                item-title="descricao" 
                item-value="id" 
                return-object 
                v-model="entrega.produto" 
                variant="outlined" 
                :rules="requiredField" 
                clearable>
                  <template v-slot:label>
                    <span>Produto <span style="color: red">*</span></span>
                  </template>

                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props">
                      <v-row class="d-flex justify-space-between align-start">
                        <v-col class="text-right text-start" >
                          <strong>{{"Estoque: " + estoque.get(item.raw.id)}}</strong>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" label="Unidade" v-model="entrega.produto.unidade" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" label="Preço Médio" v-model="entrega.produto.precoMedio" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="2">
                <vuetify-money density="compact" label="Quantidade" :options="options" v-model="entrega.quantidade" variant="outlined" :disabled="isDuplicate"></vuetify-money>
              </v-col>

              <v-btn v-if="currentItem.detalhesEntrega.length > 1" size="30px" icon color="error" style="margin-top: 15px" @click="removeItem(index)">
                <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
              <v-alert v-if="quantityWarnings[index]" color="error" class="mt-2 mb-6 ml-4" density="compact" min-width="50px" style="font-size: 0.6rem; height: 80px; font-weight: bold">
                {{ quantityWarnings[index] }}
              </v-alert>
              <span v-if="isDuplicate" class="text-start text-error ml-3" style="font-size: 0.8rem; font-weight: bold; width: 100%; margin-top: -25px; margin-bottom: 20px">
                {{ `Itens duplicados. Por favor, remova-os, ou escolha outro.` }}
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row class="w-100" style="margin-top: 15px; margin-left: 3px">
          <v-col cols="4">
            <v-tooltip location="end">
              <template #activator="{ props }">
                <v-text-field v-bind="props" max-width="170px" density="compact" name="dataDaEntrega" type="date" v-model="currentItem.dataDaEntrega" variant="outlined" :rules="requiredField">
                  <template v-slot:label>
                    <span>Data Da Entrega</span>
                    <span style="color: red">*</span>
                  </template>
                </v-text-field>
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
import { id } from "vuetify/locale";

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
    estoque: new Map(),
    totalGeral: 0,
    unidade: "",
    precoMedio: "",
    isSubmitting: false,
    isDuplicate: false,
    projects: [],
    products: [],
    producers: [],
    proofs: [],
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
      masked: false,
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

    "currentItem.produtor": {
      async handler() {
       try {
        await this.getProducts();
        await this.getProofs();
        await this.getProjects();

        this.estoqueProdutos();
       } catch (error) {
        console.error(error)
       }
      },

      deep: true,
    },

    "currentItem.detalhesEntrega": {
      handler(newVal) {
        if (!Array.isArray(newVal)) return; // Garante que newVal é um array antes de iterar
        this.validateQuantity();
        newVal.forEach((item, index) => {
          if (item && item.produto) {
            // Atualiza os valores do produto associado
            const produto = this.products.find((p) => p.id === item.produto.id);
            if (produto) {
              item.produto.unidade = produto.unidade;
              item.produto.precoMedio = produto.precoMedio;
            }
          }
        });

        // Atualiza o total geral após as mudanças
        this.updateTotalGeral();

        // Verifica duplicidade após atualização
        this.isDuplicate = newVal.some((item, index) => newVal.some((otherItem, otherIndex) => index !== otherIndex && item.produto && otherItem.produto && item.produto.id === otherItem.produto.id));
      },
      deep: true,
    },
  },
  computed: {
    isFormValid() {
      const areItemsProductsValid = this.currentItem.detalhesEntrega.every((item) => item.produto);
      return !!(this.currentItem.produtor && areItemsProductsValid && this.quantityValid && !this.isDuplicate);
    },
  },
  methods: {
    validateQuantity() {
      if (!this.projects.length) {
        console.warn("Tentando validar quantidade antes dos projetos carregarem.");
        return;
      }

      this.quantityValid = true;
      this.quantityWarnings = this.currentItem.detalhesEntrega.map((entrega, index) => {
        const produtoId = entrega.produto.id;
        console.log("PRODUTO ID: ", produtoId);
        const quantity = entrega.quantidade || 0;

        if (!produtoId) return null;

        const selectedProjetoProduto = this.projects.find((p) => p.produto.id === produtoId);

        const produtoCadastrado = this.proofs.find((proof) => proof.produto.id === produtoId);

        if (produtoCadastrado) {
          if (!selectedProjetoProduto) {
            console.log(`Produto com ID ${produtoId} não encontrado em projects.`);
            return `Produto com ID ${produtoId} não encontrado.`;
          }

          const quantityDelivered = this.sumQuantity(produtoId);
          const remainingQuantity = selectedProjetoProduto.quantidade - quantityDelivered;

          console.log("Pesquisa: ", selectedProjetoProduto);

          if (quantity > remainingQuantity) {
            this.quantityValid = false;
            return `Limite máximo de entrega para ${selectedProjetoProduto.produto.descricao} (${remainingQuantity}).`;
          }
        } else {
          if (!selectedProjetoProduto) {
            console.log(`Produto com ID ${produtoId} não encontrado em projects.`);
            return `Produto com ID ${produtoId} não encontrado.`;
          }

          const quantityDelivered = selectedProjetoProduto.quantidade;
          
          console.log("Pesquisa: ", selectedProjetoProduto);

          if (quantity > quantityDelivered) {
            this.quantityValid = false;
            return `Limite máximo de entrega para ${selectedProjetoProduto.produto.descricao} (${quantityDelivered}).`;
          }
        }

        this.quantityValid = true;
        return null;
      });
    },

    sumQuantity(produtoId) {
      console.log("PROOFS: ", this.proofs);
      const entregaAnterior = this.proofs.find((e) => e.produto.id === produtoId);
      console.log("ENTREGA ANTERIOR: ", entregaAnterior);

      if (this.proofs.length !== 0) {
        const quantidadeAnterior = entregaAnterior?.quantidade;
        const quantityDelivered = this.proofs.filter((proof) => proof.produto.id === produtoId).reduce((soma, proof) => soma + proof.quantidade, 0);

        console.log("Quantidade Entregue: ", quantityDelivered);
        return quantityDelivered - quantidadeAnterior;
      } else {
        return null;
      }
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    updateTotalGeral() {
      console.log("Método chamado");
      this.totalGeral = this.currentItem.detalhesEntrega
        .reduce((total, entrega) => {
          const quantity = parseFloat(entrega.quantidade) || 0;
          console.log("Quantidade: ", quantity);
          const precoMedio = parseFloat(entrega.produto?.precoMedio) || 0; // Verifique se 'produto' existe
          return total + precoMedio * quantity;
        }, 0)
        .toFixed(2);
    },

    addItem() {
      this.currentItem.detalhesEntrega.push({
        produto: {
          descricao: "",
          epecificacao: "",
          precoMedio: 0,
          unidade: "",
        },
        quantidade: 0,
        total: 0,
      });
      // this.updateTotalGeral();
      // this.validateQuantity();
    },
    removeItem(index) {
      if (this.currentItem.detalhesEntrega && this.currentItem.detalhesEntrega.length > index) {
        this.currentItem.detalhesEntrega.splice(index, 1);
        // this.updateTotalGeral(); // Atualiza o total geral após remoção
        // this.validateQuantity(); // Revalida as quantidades
      }
    },

    resetState() {
      console.log("Método chamado");
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null;
      });
    },

    estoqueProdutos() {
      this.projects.forEach((project) => {
        const produtoId = project.produto.id
        const produtosRelacionados = this.proofs.filter((proof) => proof.produto.id === produtoId)
        if(!produtosRelacionados) {
          const estoque = project.quantidade
          this.estoque.set(produtoId, estoque)
        }

        const quantidadeCadastrada = produtosRelacionados.reduce((soma, item) => soma + item.quantidade, 0)
        const estoque = project.quantidade - quantidadeCadastrada

        this.estoque.set(produtoId, estoque)
      });

      const produtosEliminados = new Map([...this.estoque].filter(([id, qtd]) => qtd === 0))
      this.products = this.products.filter(p => !produtosEliminados.has(p.id))
    },

    async localOnSubmit() {
      try {
        const fields = {
          ...this.currentItem,
          detalhesEntrega: this.currentItem.detalhesEntrega,
        };
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getProjects() {
      try {
        const response = await axios.get(`/public/projetos/projeto/${this.currentItem.produtor.id}`);
        console.log(response.data);

        const { projetoProdutos } = response.data;
        this.projects = [...projetoProdutos];
        console.log(this.projects);
      } catch (error) {
        console.error("Error: ", error);
        this.projects = [];
      }
    },

    async getProducts() {
      try {
        const response = await axios.get(`/public/projetos/projeto/${this.currentItem.produtor.id}`);
        console.log(response.data);

        this.products = [];
        const { projetoProdutos } = response.data;
        projetoProdutos.forEach((p) => {
          const { produto } = p;
          this.products.push(produto);
        });
        console.log(this.products);
      } catch (error) {
        console.error("Error: ", error);
        this.products = [];
      }
    },

    async getProofs() {
      try {
        if (!this.currentItem?.produtor.id) {
          console.log("produtorId é inválido");
          this.proofs = [];
          return;
        }

        const response = await axios.get(`/public/comprovantes/comprovante/${this.currentItem.produtor.id}`);

        if (Array.isArray(response.data)) {
          this.proofs = response.data.flatMap((item) => item.detalhesEntrega || []);
        } else {
          console.log("A resposta da API não é um Array");
          this.proofs = [];
        }

        console.log(this.proofs);
      } catch (error) {
        console.log("Error: ", error);
        this.proofs = [];
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
  async mounted() {
    this.getProjects(), this.getProductors(), this.getProducts(), this.getProofs();

    try {
        await this.getProducts();
        await this.getProofs();
        await this.getProjects();

        this.estoqueProdutos();
       } catch (error) {
        console.error(error)
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
  row-gap: 8px;
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
