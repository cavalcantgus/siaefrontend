<template>
  <h3 class="mt-2 mb-2">Detalhes do Projeto</h3>
  <v-row dense style="height: 100px" class="border-md pa-2">
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>Data do Projeto:</h4>
      <p>{{ formatDate(projetoData.dataProjeto) }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>Qtd de Produtos:</h4>
      <p>{{ projetoData.projetoProdutos.length }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>Total Geral:</h4>
      <p>{{ formatPrice(projetoData.total) }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados do Produto
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense class="border-md pa-2">
    <v-col v-for="(projeto, index) in projetoData.projetoProdutos" :key="index" cols="12" sm="6" md="3" lg="3">
      <v-card class="pa-3" outlined style="height: 200px; overflow: hidden; display: flex; flex-direction: column">
        <v-card-title class="text-h6" style="flex-shrink: 0">Produto {{ index + 1 }}</v-card-title>
        <v-card-text align="start" style="font-size: 0.8rem; overflow-y: auto; flex-grow: 1">
          <p><strong>Descrição:</strong> {{ projeto.produto.descricao }}</p>
          <p><strong>Unidade:</strong> {{ projeto.produto.unidade }}</p>
          <p><strong>Preço Médio:</strong> {{ formatPrice(projeto.produto.precoMedio) }}</p>
          <p><strong>Quantidade:</strong> {{ projeto.quantidade }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <h4 align="start" class="pa-2">
    Dados do Produtor
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense style="height: 150px" class="border-md pa-2">
    <v-col cols="12" md="5" lg="3" align="start" class="h-50">
      <h4>Nome:</h4>
      <p>{{ projetoData.produtor.nome }}</p>
    </v-col>
    <v-col cols="12" md="3" lg="1" align="start" class="h-50">
      <h4>Idade:</h4>
      <p>{{ age(projetoData.produtor.dataNascimento) }}</p>
    </v-col>
    <v-col cols="12" md="5" lg="3" align="start" class="h-50">
      <h4>Email:</h4>
      <p>{{ projetoData.produtor.email }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>Contato:</h4>
      <p>{{ projetoData.produtor.contato }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>CPF:</h4>
      <p>{{ projetoData.produtor.cpf }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-50">
      <h4>RG:</h4>
      <p>{{ projetoData.produtor.rg }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Endereço
    <v-icon>mdi-home</v-icon>
  </h4>
  <v-row dense class="border-md pa-2">
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>Estado:</h4>
      <p>{{ projetoData.produtor.estado }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>Município:</h4>
      <p>{{ projetoData.produtor.municipio }}</p>
    </v-col>
    <v-col cols="12" md="5" lg="3" align="start" class="h-75">
      <h4>Endereço:</h4>
      <p>{{ projetoData.produtor.endereco }}</p>
    </v-col>
    <v-col cols="12" md="4" lg="2" align="start" class="h-75">
      <h4>CEP:</h4>
      <p>{{ projetoData.produtor.cep }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados Bancários
    <v-icon>mdi-bank</v-icon>
  </h4>
  <v-row dense class="border-md pa-2">
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>Banco:</h4>
      <p>{{ projetoData.produtor.banco }}</p>
    </v-col>
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>Agência:</h4>
      <p>{{ projetoData.produtor.agencia }}</p>
    </v-col>
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>Tipo de Conta:</h4>
      <p>{{ projetoData.produtor.tipoConta }}</p>
    </v-col>
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>Conta:</h4>
      <p>{{ projetoData.produtor.conta }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados da CAF
    <v-icon>mdi-text-box-multiple-outline</v-icon>
  </h4>
  <v-row dense class="border-md pa-2 mb-2">
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>CAF:</h4>
      <p>{{ projetoData.produtor.caf }}</p>
    </v-col>
    <v-col cols="12" md="2" lg="2" align="start" class="h-75">
      <h4>Validade da CAF:</h4>
      <p>{{ formatDate(projetoData.produtor.validadeCaf) }}</p>
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
    projetoData: Object,
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
    age(item) {
      console.log("Método chamado");
      const today = new Date();
      const birthDate = new Date(item);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log(age);
      return age;
    },

    formatDate(val) {
      return UtilsService.formatDateBr(val);
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    getAge() {
      const date = new Date();
      const bornDate = new Date(this.projetoData?.dataNascimento);

      let age = date.getFullYear() - bornDate.getFullYear();
      const m = date.getMonth() - bornDate.getMonth();

      if (m < 0 || (m === 0 && date.getDate() < bornDate.getDate())) {
        age--;
      }
      this.projetoData.dataNascimento = age;
    },

    async deleteFile(item) {
      const toast = useToast();
      console.log("Id do arquivo: ", item.id);
      try {
        const response = await axios.delete(`/document/delete/${item.id}/${this.projetoData.id}`);
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
    this.getAge();
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-gap: 3px;
}
</style>
