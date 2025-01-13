<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-select density="compact" name="products" :items="products" item-title="descricao" item-value="id" v-model="currentItem.produtoId" :rules="requiredField" variant="outlined">
          <template v-slot:label>
            <span>Produto <span style="color: red">*</span></span>
          </template>
        </v-select>
        <div v-for="(preco, index) in currentItem.precos" :key="index">
          <MoneyInput v-model="currentItem.precos[index]" style="width: 120px" type="number" :label="`Preço ${index + 1}`" density="compact" variant="outlined" :placeholder="`Preço ${index + 1}`"></MoneyInput>
        </div>
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
import MoneyInput from "../../template/MoneyInput.vue";

export default {
  name: "NovaPesquisa",
  components: {
    ConfirmButton,
    MoneyInput,
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
    isSubmitting: false,
    products: [],
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
  }),
  watch: {
    dialogAtivo(newValue) {
      if (!newValue) {
        this.resetState();
      }
    },
  },
  computed: {
    isFormValid() {
      return !!this.currentItem.produtoId;
    },
  },
  methods: {
    resetState() {
      // Resetando os campos, mantendo o array 'precos' e definindo os valores como 'null'
      Object.keys(this.currentItem).forEach((key) => {
        if (key === "precos") {
          // Resetando o array 'precos', colocando cada item como null
          this.currentItem[key] = this.currentItem[key].map(() => null);
        } else {
          this.currentItem[key] = null;
        }
      });
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

    async localOnSubmit() {
      try {
        this.currentItem.dataPesquisa = new Date();
        const fields = {
          ...this.currentItem,
        };
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
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

.grid-container .v-text-field {
  flex: 1 1 200px;
}

.flex-item-nome {
  flex: 1 1 350px !important;
}

.flex-item-email {
  flex: 1 1 300px !important;
}

:deep(.custom-date-field) {
  max-width: 200px !important;
}

:deep(.custom-date-field input[type="date"]::-webkit-calendar-picker-indicator) {
  position: absolute;
  right: 10px;
  z-index: 1;
  cursor: pointer;
}

.upload-container {
  text-align: center;
  justify-content: center;
  align-content: center;
  border: 2px solid #1976d2;
  border-radius: 4px;
}

.upload-btn {
  margin-bottom: 1rem;
}

.hidden-input {
  display: none;
}

.file-list {
  margin-top: 1rem;
}

.file-item {
  display: flex;
  justify-content: center;
}

.file-card {
  display: flex;
  align-items: center;
  padding: 10px;
}

.file-icon {
  margin-right: 10px;
  font-size: 24px;
  color: #1976d2;
}

.file-name {
  display: flex;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  word-break: break-all;
}
</style>
