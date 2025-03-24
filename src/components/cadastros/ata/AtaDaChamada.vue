<template>
  <v-container class="pa-5">
    <v-form @submit.prevent="localOnSubmit" ref="formRef">
      <v-row>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" v-model="currentItem.prefeito" :rules="requiredField">
            <template v-slot:label> <span>Prefeito </span><span style="color: red">*</span> </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" v-model="currentItem.presidente" :rules="requiredField">
            <template v-slot:label> <span>Presidente </span><span style="color: red">*</span> </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" v-model="currentItem.nutricionista" :rules="requiredField">
            <template v-slot:label> <span>Nutricionista </span><span style="color: red">*</span> </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" v-model="currentItem.secCpl" :rules="requiredField">
            <template v-slot:label> <span>Sec. Da CPL </span><span style="color: red">*</span> </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <v-text-field variant="outlined" density="compact" v-model="currentItem.secEduc" :rules="requiredField">
            <template v-slot:label> <span>Sec. De Educação </span><span style="color: red">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="pa-3">
        <v-card class="custom-scroll" variant="outlined" width="85%" height="150px" style="overflow-y: auto; max-height: 250px; border: 1px solid #ccc">
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
                <v-btn :disabled="this.items.membros.length > 1 ? false : true" :color="this.items.membros.length > 1 ? 'error' : 'gray'" size="30px" icon class="ml-2 mb-6" @click="removeItem(index)" style="position: absolute">
                  <v-icon size="20px">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row>
        <v-col cols="3" class="mt-7">
          <v-tooltip location="end">
            <template #activator="{ props }">
              <v-text-field v-bind="props" max-width="170px" density="compact" name="dataProjeto" v-model="currentItem.data" type="date" variant="outlined" :rules="requiredField">
                <template v-slot:label> <span>Data Da Reunião</span> <span style="color: red">*</span> </template>
              </v-text-field>
            </template>
            <span>Obs: Utilizar a data da reunião</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-7">
          <v-tooltip location="end">
            <template #activator="{ props }">
              <v-text-field v-bind="props" max-width="170px" density="compact" name="horaProjeto" v-model="currentItem.hora" type="time" variant="outlined" :rules="requiredField">
                <template v-slot:label>
                  <span>Hora Da Reunião</span>
                  <span style="color: red">*</span>
                </template>
              </v-text-field>
            </template>
            <span>Obs: Utilizar a hora da reunião</span>
          </v-tooltip>
        </v-col>
        <v-col class="text-end mt-7">
          <v-tooltip location="top" :disabled="isFormValid">
            <template #activator="{ props }">
              <span v-bind="props">
                <ConfirmButton :onConfirm="localOnSubmit" :color="isFormValid ? 'success' : 'grey'" :disabled="!isFormValid">Salvar</ConfirmButton>
              </span>
            </template>
            <span>Preencha todos os campos obrigatórios (*) para habilitar o botão</span>
          </v-tooltip>
        </v-col>
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
    dialogAtivo: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ConfirmButton,
  },
  data: () => ({
    items: {
      membros: [{ nome: null }],
    },
    requiredField: [(e) => (e !== null && e !== undefined && e !== "") || "Obrigatório"],
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
      return !!(this.currentItem.prefeito && this.currentItem.presidente && this.currentItem.nutricionista && this.currentItem.secCpl && this.currentItem.secEduc && this.currentItem.data);
    },
  },
  methods: {
    resetState() {
      this.items.membros = [];
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = null;
      });
    },
    addItem() {
      this.items.membros.push({ nome: null });
    },
    removeItem(index) {
      this.items.membros.splice(index, 1);
    },

    localOnSubmit() {
      try {
        let membrosValidos = this.items.membros.filter((m) => m.nome); // Remove membros vazios

        const fields = {
          ...this.currentItem,
          membros: membrosValidos.length ? membrosValidos.map((item) => item.nome) : [],
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
