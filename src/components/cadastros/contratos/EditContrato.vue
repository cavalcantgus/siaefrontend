<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-select class="flex-item-nome" :items="producers" item-title="nome" item-value="id" return-object density="compact" name="produtor" v-model="currentItem.produtor" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Produtor <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field density="compact" name="numero_contrato" label="N° do Contrato" v-model="currentItem.numeroContrato" variant="outlined"></v-text-field>
        <v-select class="flex-item-nome" :items="contratantes" item-title="nome" item-value="id" return-object density="compact" name="contratante" v-model="currentItem.contratante" variant="outlined" @update:model-value="getCpfContratante($event)" :rules="requiredField">
          <template v-slot:label>
            <span>Contratante <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field density="compact" name="cpf_contratante" label="CPF do Contratante" v-mask="'###.###.###-##'" v-model="cpfContratante" variant="outlined"></v-text-field>
        <v-text-field class="custom-date-field" density="compact" name="data_contratacao" v-model="currentItem.dataContratacao" variant="outlined" type="date" :rules="requiredField">
          <template v-slot:label>
            <span>Data da Contratação<span style="color: red">*</span></span>
          </template>
        </v-text-field>
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
import axios from "@/services/axios.js";
import ConfirmButton from "../../template/ConfirmButton.vue";

export default {
  name: "EditContrato",
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
    cpfContratante: null,
    contratantes: [],
    isSubmitting: false,
    producers: [],
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
  }),
  computed: {
    isFormValid() {
      return !!(this.currentItem.produtor && this.currentItem.dataContratacao);
    },

    cpfRules() {
      return [(v) => !v || this.validateCpf(v) || "CPF inválido"];
    },
  },
  methods: {
    getCpfContratante(contratante) {
      this.cpfContratante = contratante?.cpf
    },

    validateCpf(cpf) {
      const cpfClean = cpf.replace(/\D/g, "");
      if (cpfClean.length !== 11) return false;
      if (/^(\d)\1+$/.test(cpf)) return false;

      let add = 0;

      for (let i = 0; i < 9; i++) {
        add += parseInt(cpfClean.charAt(i)) * (10 - i);
      }
      let firstDigit = add % 11 < 2 ? 0 : 11 - (add % 11);
      if (firstDigit !== parseInt(cpfClean.charAt(9))) return false;
      add = 0;
      for (let i = 0; i < 10; i++) {
        add += parseInt(cpfClean.charAt(i)) * (11 - i);
      }
      let secondDigit = add % 11 < 2 ? 0 : 11 - (add % 11);
      if (secondDigit !== parseInt(cpfClean.charAt(10))) return false;

      if (cpfClean.length !== 11) return false;
      return true;
    },

    async localOnSubmit() {
      try {
        const fields = {
          ...this.currentItem,
        };
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getProducers() {
      try {
        const response = await axios.get("/public/projetos");
        this.producers = response.data.flatMap((item) => item.produtor || []);
        console.log(this.producers);
      } catch (error) {
        console.log("Error: ", error);
        this.producers = [];
      }
    },
    async getContratantes() {
      try {
        const response = await axios.get("/public/contratantes");
        this.contratantes = response.data;
      } catch (error) {
        console.log("Error: ", error);
        this.contratantes = [];
      }
    },
  },
  mounted() {
    this.getProducers(), this.getContratantes();
    this.cpfContratante = this.currentItem?.contratante?.cpf
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

.flex-item-especificao {
  flex: 1 1 550px !important;
}
</style>
