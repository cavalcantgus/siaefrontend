<template>
  <v-data-table-virtual density="comfortable"  :headers="headers" :items="proofsPerMonthYear" height="300px" no-data-text="Nenhuma entrega encontrada">
    <template v-slot:top>
      <v-row class="mt-2 mb-6 mx-3 ga-2" align="center">
        <span style="color: gray; font-weight: bold;">Buscar entregas por:</span>
        <v-col cols="3" class="mt-4">
          <v-select density="compact" :items="months" item-title="text" item-value="value" variant="outlined" v-model="selectedMonth" clearable>
            <template v-slot:label> <span>Mês</span> <span style="color: red;" >*</span> </template>
          </v-select>
        </v-col>
        <v-col cols="3" class="mt-4">
          <v-select density="compact" :items="gerarAnos" variant="outlined" v-model="selectedYear" clearable>
            <template v-slot:label> <span>Ano</span> <span style="color: red;">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
    </template>
  </v-data-table-virtual>
  <v-row class="justify-end dense mt-2 mb-3">
    <v-col class="button-group mr-9" align="end" cols="2">
      <v-tooltip location="start" :disabled="this.selectedMonth && this.selectedYear">
        <template #activator="{ props }">
          <div v-bind="props" class="d-inline-block">
            <v-btn color="primary" class="elevation-3 compact-btn ml-3" min-width="25%" @click="localOnSubmit" :disabled="!selectedMonth || !selectedYear">
              <template v-slot:append>
                <v-icon small class="compact-icon" start>mdi-download</v-icon>
              </template>
              <div class="d-flex flex-column compact-btn-text"><span>Baixar</span></div>
            </v-btn>
          </div>
        </template>
        <span>Selecione um mês e ano</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import { useToast } from "vue-toastification";

export default {
  name: "RelatorioMensal",
  props: {
    onSubmit: Function
  },
  data: () => ({
    selectedYear: null,
    selectedMonth: null,
    proofs: [],
    filteredProofs: [],
    months: [
      { text: "Janeiro", value: "01" },
      { text: "Fevereiro", value: "02" },
      { text: "Março", value: "03" },
      { text: "Abril", value: "04" },
      { text: "Maio", value: "05" },
      { text: "Junho", value: "06" },
      { text: "Julho", value: "07" },
      { text: "Agosto", value: "08" },
      { text: "Setembro", value: "09" },
      { text: "Outubro", value: "10" },
      { text: "Novembro", value: "11" },
      { text: "Dezembro", value: "12" },
    ],

    headers: [
      { title: "Produtor", align: "center", sortable: true, value: "produtor.nome" },
      { title: "Data Entrega", align: "center", sortable: true, value: "dataDaEntrega" },
      { title: "Quantidade", align: "center", sortable: true, value: "quantidade" },
      { title: "Total Geral", align: "center", sortable: true, value: "total" },
    ],
  }),
  computed: {
    gerarAnos() {
      const anoAtual = new Date().getFullYear();
      const anoInicio = 1900; // Define o ano inicial
      return Array.from({ length: anoAtual - anoInicio + 1 }, (_, i) => anoAtual - i);
    },

    proofsPerMonthYear() {
      if (!this.selectedMonth || !this.selectedYear) {
        console.log("teste");
        this.filteredProofs = this.proofs;
        return this.proofs;
      }

      this.filteredProofs = this.proofs.filter((proof) => {
        const [year, month, day] = proof.dataDaEntrega.split("-").map(Number);

        const yearProof = String(year);
        const monthProof = String(month).padStart(2, "0");

        return String(this.selectedYear) === yearProof && String(this.selectedMonth) === monthProof;
      });

      console.log("Filtrados:", this.filteredProofs);
      return this.filteredProofs;
    },

  },

  methods: {
    async getProofs() {
      try {
        const response = await axios.get("/public/comprovantes");
        console.log(response.data);

        if (Array.isArray(response.data)) {
          this.proofs = response.data;
        } else {
          console.log("A resposta da API não é um Array");
          this.proofs = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.proofs = [];
      }
    },

    async localOnSubmit() {
      const toast = useToast()
      if(!this.selectedMonth || !this.selectedYear) {
        throw new Error("Mês e ano devem ser válidos")
      }

      if(this.filteredProofs.length <= 0) {
        toast.warning(`Nenhuma entrega encontrada para o mês ${this.selectedMonth} e ano ${this.selectedYear}`)
        return;
      }
      try{
        const fields = {
         mes: this.selectedMonth,
         ano: this.selectedYear
        }

        this.onSubmit(fields)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getProofs();
  },
};
</script>

<style scoped>
.compact-btn {
  font-size: 12px !important;
  letter-spacing: -0.2px !important;
  padding: 0 12px !important;
  height: 42px !important;
}

.compact-btn-text {
  font-size: 12px !important;
  line-height: 1.2 !important;
  text-align: center !important;
}

.button-group {
  gap: 10px !important;
}

.text-xs {
  font-size: 12px;
}
</style>
