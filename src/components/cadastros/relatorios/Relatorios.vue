<template>
  <NavBar></NavBar>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Relatórios</h1>
  <div class="pa-2 ma-5">
    <v-row dense class="justify-start ga-4" align="center" wrap>
      <v-col cols="12" md="2" lg="2">
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Total de Produtores</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" lg="2">
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Total de Produtos</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" lg="2">
        <v-card class="justify-start" color="surface-light rounded-lg" height="150">
          <template v-slot:title>
            <span class="font-weight" style="color:#0c410e;">Estoque Total</span>
          </template>
          <v-card-text class="bg-surface-light pt-4">
            <span style="font-size: 1.8rem; font-weight: 400; color: #0c410e;">{{ producers.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" lg="2">
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
    AtaDaChamada,

  },
  data: () => ({
    producers: [],
    newItem: {},
    dialog: {
      download: false
    }
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
    },
  },
  mounted() {
    this.getProducers()
  }
};
</script>

<style scoped>
.sticky-title,
.sticky-icon {
  display: flex;
  font-weight: bold !important;
  top: 0 !important; /* Distância do topo da página */
  color: #57a340;
  justify-content: flex-end;
  align-items: flex-end;
}
.card-form::-webkit-scrollbar {
  width: 10px;
}

.card-form::-webkit-scrollbar-track {
  background: transparent;
}

.card-form::-webkit-scrollbar-thumb {
  background-color: rgba(87, 163, 64, 0.7);
  border-radius: 10px;
}

.card-form::-webkit-scrollbar-button {
  display: none;
}

td {
  padding: 16px;
  background-color: #f9f9f9;
}

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

.status-text {
  font-size: 12px;
  line-height: 1.1;
}

/* Estilo para mover o ícone de expandir para a esquerda */
.v-data-table__mobile-row .v-data-table__expand-icon {
  order: -1; /* Mover o ícone para a esquerda */
  margin-right: 0; /* Remover qualquer margem direita */
}

.v-data-table__expand-icon {
  margin-left: 0; /* Remover qualquer margem esquerda */
}

.report {
  display: flex;
  color: gray;
  width: 100vw;
  margin-left: 50px;
  justify-content: center;
}
</style>
