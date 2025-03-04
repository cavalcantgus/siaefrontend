<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-text-field density="compact" name="contratante" label="Contratante" v-model="currentItem.nome"  variant="outlined"></v-text-field>
        <v-text-field density="compact" name="cpf_contratante" label="CPF" v-model="currentItem.cpf" v-mask="'###.###.###-##'"  variant="outlined" :rules="cpfRules"></v-text-field>
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
  name: "EditContratante",
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
      return !!(this.currentItem.nome && this.currentItem.cpf);
    },

    cpfRules() {
      return [(v) => !v || this.validateCpf(v) || "CPF inválido"];
    },
  },
  methods: {
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
      this.currentItem.nome = this.currentItem.nome.toUpperCase()
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
