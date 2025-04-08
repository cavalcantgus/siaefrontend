<template>
  <h3 class="mt-2">Detalhes de Pagamento</h3>
  <h4 align="start" class="pa-2">
    Dados do Pagamento
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense class="border-md pa-2">
    <v-col cols="12" md="4" lg="3" align="start" class="h-50">
      <h4>Produtor:</h4>
      <p>{{ produtorData.produtor.nome }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Conta:</h4>
      <p>{{ produtorData.produtor.conta }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Agência:</h4>
      <p>{{ produtorData.produtor.agencia }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Total Entregue:</h4>
      <p>{{ produtorData.quantidade }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Valor Pago:</h4>
      <p>{{ formatPrice(produtorData.total) }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Data do Pagamento:</h4>
      <p>{{ formatDate(produtorData.data) }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Status do Pagamento:</h4>
      <p>{{ produtorData.status }}</p>
    </v-col>
  </v-row>

  <h4 align="start" class="pa-2" v-if="produtorData.notaFiscal">Documentos</h4>
  <v-row dense class="border-md pa-2" v-if="produtorData.notaFiscal">
    <v-col cols="12" sm="6" md="3" lg="2">
      <v-card class="pa-3" outlined style="height: 200px; overflow: hidden; display: flex; flex-direction: column">
        <v-card-title class="text-h6" style="flex-shrink: 0">Documento {{ produtorData.notaFiscal?.id }}</v-card-title>
        <v-card-text align="start" style="font-size: 0.8rem; overflow-y: auto; flex-grow: 1">
          <p class="text-center"><strong>Arquivo:</strong> {{ produtorData.notaFiscal?.fileName }}</p>
          <v-card-actions>
            <v-row dense>
              <v-col class="text-center" height="200">
                <v-tooltip location="top">
                  <template #activator="{ props }">
                    <v-btn icon v-bind="props" @click="downloadFile(produtorData.notaFiscal)" class="elevation-0" color="#f4f1e4">
                      <v-icon size="30" color="primary">mdi-download-box</v-icon>
                    </v-btn>
                  </template>
                  <span>Clique para baixar um arquivo</span>
                </v-tooltip>
              </v-col>
              <v-col class="text-center" height="200">
                <v-tooltip location="top">
                  <template #activator="{ props }">
                    <v-btn icon v-bind="props" @click="deleteFile(produtorData.notaFiscal)" class="elevation-0" color="#f4f1e4">
                      <v-icon size="30" color="red">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Clique para remover um arquivo</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from "@/services/axios.js";
import UtilsService from "../../../services/utilsService";

export default {
  name: "ProdutorExpand",
  props: {
    produtorData: Object,
  },
  data: () => ({
    productors: [],
    headers: [
      { title: "Arquivo", align: "start", sortable: true, value: "notaFiscal.fileName" },
      { title: "Tipo", align: "start", sortable: true, value: "notaFiscal.fileType" },
      { title: "Baixar", align: "start", sortable: true, value: "download" },
      { title: "Remover", align: "start", sortable: true, value: "remove" },
    ],
  }),
  methods: {
    formatDate(val) {
      return UtilsService.formatDateBr(val);
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    // downloadFile(item) {
    //   const url = `https://siaeserver.com/notas/download/${item?.fileName}`;
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = item?.fileName;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // },

    async deleteFile(item) {
      const toast = useToast();
      console.log("Id do arquivo: ", item.id);
      try {
        const response = await axios.delete(`/notas/delete/${item.id}/${this.produtorData.id}`);
        if (response.status !== 204) {
          throw new Error("Erro: ", response.status);
        }
        toast.success("Arquivo removido com sucesso!");
      } catch (error) {
        toast.error("Erro ao remover arquivo: ", error);
      }
    },

    async getProductors() {
      try {
        const response = await axios.get("/public/produtores");

        if (Array.isArray(response.data)) {
          this.productors = response.data;
        } else {
          console.log("A resposta da API não é um Array");
          this.productors = [];
        }
      } catch (error) {
        console.log("Error: ", error);
        this.productors = [];
      }
    },
  },
  mounted() {
    this.getProductors(), console.log(this.produtorData?.documentos);
  },
};
</script>

<style scoped></style>
