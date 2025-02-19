<template>
  <h3 class="mt-2">Detalhes de Produtor</h3>
  <h4 align="start" class="pa-2">
    Dados Pessoais
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense style="height: 150px" class="border-md pa-2">
    <v-col cols="3" align="start" class="h-50">
      <h4>Nome:</h4>
      <p>{{ produtorData.nome }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-50">
      <h4>Idade:</h4>
      <p>{{ produtorData.dataNascimento }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-50">
      <h4>Email:</h4>
      <p>{{ produtorData.email }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>Contato:</h4>
      <p>{{ produtorData.contato }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>CPF:</h4>
      <p>{{ produtorData.cpf }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>RG:</h4>
      <p>{{ produtorData.rg }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Endereço
    <v-icon>mdi-home</v-icon>
  </h4>
  <v-row dense style="height: 100px" class="border-md pa-2">
    <v-col cols="1" align="start" class="h-75">
      <h4>Estado:</h4>
      <p>{{ produtorData.estado }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Município:</h4>
      <p>{{ produtorData.municipio }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-75">
      <h4>Endereço:</h4>
      <p>{{ produtorData.endereco }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-75">
      <h4>CEP:</h4>
      <p>{{ produtorData.cep }}</p>
    </v-col>
  </v-row>
  <v-row dense style="height: 50vh; width: 452px; margin-top: 34px; border-top: 2px solid #CCCCCC;" class=" float-end">
    <v-data-table-virtual :items="produtorData.documentos" :headers="headers"  class="h-75 " align="start" :items-per-page="3" :fixed-header="true">
      <template v-slot:top>
        <h4 align="center" class="pa-2">
          Documentos do produtor
        </h4>
      </template>
        <template v-slot:[`item.download`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" @click="downloadFile(item)" class="elevation-0">
                <v-icon color="primary">mdi-download-box</v-icon>
              </v-btn>
            </template>
            <span>Clique para baixar um arquivo</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.remove`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" @click="deleteFile(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Clique para remover um arquivo</span>
          </v-tooltip>
        </template>
    </v-data-table-virtual>
   </v-row>
  <h4 align="start" class="pa-2">
    Dados Bancários
    <v-icon>mdi-bank</v-icon>
  </h4>
  <v-row dense style="height: 100px; width: 50vw;" class="border-md pa-2">
    <v-col cols="3" align="start" class="h-75">
      <h4>Banco:</h4>
      <p>{{ produtorData.banco }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Agência:</h4>
      <p>{{ produtorData.agencia }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-75">
      <h4>Tipo de Conta:</h4>
      <p>{{ produtorData.tipoConta }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Conta:</h4>
      <p>{{ produtorData.conta }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados da CAF
    <v-icon>mdi-text-box-multiple-outline</v-icon>
  </h4>
  <v-row dense style="height: 120px; width: 50vw;" class="border-md pa-2">
    <v-col cols="3" align="start" class="h-75">
      <h4>CAF:</h4>
      <p>{{ produtorData.caf }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Validade da CAF:</h4>
      <p>{{ produtorData.validadeCaf }}</p>
    </v-col>
  </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from "@/services/axios.js";

export default {
  name: "ProdutorExpand",
  props: {
    produtorData: Object,
  },
  data: () => ({
    productors: [],
    headers: [
      { title: "Arquivo", align: "start", sortable: true, value: "fileName" },
      { title: "Tipo", align: "start", sortable: true, value: "fileType" },
      { title: "Baixar", align: "start", sortable: true, value: "download" },
      { title: "Remover", align: "start", sortable: true, value: "remove" },
    ],
  }),
  methods: {
    getAge() {
      const date = new Date();
      const bornDate = new Date(this.produtorData?.dataNascimento);

      let age = date.getFullYear() - bornDate.getFullYear();
      const m = date.getMonth() - bornDate.getMonth();

      if (m < 0 || (m === 0 && date.getDate() < bornDate.getDate())) {
        age--;
      }
      this.produtorData.dataNascimento = age
    },

    downloadFile(item) {
        const url = `https://syssiae.ddns.net:8080/document/download/${item?.fileName}`
        const link = document.createElement('a')
        link.href = url
        link.download = item.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    },

    async deleteFile(item) {
      const toast = useToast()
      console.log("Id do arquivo: ", item.id)
      try {
        const response = await axios.delete(`/document/delete/${item.id}/${this.produtorData.id}`)
        if(response.status !== 204) {
          throw new Error("Erro: ", response.status)
        }
        toast.success("Arquivo removido com sucesso!")
      } catch (error) {
        toast.error("Erro ao remover arquivo: ", error)
      }
    },

    async getProductors() {
      try {
        const response = await axios.get("/public/produtores");
        console.log(response.data);

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
    this.getAge(),
    console.log(this.produtorData?.documentos)
  },
};
</script>

<style scoped></style>
