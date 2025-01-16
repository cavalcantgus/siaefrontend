<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-text-field class="flex-item-nome" density="compact" name="nome" v-model="currentItem.descricao" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Descrição <span style="color: red">*</span></span>
          </template>
        </v-text-field>

        <v-select density="compact" name="unidade" :items="unidade" item-title="type" item-value="value" v-model="currentItem.unidade" variant="outlined" :rules="requiredField" clearable>
          <template v-slot:label>
            <span>Unidade <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field class="flex-item-especificao" density="compact" name="nome" label="Especificação" v-model="currentItem.especificacao" :counter="255" :counter-value="customCounter" maxlength="255" variant="outlined" :rules="requiredField" :counter-color="light"></v-text-field>
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
    isSubmitting: false,
    unidade: [
      { type: "G", value: "G" }, // Gramas
      { type: "KG", value: "KG" }, // Kilogramas
      { type: "T", value: "T" }, // Toneladas
      { type: "L", value: "L" }, // Litros
      { type: "ML", value: "ML" }, // Mililitros
      { type: "UND", value: "UND" }, // Unidades
      { type: "Maço", value: "Maço" }, // Caixas
      { type: "Caixas", value: "Caixas" }, // Caixas
      { type: "Pacotes", value: "Pacotes" }, // Pacotes
      { type: "Fardos", value: "Fardos" }, // Fardos
      { type: "Sacos", value: "Sacos" }, // Sacos
    ],

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
      return !!(this.currentItem.descricao && this.currentItem.unidade);
    },
  },
  methods: {
    async validateProductName(value) {
      try {
        const response = await axios.get("/public/produtos");
        return !response.data.some((item) => item.descricao.toUpperCase() === value.toUpperCase())
      } catch(error) {
        console.error("Ocorreu um erro: ", error)
      }
    },

    customCounter(value) {
      length = value?.length || 0
      if(value?.length === 255) {
        return `Limite de caracteres alcançado - ${value?.length}`
      } else {
        return `${length}`
      }
    },
    resetState() {
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null;
      });
    },
    async localOnSubmit() {
      const toast = useToast()
      this.currentItem.descricao = this.currentItem.descricao.toUpperCase();
      const isValidName = await this.validateProductName(this.currentItem.descricao)
      if(!isValidName) {
        toast.warning("O nome do produto já está cadastrado")
        return
      }
      try {
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
  mounted() {},
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

.flex-item-especificao {
  flex: 1 1 550px !important;
}
</style>
