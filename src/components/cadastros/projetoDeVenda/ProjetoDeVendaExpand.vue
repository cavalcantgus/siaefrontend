<template>
  <h3 class="mt-2 mb-2">Detalhes do Projeto</h3>
  <v-row dense style="height: 100px" class="border-md pa-2">
    <v-col cols="2" align="start" class="h-75">
      <h4>Data do Projeto:</h4>
      <p>{{ formatDate(projetoData.dataProjeto) }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Qtd de Produtos:</h4>
      <p>{{ projetoData.projetoProdutos.length }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-75">
      <h4>Total Geral:</h4>
      <p>{{ formatPrice(projetoData.total) }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados do Produto
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense style="height: 200px" class="border-md pa-2">
    <v-col v-for="(projeto, index) in projetoData.projetoProdutos" :key="index" cols="2" class="d-flex flex-wrap flex-column mr-16 h-50">
      <div class="d-flex flex-wrap flex-column mr-16" style="height: 175px; border: 2px solid white; width:390px" align="start">
        <p class="pl-3 pt-2" style="margin-right: -100px; font-weight: bold; width: 150px;;">Produto {{ index + 1 }}</p>

        <div class="d-flex container mt-2" align="start" style="width: 100%; height: 100%">
          <v-col cols="12" class="mt-6 pt-2 container" align="start" style="margin-left: -50px">
            <span style="font-weight: bold;">Descrição:</span>
            <p>{{ projeto.produto.descricao }}</p>
            <br />
            <span>Unidade:</span>
            <p>{{ projeto.produto.unidade }}</p>
          </v-col>
          <v-col cols="9" align="start" class="mt-5 container" style="margin-left: -130px; ">
            <span style="font-weight: bold;">Preço Médio:</span>
            <p>{{ formatPrice(projeto.produto.precoMedio) }}</p>
            <br />
            <span>Quantidade:</span>
            <p>{{ projeto.quantidade }}</p>
          </v-col>
        </div>
      </div>
    </v-col>
  </v-row>

  <h4 align="start" class="pa-2">
    Dados do Produtor
    <v-icon>mdi-file-account</v-icon>
  </h4>
  <v-row dense style="height: 150px" class="border-md pa-2">
    <v-col cols="3" align="start" class="h-50">
      <h4>Nome:</h4>
      <p>{{ projetoData.produtor.nome }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-50">
      <h4>Idade:</h4>
      <p>{{ age(projetoData.produtor.dataNascimento) }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-50">
      <h4>Email:</h4>
      <p>{{ projetoData.produtor.email }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>Contato:</h4>
      <p>{{ projetoData.produtor.contato }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>CPF:</h4>
      <p>{{ projetoData.produtor.cpf }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-50">
      <h4>RG:</h4>
      <p>{{ projetoData.produtor.rg }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Endereço
    <v-icon>mdi-home</v-icon>
  </h4>
  <v-row dense style="height: 100px" class="border-md pa-2">
    <v-col cols="1" align="start" class="h-75">
      <h4>Estado:</h4>
      <p>{{ projetoData.produtor.estado }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Município:</h4>
      <p>{{ projetoData.produtor.municipio }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-75">
      <h4>Endereço:</h4>
      <p>{{ projetoData.produtor.endereco }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-75">
      <h4>CEP:</h4>
      <p>{{ projetoData.produtor.cep }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados Bancários
    <v-icon>mdi-bank</v-icon>
  </h4>
  <v-row dense style="height: 100px; width: 50vw" class="border-md pa-2">
    <v-col cols="3" align="start" class="h-75">
      <h4>Banco:</h4>
      <p>{{ projetoData.produtor.banco }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Agência:</h4>
      <p>{{ projetoData.produtor.agencia }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-75">
      <h4>Tipo de Conta:</h4>
      <p>{{ projetoData.produtor.tipoConta }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
      <h4>Conta:</h4>
      <p>{{ projetoData.produtor.conta }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados da CAF
    <v-icon>mdi-text-box-multiple-outline</v-icon>
  </h4>
  <v-row dense style="height: 120px; width: 50vw" class="border-md pa-2 mb-2">
    <v-col cols="3" align="start" class="h-75">
      <h4>CAF:</h4>
      <p>{{ projetoData.produtor.caf }}</p>
    </v-col>
    <v-col cols="2" align="start" class="h-75">
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
      console.log('Método chamado')
      const today = new Date();
      const birthDate = new Date(item);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log(age)
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

    downloadFile(item) {
      const url = `https://localhost:8080/document/download/${item?.fileName}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = item.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
