<template>
  <NavBar></NavBar>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Relatórios</h1>
  <div class="pa-2 ma-5">
    <v-row dense class="justify-start ga-4" align="center" wrap>
      <v-col >
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Total de Produtores</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col >
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Total de Produtos</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col >
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Estoque Total</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col >
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Total de Produtores</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavBar from "../../NavBar.vue";
import axios from "@/services/axios.js";

export default {
  name: "Relatorios",
  components: {
    NavBar,
  },
  data: () => ({
    producers: [],
  }),
  methods: {
    async getProducers() {
        try {
            const { data } = await axios.get("/public/produtores")
            this.producers = data
            console.log("PRODUTORES: ", this.producers)
        } catch (error) {
            console.error("Erro: ", error)
        }   
    }
  },
  mounted() {
    this.getProducers()
  }
};
</script>
