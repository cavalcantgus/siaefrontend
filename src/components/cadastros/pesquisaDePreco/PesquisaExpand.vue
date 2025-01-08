<template>
  <h3 class="mt-2">Detalhes da Pesquisa de Preço</h3>
  <h4 align="start" class="pa-2">
    Dados do Produto
    <v-icon>mdi-corn</v-icon>
  </h4>
  <v-row dense style="height: 100px" class="border-md pa-2 ga-6">
    <v-col cols="auto" align="start" class="h-50">
      <h4>ID:</h4>
      <p>{{ pesquisaData.produto.id }}</p>
    </v-col>
    <v-col cols="auto" align="start" class="h-50">
      <h4>Descrição:</h4>
      <p>{{ pesquisaData.produto.descricao }}</p>
    </v-col>
    <v-col cols="1" align="start" class="h-50">
      <h4>Unidade:</h4>
      <p>{{ pesquisaData.produto.unidade }}</p>
    </v-col>
    <v-col cols="3" align="start" class="h-50">
      <h4>Preço Médio:</h4>
      <p>{{ formatPrice(pesquisaData.produto.precoMedio) }}</p>
    </v-col>
  </v-row>
  <h4 align="start" class="pa-2">
    Dados da Pesquisa
    <v-icon>mdi-note-search</v-icon>
  </h4>
  <v-row dense style="height: 100px" class="border-md pa-2 ga-6 mb-2">
    <v-col cols="auto" align="start" class="h-75">
      <h4>ID:</h4>
      <p>{{ pesquisaData.id }}</p>
    </v-col>
    <v-col cols="auto" align="start" class="h-75">
      <h4>Quantidade:</h4>
      <p>{{ pesquisaData.quantidade }}</p>
    </v-col>
    <v-col cols="auto" align="start" class="h-75" v-for="(preco, index) in pesquisaData.precos" :key="index" >
      <h4>Preço {{ index + 1 }}:</h4>
      <p>{{ preco.valor}}</p>
    </v-col>
    <v-col cols="auto" align="start" class="h-75">
      <h4>Data da Pesquisa:</h4>
      <p>{{ formatDateBr(pesquisaData.dataPesquisa) }}</p>
    </v-col>
    <v-col cols="auto" align="start" class="h-75">
      <h4>Total</h4>
      <p>{{ formatPrice(pesquisaData.total) }}</p>
    </v-col>
  </v-row>
</template>

<script>
import UtilsService from "../../../services/utilsService";

export default {
  name: "ProdutorExpand",
  props: {
    pesquisaData: Object,
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
    formatPrice(val) {
      val = UtilsService.formatReal(val)
      return val
    },

    formatDateBr(val) {
      return UtilsService.formatDateBr(val)
    }
  },
};
</script>

<style scoped></style>
