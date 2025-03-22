<template>
  <v-container class="pa-5">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <v-row>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" label="Prefeito *" v-model="currentItem.prefeito"></v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" label="Presidente *" v-model="currentItem.presidente"></v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" label="Nutricionista *" v-model="currentItem.nutricionista"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pa-3">
        <v-card class="custom-scroll elevation-0" width="85%" height="150px" style="overflow-y: auto; max-height: 250px; border: 1px solid #ccc">
          <v-card-text>
            <v-row>
              <v-col cols="auto">
                <v-btn color="primary" @click="addItem" size="small">
                  Adicionar Membro
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col v-for="(membro, index) in items.membros" :key="index" cols="12" md="6" lg="6" class="d-flex align-center">
                <v-text-field style="margin-left: 50px" v-model="items.membros[index].nome" variant="outlined" density="compact" clearable :label="`Membro ${index + 1} *`"></v-text-field>
                <v-btn v-if="this.items.membros.length > 1" size="30px" icon color="error" class="ml-2 mb-6" @click="removeItem(index)" style="position: absolute">
                  <v-icon size="20px">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row>
        <v-col cols="4" class="mt-7">
          <v-tooltip location="end">
            <template #activator="{ props }">
              <v-text-field v-bind="props" max-width="170px" density="compact" name="dataProjeto" v-model="currentItem.data" type="date" variant="outlined">
                <template v-slot:label> <span>Data Da Ata</span> <span style="color: red">*</span> </template>
              </v-text-field>
            </template>
            <span>Obs: Utilizar a data de recebimento do(s) produto(s)</span>
          </v-tooltip>
        </v-col>
        <v-row>
          <v-col class="mt-11 text-end" style="margin-left: 480px">
            <v-tooltip location="top" :disabled="isFormValid">
              <template #activator="{ props }">
                <span v-bind="props">
                  <v-btn color="error">Limpar</v-btn>
                </span>
              </template>
              <span>Preencha todos os campos obrigatórios (*) para habilitar o botão</span>
            </v-tooltip>
          </v-col>
          <v-col class="text-end mt-11">
            <v-tooltip location="top" :disabled="isFormValid">
              <template #activator="{ props }">
                <span v-bind="props">
                  <ConfirmButton :onConfirm="localOnSubmit" color="success">Salvar</ConfirmButton>
                </span>
              </template>
              <span>Preencha todos os campos obrigatórios (*) para habilitar o botão</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import ConfirmButton from "../../template/ConfirmButton.vue";

export default {
  name: "AtaDaChamada",
  props: {
    onSubmit: Function,
    currentItem: {
      type: Object,
    },
  },
  components: {
    ConfirmButton,
  },
  data() {
    return {
      items: {
        membros: [{ nome: null }],
      },
    };
  },
  methods: {
    addItem() {
      this.items.membros.push({ nome: null });
    },
    removeItem(index) {
      this.items.membros.splice(index, 1);
    },

    localOnSubmit() {
      try {
        const fields = {
          ...this.currentItem,
          membros: this.items.membros.map((item) => item.nome),
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
.grid-second-container {
  color: #000000;
  margin-bottom: -20px;
}
.custom-scroll::-webkit-scrollbar {
  width: 8px; /* Largura da barra */
  margin-right: 10px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent; /* Cor do fundo da barra */
  border-radius: 10px; /* Cantos arredondados */
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888; /* Cor da barra rolante */
  border-radius: 10px; /* Cantos arredondados */
}

.custom-scroll::-webkit-scrollbar-button {
  display: none;
}

.grid-second-container {
  display: flex;
  flex-wrap: wrap;
  color: #000000;
  margin-bottom: -20px;
}
</style>
