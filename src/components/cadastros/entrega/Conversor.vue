<template>
  <div class="pa-4 pr-12 pl-12">
    <div class="grid-container">
      <v-select density="compact" name="produtoA" :items="products" item-title="produto.descricao" item-value="produto.id" v-model="produto1" return-object variant="outlined" :rules="requiredField" clearable>
        <template v-slot:label>
          <span>Produto Cadastrado <span style="color: red">*</span></span>
        </template>
      </v-select>
      <v-select density="compact" name="produtoB" :items="products" item-title="produto.descricao" item-value="produto.id" v-model="produto2" return-object variant="outlined" :rules="requiredField" clearable>
        <template v-slot:label>
          <span>Produto A Ser Entregue <span style="color: red">*</span></span>
        </template>
      </v-select>
      <v-text-field max-width="100" min-width="100" class="flex-item-especificao" density="compact" name="nome" label="Quantidade" v-model="quantidade" maxlength="255" variant="outlined" :rules="requiredField"></v-text-field>
    </div>
    <span class="font-weight-bold">Resultado: {{ result }}</span>
    <v-row class="justify-end dense pt-6">
      <v-col class="text-end">
        <v-tooltip location="top" :disabled="isFormValid">
          <template #activator="{ props }">
            <span v-bind="props">
              <v-btn :color="isValid ? 'green':'grey'" @click="converter" :disabled="!isValid">Converter</v-btn>
            </span>
          </template>
          <span>Preencha todos os campos obrigatórios (*) para habilitar o botão</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "@/services/axios.js";

export default {
    name: 'Conversor',
    data: () => ({
        produto1: null,
        produto2: null,
        quantidade: null,
        products: [],
        result: 0,

        requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],

    }),
    computed: {
        isValid() {
            return !!(this.produto1 && this.produto2 && this.quantidade)
        }
    },
    methods: {
        converter() { 
            const multi = this.produto1.precoMedio * this.quantidade
            this.result = (multi / this.produto2.precoMedio).toFixed(2)
        },

        async getProducts() {
            try {
                const { data } = await axios.get("public/pesquisas")
                this.products = data
                console.log("Pesquisas: ", this.products)
            } catch (error) {
                console.error("Erro: ", error)
            }
        }
    },
    mounted() {
        this.getProducts()
    }
}

</script>

<style scoped>

.grid-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  gap: 0.6rem;
  row-gap: 2px;
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