<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-text-field class="flex-item-nome" density="compact" name="nome" v-model="currentItem.descricao" variant="outlined" :rules="requiredField" >
          <template v-slot:label>
            <span>Descrição <span style="color: red">*</span></span>
          </template>
        </v-text-field>

        <v-select density="compact" name="unidade" :items="unidade" item-title="type" item-value="value" v-model="currentItem.unidade" variant="outlined" :rules="requiredField" clearable>
          <template v-slot:label>
            <span>Unidade <span style="color: red">*</span></span>
          </template>
        </v-select>
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
  },
  data: () => ({
    isSubmitting: false,
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

    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
  }),
  computed: {
    isFormValid() {
      return !!(
        this.currentItem.descricao &&
        this.currentItem.unidade 
      );
    },
  },
  methods: {
    async localOnSubmit() {
      this.currentItem.descricao = this.currentItem.descricao.toUpperCase();
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
  mounted() {
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
