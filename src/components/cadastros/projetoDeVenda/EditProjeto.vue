<template>
  <div class="pa-3 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-row class="ml-1 w-100">
          <v-col cols="12">
            <v-select density="compact" name="producer" :items="producers" item-title="nome" item-value="id" return-object v-model="currentItem.produtor" variant="outlined" :rules="requiredField" clearable>
              <template v-slot:label>
                <span>Produtor <span style="color: red">*</span></span>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row class="w-100" style="margin-top: -50px; margin-left: -8px">
          <v-col cols="11">
            <v-btn size="30px" icon style="margin-left: -26px; margin-bottom: -85px" color="primary" @click="addItem">
              <v-icon left size="20px">mdi-plus</v-icon>
            </v-btn>
            <div style="border-bottom: 3px solid rgba(0, 100, 0, 0.5); width: 109%; height: 150px; margin-bottom: 10px" v-for="(projeto, index) in currentItem.projetoProdutos" :key="index" class="grid-second-container">
              <v-col cols="3" class="">
                <v-select item-color="green" :color="isDuplicate ? 'error' : ''" density="compact" :items="products" item-title="descricao" item-value="id" return-object v-model="projeto.produto" variant="outlined" :rules="requiredField" clearable>
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
              <v-col cols="2" style="margin-left: -9px">
                <v-text-field density="compact" label="Unidade" v-model="projeto.produto.unidade" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="2" style="margin-left: -9px">
                <v-text-field density="compact" label="Preço Médio" v-model="projeto.produto.precoMedio" variant="outlined" disabled></v-text-field>
              </v-col>
              <v-col cols="1" lg="2" style="margin-left: -9px">
                <vuetify-money density="compact" label="Quantidade" :options="options" v-model="projeto.quantidade" variant="outlined" :disabled="isDuplicate" @update:model-value="updateEstoque($event, index)"></vuetify-money>
              </v-col>
              <v-btn v-if="currentItem.projetoProdutos.length > 1" size="30px" icon color="error" style="margin-top: 15px" @click="removeItem(index)">
                <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
              <v-alert max-width="170px" v-show="quantityWarnings[index]" color="error" class="mt-2 mb-6 ml-4" density="compact" style="font-size: 0.7rem; height: 80px; font-weight: bold; position: absolute; z-index: 10; left: 75%">
                {{ quantityWarnings[index] }}
              </v-alert>
              <span v-if="isDuplicate" class="text-start text-error ml-3" style="font-size: 0.8rem; font-weight: bold; width: 100%; margin-top: -25px; margin-bottom: 20px">
                {{ `Itens duplicados. Por favor, remova-os, ou escolha outro.` }}
              </span>
              <!-- <span class="text-center" style="font-size: 0.8rem; font-weight: bold; display: inline-block; text-align: left !important; width: 100%; margin-top: 60px; margin-left: 782px; position: absolute">
                {{ "Estoque: " + this.copiaEstoque?.produto[index]?.quantidade }}
              </span> -->
              <v-row>
                <div class="mt-1 ml-6 mb-9">
                  <v-text-field density="compact" name="inicioEntrega" label="De" type="date" v-model="projeto.inicioEntrega" variant="outlined" :rules="requiredField"></v-text-field>
                </div>

                <div class="mt-1 ml-3 mr-3">
                  <v-text-field density="compact" name="fimEntrega" label="Até" type="date" v-model="projeto.fimEntrega" variant="outlined" :rules="requiredField" :hide-details="false"></v-text-field>
                </div>
              </v-row>
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
    estoque: new Map(),
    // copiaEstoque: null,
    // estoques: {
    //   produto: [
    //     {
    //       id: null,
    //       quantidade: null,
    //     },
    //   ],
    // },
    alterado: false,
    totalGeral: 0,
    unidade: "",
    precoMedio: "",
    isSubmitting: false,
    isDuplicate: false,
    researchs: [],
    products: [],
    producers: [],
    projects: [],
    totalProjects: [],
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

    "currentItem.projetoProdutos": {
      handler(newVal) {
        console.log("WATCH CHAMOU PRIMEIRO")
        this.validateQuantity();
        newVal.forEach((item) => {
          if (item && item.produto) {
            // Atualiza unidade e preço médio do produto
            const produto = this.products.find((p) => p.id === item.produto.id);
            console.log("PRODUTO: ", produto);
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
        // this.getEstoque();
      },
      deep: true,
    },
  },
  computed: {
    isFormValid() {
      const areItemsProductsValid = this.currentItem.projetoProdutos.every((item) => item.produto);
      return !!(this.currentItem.produtor && areItemsProductsValid && this.quantityValid && !this.isDuplicate);
    },
  },
  methods: {
    // estoque(index, quantidade) {
      
    //   console.log("ESTOQUE CHAMOU PRIMEIRO")
    //   // Evita valores nulos ou negativos
    //   if (!quantidade || quantidade < 0 || quantidade === "" || quantidade === null || quantidade === 0) {
    //     console.log("QUANTIDADE: ", quantidade)
    //     console.log("CAIU NA CONDIÇÂO: ", this.estoques.produto[index].quantidade)
    //     console.log("COPIA ESTOQUE: ", this.copiaEstoque.produto[index].quantidade)
    //     return (this.copiaEstoque.produto[index].quantidade = this.estoques.produto[index].quantidade);
        
    //   }

    //   if (quantidade > this.estoques.produto[index].quantidade) {
    //     console.log("CAIU NA CONDIÇÂO: 1", this.estoques.produto[index].quantidade)
    //     return (this.copiaEstoque.produto[index].quantidade = 0);
    //   }

    //   // Verifica se o índice é válido antes de modificar
    //   if (this.copiaEstoque?.produto?.[index] !== undefined) {
    //     console.log("CAIU NA CONDIÇÂO: 2", this.estoques.produto[index].quantidade)
    //     this.copiaEstoque.produto[index].quantidade = this.estoques.produto[index].quantidade - quantidade;
    //   }
    // },

    validateQuantity() {
      this.quantityWarnings = this.currentItem.projetoProdutos.map((projeto) => {
        const produtoId = projeto.produto.id;
        if (!produtoId) return null;

        const quantidadeSolicitada = projeto.quantidade || 0;
        const pesquisaProduto = this.researchs.find((p) => p.produto.id === produtoId);
        const produtoCadastrado = this.projects.find((p) => p.produto.id === produtoId);

        const produtosRelacionados = this.totalProjects.filter((project) => project.produto.id === produtoId)
        console.log("PRODUTOS RELACIONADOS: ", produtosRelacionados)

        const quantidadeCadastrada = produtosRelacionados.reduce((soma, item) => soma + item.quantidade, 0)
        console.log("QUANTIDADE CADASTRADA: ", quantidadeCadastrada)

        if (produtoCadastrado) {
          const quantidadeRestante = (pesquisaProduto.quantidade - quantidadeCadastrada) + produtoCadastrado.quantidade
        
          if (pesquisaProduto && quantidadeSolicitada > quantidadeRestante) {
            return `A quantidade inserida excede o limite permitido para ${pesquisaProduto.produto.descricao} (${quantidadeRestante}).`;
          }
        } else {
          const quantidadeRestante = (pesquisaProduto.quantidade - quantidadeCadastrada)
          if (pesquisaProduto && quantidadeSolicitada > quantidadeRestante) {
            
            return `A quantidade inserida excede o limite permitido para ${pesquisaProduto.produto.descricao} (${quantidadeRestante}).`;
          }
        }

        return null;
      });
      // Definir quantityValid corretamente
      this.quantityValid = this.quantityWarnings.every((warning) => warning === null);
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    updateTotalGeral() {
      this.totalGeral = this.currentItem.projetoProdutos
        .reduce((total, product) => {
          const quantity = parseFloat(product.quantidade) || 0;
          const precoMedio = parseFloat(product.produto?.precoMedio) || 0; // Verifique se 'produto' existe
          return total + precoMedio * quantity;
        }, 0)
        .toFixed(2);
    },

    addItem() {
      this.currentItem.projetoProdutos.push({
        produto: {
          id: null,
          descricao: "",
          epecificacao: "",
          precoMedio: 0,
          unidade: "",
        },
        quantidade: 0,
        inicioEntrega: null,
        fimEntrega: null,
        total: 0,
      });
    },
    removeItem(index) {
      if (this.currentItem.projetoProdutos && this.currentItem.projetoProdutos.length > index) {
        this.currentItem.projetoProdutos.splice(index, 1);
        this.updateTotalGeral(); // Atualiza o total geral após remoção
        this.validateQuantity(); // Revalida as quantidades
      }
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
          projetoProdutos: this.currentItem.projetoProdutos,
        };
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    getEstoque() {
      this.researchs.forEach((research) => {
        const produtoId = research.produto.id
        const produtosRelacionados = this.totalProjects.filter(p => p.produto.id === produtoId)
        const quantidadeCadastrada = produtosRelacionados.reduce((soma, item) => soma + item.quantidade, 0)
        const estoque = research.quantidade - quantidadeCadastrada

        this.estoque.set(produtoId, estoque)
      })

      const produtosEliminados = new Map([...this.estoque].filter(([id, qtd]) => qtd === 0))
      this.products = this.products.filter(p => !produtosEliminados.has(p.id))
      console.log("MAP ESTOQUE: ", this.estoque)
    },

    // async getEstoque() {


    //   if (!this.currentItem.projetoProdutos?.length || !this.researchs?.length) {
    //     console.warn("Nenhum dado encontrado!");
    //     return;
    //   }


      
    //   this.currentItem.projetoProdutos.forEach((project) => {
    //     const produtosRelacionados = this.totalProjects.filter(p => p.produto.id === project.produto.id)
    //     const quantidadeCadastrada = produtosRelacionados.reduce((soma, item) => soma + item.quantidade, 0)
    //     const research = this.researchs.find((r) => r.produto.id === project.produto.id);
    //     console.log("PROJETO PRODUTO: ",  project)
    //     const existe = this.estoques.produto.some(produto => produto.id === project.produto.id)
    //     if(!existe) {
    //       console.log("EXISTE? ", existe)
    //       console.log("PRODUTO? ", project.produto.id)
    //       console.log("CAIU NA CONDIÇÃO DO EXISTE")
    //       this.estoques.produto.push({
    //         id: project?.produto?.id || null,
    //         quantidade: research?.quantidade - quantidadeCadastrada || 0,
    //       });
    //     }
          
        
    //   });
    //   this.estoques.produto = this.estoques.produto.filter(produto => produto.id !== null)
    //   console.log("ESTOQUE : ", this.estoques);
    //   this.copiaEstoque = JSON.parse(JSON.stringify(this.estoques));
    // },

    // updateEstoque(quantidade, index) {
    //   this.alterado = true;

    //   // Garante que a quantidade não seja nula antes de atualizar
    //   if (quantidade !== null && quantidade !== undefined) {
    //     this.estoque(index, quantidade);
    //     return this.estoques.produto[index].quantidade;
    //   }
    // },

    async getProducts() {
      try {
        const response = await axios.get("/public/produtos");
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

    async getResearchs() {
      try {
        const response = await axios.get("/public/pesquisas");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.researchs = response.data;
          console.log(response.data);
        } else {
          console.log("A resposta da API não é um Array");
          this.researchs = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.researchs = [];
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

    async getTotalProjects() {
      try {
        const response = await axios.get('/public/projetos');
        console.log(response.data); // Para ver a estrutura da resposta

        // Verifica se response.data é um array
        if (Array.isArray(response.data)) {
          // Mapeia e extrai todos os projetoProdutos de cada projeto
          const produtos = response.data.flatMap(projeto => projeto.projetoProdutos || []);

          // Atualiza a variável reativa corretamente
          this.totalProjects = produtos;
          
          console.log(this.totalProjects);
        } else {
          console.error("Formato inesperado da resposta:", response.data);
          this.totalProjects = [];
        }
      } catch (error) {
        console.error("Error: ", error);
        this.totalProjects = [];
      }
    }

  },
  async mounted() {
    this.getProducts(), this.getProductors(), this.getResearchs(), this.updateTotalGeral(), this.getProjects(), this.getTotalProjects();
    try {
      await this.getTotalProjects()
      // this.estoques.produto = []
      this.getEstoque()
      // this.copiaEstoque = JSON.parse(JSON.stringify(this.estoques))
    } catch (error) {
      console.error(error)
    }

  },

  // updated() {
  //   // Chamado sempre que o DOM for atualizado, então verificamos se os dados já existem
  //   if (this.projects.length && this.researchs.length) {
  //     this.getEstoque();
  //   }
  // },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  gap: 0.6rem;
  row-gap: 2px;
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
