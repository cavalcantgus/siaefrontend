<template>
  <div class="pa-4 pr-12 pl-12">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <div class="grid-container">
        <v-text-field class="flex-item-nome" density="compact" name="nome" v-model="currentItem.nome" variant="outlined" :rules="nomeRules">
          <template v-slot:label>
            <span>Nome <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field class="custom-date-field" density="compact" name="data_de_nascimento" label="Data de nascimento" v-model="currentItem.dataNascimento" variant="outlined" type="date" :rules="requiredField">
          <template v-slot:label>
            <span>Data de Nascimento <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field class="flex-item-email" density="compact" name="email" label="Email" v-model="currentItem.email" :rules="emailRules" variant="outlined"></v-text-field>
        <v-text-field density="compact" name="endereco" label="Endereço" v-model="currentItem.endereco" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Endereço <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-select density="compact" name="escolaridade" :items="escolaridadeOptions" item-title="type" item-value="value" v-model="currentItem.escolaridade" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Escolaridade <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-select density="compact" name="estado-civil" :items="estadoCivilOptions" item-title="type" item-value="value" v-model="currentItem.estadoCivil" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Estado Civil <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field density="compact" name="cpf" label="CPF" v-model="currentItem.cpf" v-mask="'###.###.###-##'" variant="outlined" :rules="cpfRules">
          <template v-slot:label>
            <span>CPF <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field density="compact" name="rg" label="RG" v-model="currentItem.rg" v-mask="'####.####.####-#'" variant="outlined" :rules="rgRules">
          <template v-slot:label>
            <span>RG <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field density="compact" name="cep" label="CEP" v-model="currentItem.cep" variant="outlined" v-mask="'#####-###'" :rules="cepRules">
          <template v-slot:label>
            <span>CEP <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field density="compact" name="contato" label="Contato" v-model="currentItem.contato" v-mask="' (##) #####-####'" :rules="contatoRules" variant="outlined"></v-text-field>
        <v-autocomplete :items="estado" item-title="nome" item-value="id" return-object density="compact" name="estado" label="Estado" v-model="currentItem.estado" :menu-props="{ maxHeight: '250px', top: false }" variant="outlined" @update:modelValue="getCd" clearable :rules="requiredField">
          <template v-slot:label>
            <span>Estado <span style="color: red">*</span></span>
          </template>
        </v-autocomplete>
        <v-autocomplete :items="municipio" item-title="nome" item-value="id" return-object density="compact" name="municipio" label="Município" v-model="currentItem.municipio" :menu-props="{ maxHeight: '250px', top: false }" variant="outlined" clearable :rules="requiredField">
          <template v-slot:label>
            <span>Municipio <span style="color: red">*</span></span>
          </template>
        </v-autocomplete>
        <v-text-field density="compact" name="banco" label="Banco" v-model="currentItem.banco" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Banco <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field density="compact" name="agencia" label="Agência" v-model="currentItem.agencia" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Agência <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-select max-width="220px" density="compact" name="tipo-conta" :items="tiposContas" item-title="type" item-value="value" v-model="currentItem.tipoConta" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Tipo de Conta <span style="color: red">*</span></span>
          </template>
        </v-select>
        <v-text-field max-width="250px" density="compact" name="conta" label="Conta" v-model="currentItem.conta" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>Conta <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field max-width="250px" density="compact" name="caf" label="CAF" v-model="currentItem.caf" variant="outlined" :rules="requiredField">
          <template v-slot:label>
            <span>CAF <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-text-field class="custom-date-field" density="compact" name="validade-caf" label="Data de Validade CAF" v-model="currentItem.validadeCaf" variant="outlined" type="date" append-inner="mdi-calendar" :rules="requiredField">
          <template v-slot:label>
            <span>Validade Da CAF <span style="color: red">*</span></span>
          </template>
        </v-text-field>
        <v-row justify="end" dense class="w-100 mb-5 mt-3">
          <v-col>
            <v-btn-toggle v-model="this.currentItem.sexo" class="elevation-2">
              <v-btn :value="'Masculino'" :color="this.currentItem.sexo === 'Masculino' ? '#2d47d0' : ''">Masculino<v-icon>mdi-gender-male</v-icon></v-btn>
              <v-btn :value="'Feminino'" :color="this.currentItem.sexo === 'Feminino' ? 'pink' : ''">Feminino<v-icon>mdi-gender-female</v-icon></v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-container class="upload-container">
          <v-btn color="primary" @click="triggerFileInput" class="upload-btn">
            <v-icon left>mdi-upload</v-icon>
            Upload de arquivos
          </v-btn>
          <v-file-input ref="fileInput" multiple accept=".pdf,.doc,.docx,.jpg,.png" @change="handleFiles" class="hidden-input"></v-file-input>
          <v-row density="compact" class="file-list" justify="center">
            <v-col v-for="(file, index) in files" :key="index" class="file-item" cols="12" md="2">
              <v-card class="elevation-0 file-card">
                <v-card-title class="pa-0">
                  <v-icon size="20" @click="deleteFile(file)" class="d-flex ml-10 cursor-pointer h-auto">mdi-close</v-icon>
                  <v-icon class="file-icon">mdi-file</v-icon>
                  <span class="file-name">{{ file.name }}</span>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
  name: "NovoProdutor",
  components: {
    ConfirmButton,
  },
  props: {
    onSubmit: Function,
    currentItem: {
      type: Object,
    },
    files: Array,
    dialogAtivo: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isSubmitting: false,
    estadoCivilOptions: [
      { type: "Solteiro(a)", value: "solteiro" },
      { type: "Casado(a)", value: "casado" },
      { type: "Divorciado(a)", value: "divorciado" },
      { type: "Separado(a)", value: "separado" },
      { type: "Viúvo(a)", value: "viuvo" },
      { type: "União Estável", value: "uniao_estavel" },
    ],
    escolaridadeOptions: [
      { type: "Ensino Fundamental Incompleto", value: "fundamental_incompleto" },
      { type: "Ensino Fundamental Completo", value: "fundamental_completo" },
      { type: "Ensino Médio Incompleto", value: "medio_incompleto" },
      { type: "Ensino Médio Completo", value: "medio_completo" },
      { type: "Ensino Técnico", value: "tecnico" },
      { type: "Ensino Superior Incompleto", value: "superior_incompleto" },
      { type: "Ensino Superior Completo", value: "superior_completo" },
      { type: "Pós-Graduação", value: "pos_graduacao" },
      { type: "Mestrado", value: "mestrado" },
      { type: "Doutorado", value: "doutorado" },
      { type: "Pós-Doutorado", value: "pos_doutorado" },
    ],

    tiposContas: [
      { type: "Conta Corrente", value: "Conta Corrente" },
      { type: "Conta Poupança", value: "Conta Poupança" },
      { type: "Conta Salário", value: "Conta Salário" },
      { type: "Conta Digital", value: "Conta Digital" },
    ],
    estado: [],
    municipio: [],
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
    emailRules: [(v) => !v || /.+@.+\..+/.test(v) || "E-mail deve ser válido"],
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
      return !!(
        this.currentItem.nome &&
        this.currentItem.dataNascimento &&
        this.currentItem.endereco &&
        this.currentItem.escolaridade &&
        this.currentItem.estadoCivil &&
        this.currentItem.cpf &&
        this.currentItem.rg &&
        this.currentItem.cep &&
        this.currentItem.estado &&
        this.currentItem.municipio &&
        this.currentItem.banco &&
        this.currentItem.agencia &&
        this.currentItem.tipoConta &&
        this.currentItem.conta &&
        this.currentItem.caf &&
        this.currentItem.validadeCaf &&
        this.files
      );
    },
    nomeRules() {
      return [(v) => !!v || "Obrigatório", (v) => /^[A-Za-zÀ-ÿ\s]+$/.test(v) || "Insira um nome válido"];
    },
    cpfRules() {
      return [(v) => !v || this.validateCpf(v) || "CPF inválido"];
    },

    cepRules() {
      return [(v) => !!v || "Obrigatório", (v) => this.validateCep(v) || "CEP inválido"];
    },

    rgRules() {
      return [(v) => !!v || "Obrigatório", (v) => !v || this.validateRg(v) || "RG inválido"];
    },

    contatoRules() {
      return [(v) => !!v || "Obrigatório", (v) => !v || this.validateContato(v) || "N° de contato inválido"];
    },
  },
  methods: {
    resetState() {
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null
      })
    },
    async localOnSubmit() {
      this.format();
      this.currentItem.nome = this.currentItem.nome.toUpperCase()
      try {
        this.currentItem.estado = this.currentItem.estado.nome;
        this.currentItem.municipio = this.currentItem.municipio.nome;

        const fields = {
          ...this.currentItem,
          files: [...this.files],
        };
        console.log(fields);
        this.onSubmit(fields);
      } catch (error) {
        console.log("Erro: ", error);
      }
    },
    async getUF() {
      try {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        console.log(response.data);
        this.estado = response.data;
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    async getCd(estado) {
      console.log("Teste de chamada");
      const sigla = estado.sigla;
      try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
        console.log("Municípios: ", response.data);
        this.municipio = response.data;
      } catch (error) {
        console.log("Erro: ", error);
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFiles() {
      const selectedFiles = Array.from(event.target.files);
      this.files.push(...selectedFiles);
      console.log(this.files);
    },

    deleteFile(file) {
      this.files.pop(file)
    },

    format() {
      this.currentItem.cpf = this.currentItem.cpf?.replace(/\.|\-/g, "");
      this.currentItem.cep = this.currentItem.cep?.replace(/\.|\-/g, "");
      this.currentItem.rg = this.currentItem.rg?.replace(/\.|\-/g, "");
      this.currentItem.contato = this.currentItem.contato?.replace(/\.|\-|\(|\)|\s/g, "");
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

    validateCep(cep) {
      const cepClean = cep.replace(/\D/g, "");
      if (cepClean.length !== 8) return false;
      const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;
      if (!cepPattern.test(cep)) return false;
      return true;
    },

    validateRg(rg) {
      const rgClean = rg.replace(/\D/g, "");
      if (rgClean.length !== 13) return false;
      const rgPattern = /^[0-9]{4}\.[0-9]{4}\.[0-9]{4}-[0-9]{1}$/;
      return rgPattern.test(rg);
    },

    validateContato(contato) {
      const contatoClean = contato.replace(/\D/g, "");
      if (contatoClean.length !== 11) return false;
      const contatoPattern = /^\s?\(?\d{2}\)?\s?\d{5}-\d{4}$/;
      return contatoPattern.test(contato);
    },
  },
  mounted() {
    this.getUF();
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
