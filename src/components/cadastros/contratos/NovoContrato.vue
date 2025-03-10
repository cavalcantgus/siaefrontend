<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-select class="flex-item-nome" :items="producers" item-title="nome" item-value="id" return-object density="compact" name="produtor" v-model="currentItem.produtor" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Produtor <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field density="compact" name="numero_contrato" label="N° do Contrato" v-model="currentItem.numeroContrato"  variant="outlined"></v-text-field>
        <v-select class="flex-item-nome" :items="contratantes" item-title="nome" item-value="id" return-object density="compact" name="contratante" v-model="currentItem.contratante" variant="outlined" @update:model-value="getCpfContratante($event)" :rules="requiredField">
          <template v-slot:label>
            <span>Contratante <span style="color: red">*</span></span>
          </template>
        </v-select>        
        <v-text-field density="compact" name="cpf_contratante" label="CPF do Contratante" v-mask="'###.###.###-##'" v-model="cpfContratante"  variant="outlined"></v-text-field>
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
import ConfirmButton from "../../template/ConfirmButton.vue";
import axios from "@/services/axios.js";

export default {
  name: "NovoContrato",
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
    cpfContratante: null,
    contratantes: [],
    isSubmitting: false,
    producers: [],
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

    resetState() {
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null;
      });
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
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getProducers() {
      try {
        const response = await axios.get("/public/projetos")
        this.producers = response.data.flatMap(
          (item) => item.produtor || []
        )
        console.log(this.producers)
      } catch(error) {
        console.log("Error: ", error);
        this.producers = [];
      }
    },

    async getContratantes() {
      try {
        const response = await axios.get("/public/contratantes")
        this.contratantes = response.data
      } catch(error) {
        console.log("Error: ", error);
        this.contratantes = [];
      }
    }
  },
  mounted() {
    this.getProducers(), this.getContratantes()
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

.flex-item-especificao {
  flex: 1 1 550px !important;
}
</style>
