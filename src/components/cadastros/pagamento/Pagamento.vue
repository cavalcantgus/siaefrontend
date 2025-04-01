<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Pagamentos</h1>
  <v-row justify="center">
    <v-col cols="12">
      <v-data-table :items="filteredUsers" :headers="headers" :search="search" show-expand :single-expand="true" v-model:expanded="expanded" :fixed-header="true" height="700px" @update:expanded="onExpand">
        <template v-slot:top>
          <v-row class="mt-2 mb-8 mx-3">
            <v-col cols="5">
              <v-text-field class="border rounded" dense outlined hide-details v-model="search" label="Pesquisar" :append-inner-icon="'mdi-magnify'" clearable />
            </v-col>
            <v-col class="text-end" cols="2">
              <v-badge location="top start" bordered overlap>
                <v-btn class="elevation-0" @click="showFilters = !showFilters">
                  <v-icon v-if="!showFilters" size="25px" left>mdi-filter</v-icon>
                  <v-icon v-else left size="25px">mdi-filter-off</v-icon>
                  FILTROS
                </v-btn>
              </v-badge>
            </v-col>

            <!-- <v-col cols="12">
              <v-expand-transition>
                <v-card v-show="showFilters" variant="outlined" height="150px">
                  <h4 class="ml-4 mt-4" align="start">Filtrar por</h4>
                  <v-row dense class="py-2 px-4">
                    <v-col :cols="2">
                      <v-autocomplete
                        density="compact"
                        variant="outlined"
                        :items="uf"
                        label="Estado"
                        item-title="nome"
                        item-value="nome"
                        v-model="filters.estado.value"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete>
                    </v-col>
                    <v-col :cols="2">
                      <v-autocomplete
                        density="compact"
                        variant="outlined"
                        :items="municipios"
                        label="Município"
                        item-title="nome"
                        item-value="nome"
                        v-model="filters.municipio.value"
                        clearable
                      ></v-autocomplete>
                    </v-col>
                    <v-col :cols="1">
                      <v-select
                        density="compact"
                        :items="sexoOptions"
                        label="Sexo"
                        item-title="label"
                        item-value="value"
                        v-model="filters.sexo.value"
                        variant="outlined"
                        dense
                        clearable
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-row dense>
                      <v-col class="text-end" height="200">
                        <v-btn
                          align="start"
                          justify="center"
                          class="pb-8"
                          color="error"
                          text
                          elevation="0"
                          @click="clearFilters"
                        >
                          Limpar filtros
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-col> -->
          </v-row>
          <v-row class="mb-5 pl-1 ml-4">
            <v-col cols="auto" class="pa-0 mr-4">
              <span class="status-text">Pagamentos</span>
              <div class="d-flex align-center">
                <v-icon small color="primary" left>mdi-account-check</v-icon>
                <div class="d-flex flex-column ml-3 status-text align-start">
                  <span class="text-xs font-weight-medium">
                    {{ this.payments.length }}
                    {{ this.payments.length === 1 ? "Pagamento" : "Pagamentos" }} cadastrado(s)
                  </span>
                </div>
              </div>
            </v-col>
            <v-col cols="auto" class="pa-0 mr-4" v-if="aguardando_nf > 0 || nf_emitida > 0 || env_empenho > 0 || efetuado > 0">
              <span class="status-text">Status</span>
              <div class="d-flex align-start">
                <v-icon small color="primary" left>mdi-information-variant-circle-outline</v-icon>
                <div class="d-flex flex-column ml-3 status-text align-start">
                  <span v-if="aguardando_nf > 0" class="text-error text-xs font-weight-medium">
                    {{ aguardando_nf }}
                    {{ aguardando_nf === 1 ? "Pagamento" : "Pagamentos" }} aguardando NF(s)
                  </span>
                  <span v-if="nf_emitida > 0" class="text-primary text-xs font-weight-medium">
                    {{ nf_emitida }}
                    {{ nf_emitida === 1 ? "Pagamento" : "Pagamentos" }} com NF(s) emitida(s)
                  </span>
                  <span v-if="env_empenho > 0" class="text-purple text-xs font-weight-medium">
                    {{ env_empenho }}
                    {{ env_empenho === 1 ? "Pagamento" : "Pagamentos" }} enviado(s) para empenho
                  </span>
                  <span v-if="efetuado > 0" class="text-success text-xs font-weight-medium">
                    {{ efetuado }}
                    {{ efetuado === 1 ? "Pagamento" : "Pagamentos" }} efetuado(s)
                  </span>
                </div>
              </div>
            </v-col>
            <!-- <v-col
              cols="auto"
              class="pa-0 mr-4"
            >
              <div class="d-flex align-center">
                <v-btn icon class="elevation-0" @click="downloadRelatorio">
                  <v-icon color="primary" left>mdi-file-download-outline</v-icon>
                </v-btn>
              </div>
            </v-col> -->
          </v-row>
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" @click="onSelectRow(item, 'update')" class="elevation-0">
                <v-icon color="green">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Clique para editar um Produtor</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <ConfirmButton icon v-bind="props" :onConfirm="() => onDeleteRow(item)" class="elevation-0">
                <v-icon color="red">mdi-delete</v-icon>
              </ConfirmButton>
            </template>
            <span>Clique para deletar um Produtor</span>
          </v-tooltip>
        </template>
        <!-- <template v-slot:[`item.status`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-chip class="custom-chip elevation-4" :color="getStatusColor(item.status)" variant="flat" v-bind="props">
                {{ statusLabels[item.status] || "Desconhecido" }}
              </v-chip>
            </template>
            <span>{{ getTooltipText(item.status) }}</span>
          </v-tooltip>
        </template> -->
        <!-- <template v-slot:expanded-row="{ item }">
          <tr>
            <td :colspan="10" style="background-color: #37622a; padding: 0">
              <div style="max-height: 400px; /* Ajuste conforme necessário */ overflow-y: auto; background-color: #37622a; padding: 16px" class="text-white expand">
                <ProdutorExpand :produtorData="JSON.parse(JSON.stringify(item))"></ProdutorExpand>
              </div>
            </td>
          </tr>
        </template> -->
        <template v-slot:[`item.total`]="{ item }">
          <span>{{ formatPrice(item.total) }}</span>
        </template>
        <template v-slot:[`item.notaFiscal`]="{ item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn class="elevation-0" @click="triggerFileInput(item.id)" v-bind="props">
                <v-icon color="primary" v-if="file.get(item.id) || item.notaFiscal" inner-icon> mdi-file </v-icon>
                <v-icon v-else inner-icon> mdi-file-outline </v-icon>
              </v-btn>
              <!-- <v-btn class="elevation-0" @click="deleteItem(item.id)"  style="position: absolute; margin-top: -10px; margin-left: -90px; background-color: transparent;"><v-icon color="grey ">mdi-close</v-icon></v-btn> -->
              <v-btn size="x-small" icon class="elevation-0" @click="onDownloadRow(item)" :disabled="!this.file.get(item.id)" style="background-color: transparent; background: none;"><v-icon :color="this.file.get(item.id) ? 'green' : 'grey'">mdi-check-bold</v-icon></v-btn>
              <v-file-input :ref="(el) => setFileInputsRef(item.id, el)" accept=".pdf,.doc,.docx,.jpg,.png" @update:model-value="handleFiles(item.id, $event)" :hide-input="true" color="white" prepend-icon=""></v-file-input>
            </template>
            <span>{{ file.get(item.id)?.name || item.notaFiscal || "Sem arquivo associado" }}</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.download`]="{ item }">
          <v-btn icon class="elevation-0" @click="onDownload(item)">
            <v-icon color="primary"> mdi-download </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.data`]="{ item }">
          <span>{{ formatData(item.data) }}</span>
        </template>
        <template v-slot:[`item.status`]="{ index, item }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-select
                v-bind="props"
                style="margin-bottom: -8px; margin-top: 13px; margin-right: -80px; margin-left: 30px"
                :persistent-placeholder="true"
                v-model="this.payments[index].status"
                :width="200"
                :items="options"
                :bg-color="getStatusColor(item.status)"
                item-title="title"
                item-value="value"
                density="compact"
                rounded
                variant="outlined"
                class="elevation-0"
                item-color="green"
                @update:model-value="handleSelectionChange(index, $event)"
              >
              </v-select>
            </template>
            <span>{{ getTooltipText(item.status) }}</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.save`]="{ item, index }">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn icon size="x-small" :color="selectedRowIndex === index ? 'green' : 'grey'" v-bind="props" style="align-items: center" @click="onSelectRow(item)" :disabled="selectedRowIndex !== index">
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
            </template>
            <span>Clique para salvar a alteração</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog.create">
        <v-card class="card-form">
          <v-card-title class="sticky-title title-border">
            Cadastro de Produtor
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.create = false">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <!-- <NovoProdutor
            :currentItem="newItem"
            :onSubmit="createProductor"
            :files="files"
            :dialogAtivo="dialog.create"
          ></NovoProdutor> -->
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog.update">
        <v-card class="card-form">
          <v-card-title class="sticky-title title-border">
            Editar Produtor: {{ selectedRow.id }}
            <v-spacer></v-spacer>
            <v-btn icon class="btn-close elevation-0" @click="dialog.update = !dialog.update">
              <v-icon prepend> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
          <!-- <EditProdutor
            :currentItem="selectedRow"
            :onSubmit="updateProductor"
            :files="files"
          ></EditProdutor> -->
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import { useToast } from "vue-toastification";
import BtnComeBack from "../../template/BtnComeBack.vue";
import ConfirmButton from "../../template/ConfirmButton.vue";
import UtilsService from "../../../services/utilsService";

export default {
  name: "Pagamento",
  components: {
    NavBar,

    BtnComeBack,
    ConfirmButton,
  },
  data: () => ({
    file: new Map(),
    fileInputs: new Map(),
    aguardando_nf: null,
    nf_emitida: null,
    env_empenho: null,
    efetuado: null,
    dialog: {
      create: false,
      update: false,
    },
    search: "",
    singleExpand: false,
    showFilters: false,
    paymentsCopy: [],
    payments: [],
    headers: [
      { text: "Remover", align: "center", value: "delete", width: "50px" },
      {
        title: "Nome do Produtor",
        align: "center",
        sortable: true,
        value: "produtor.nome",
      },
      { title: "Conta", align: "center", sortable: true, value: "produtor.conta" },
      { title: "Agência", align: "center", sortable: true, value: "produtor.agencia" },
      { title: "Total", align: "center", sortable: true, value: "total" },
      { title: "Comprovante De Entrega", align: "center", sortable: true, value: "download" },
      { title: "NF", align: "center", sortable: true, value: "notaFiscal" },
      { title: "Data", align: "center", sortable: true, value: "data" },
      { title: "Status Do Pagamento", align: "center", sortable: true, value: "status", cellClass: "text-right" },
      { text: "Salvar", align: "center", value: "save", width: "50px" },
    ],
    options: [
      { title: "NF A EMITIR", value: "AGUARDANDO_NF" },
      { title: "EMITIDA NF", value: "EMITIDO_NF" },
      { title: "ENV. PARA EMPENHO", value: "ENVIADO_EMPENHO" },
      { title: "EFETUADO", value: "EFETUADO" },
    ],
    statusLabels: {
      AGUARDANDO_NF: "NF A EMITIR",
      EMITIDO_NF: "EMITIDA NF",
      ENVIADO_EMPENHO: "ENV. PARA EMPENHO",
      EFETUADO: "EFETUADO",
    },
    newItem: {
      sexo: "Masculino",
    },
    selectedRowIndex: null,
    selectedValue: null,
    selectedRow: {},
    expanded: [],
    getStatusColor: (status) => {
      switch (status) {
        case "AGUARDANDO_NF":
          return "error"; // Amarelo
        case "EMITIDO_NF":
          return "primary"; // Verde
        case "ENVIADO_EMPENHO":
          return "purple"; // Laranja
        case "EFETUADO":
          return "success"; // Vermelho
        default:
          return "grey"; // Cinza para desconhecidos
      }
    },
    getTooltipText: (status) => {
      switch (status) {
        case "AGUARDANDO_NF":
          return "Aguardando Emissão da Nota Fiscal"; // Amarelo
        case "EMITIDO_NF":
          return "Nota Fiscal Emitida"; // Verde
        case "ENVIADO_EMPENHO":
          return "Enviado para o Emepenho"; // Laranja
        case "EFETUADO":
          return "Pagamento Efetuado"; // Vermelho
        default:
          return "grey"; // Cinza para desconhecidos
      }
    },
    // filterActive: false,
    // filters: {
    //   estado: { value: null, compareType: "equal", prop: "estado" },
    //   municipio: { value: null, compareType: "equal", prop: "municipio" },
    //   sexo: { value: null, compareType: "equal", prop: "sexo" },
    //   cpf: { value: null, compareType: "equal", prop: "cpf" },
    //   cep: { value: null, compareType: "equal", prop: "cep" },
    //   estado_civil: { value: null, compareType: "equal", prop: "estadoCivil" },
    // },
  }),
  computed: {
    filteredUsers() {
      return this.payments.map((payment) => ({
        ...payment,
        selected: false,
      }));
    },
    // filteredProductors() {
    //   return this.productors
    //     .filter((item) => {
    //       return this.filters.estado.value
    //         ? item.estado === this.filters.estado.value
    //         : true;
    //     })
    //     .filter((item) => {
    //       return this.filters.municipio.value
    //         ? item.municipio === this.filters.municipio.value
    //         : true;
    //     })
    //     .filter((item) => {
    //       return this.filters.sexo.value
    //         ? item.sexo === this.filters.sexo.value
    //         : true;
    //     });
    // },
  },
  watch: {
    payments: function () {
      this.statusAlertPayment();
    },
  },
  methods: {
    deleteItem(id) {
      this.file.delete(id)
    },

    setFileInputsRef(id, el) {
      if (el) {
        this.fileInputs.set(id, el);
      }
    },

    triggerFileInput(id) {
      const fileInput = this.fileInputs.get(id);
      if (fileInput) {
        fileInput.$el.querySelector("input").click(); // Garante que o clique funcione no Vuetify
      }
    },

    handleFiles(id, value) {
      console.log("Arquivo carregado para ID:", id);
      console.log(value);
      this.file.set(id, value);
    },

    handleSelectionChange(index, value) {
      if (this.selectedRowIndex !== null && this.selectedRowIndex !== index) {
        console.log("Caiu na condição");
        this.payments[this.selectedRowIndex].selected = false;
        this.payments[this.selectedRowIndex].status = this.paymentsCopy[this.selectedRowIndex].status;
        console.log(this.payments[this.selectedRowIndex].status);
      }

      this.selectedRowIndex = index;
      this.payments[this.selectedRowIndex].selected = true;
      this.payments[this.selectedRowIndex].status = value;
    },
    formatData(item) {
      return UtilsService.formatData(item);
    },

    formatPrice(val) {
      val = UtilsService.formatReal(val);
      return val;
    },

    statusAlertPayment() {
      (this.aguardando_nf = 0), (this.nf_emitida = 0), (this.env_empenho = 0), (this.efetuado = 0);

      if (!this.payments || this.payments.length === 0) {
        console.warn("Nenhum pagamento encontrado");
        return;
      }

      this.payments.forEach((payment) => {
        const status = payment.status;

        switch (status) {
          case "AGUARDANDO_NF":
            return this.aguardando_nf++;
          case "EMITIDO_NF":
            return this.nf_emitida++;
          case "ENVIADO_EMPENHO":
            return this.env_empenho++;
          case "EFETUADO":
            return this.efetuado++;
          default:
            return null;
        }
      });
    },

    onExpand(newExpanded) {
      if (this.expanded !== newExpanded) {
        this.expanded = newExpanded;
      }
    },

    clearFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key].value = null;
      });
      this.filterActive = false;
      this.filtered = [];
    },

    async getPayments() {
      try {
        const { data } = await axios.get("/public/pagamentos");
        console.log(data);

        this.payments = data;
        this.paymentsCopy = JSON.parse(JSON.stringify(this.payments));
        // this.productors.sort((a, b) => a.nome.localeCompare(b.nome))
      } catch (error) {
        console.log("Error: ", error);
        this.payments = [];
      }
    },

    async updatePayment(fields) {
      const toast = useToast();
      delete fields.selected;

      try {
        const response = await axios.put(`/public/pagamentos/pagamento/${fields.id}`, fields);

        console.log(response.data);

        if (response.status !== 200) {
          throw new Error(`Erro: ${response.status}`);
        }
        toast.success("Pagamento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro: ", error);
        toast.error("Erro ao atualizar pagamento: ", error);
      } finally {
        this.getPayments();
      }
    },

    async updatePaymentAndUploadFile(fields) {
      console.log(fields)

      const toast = useToast();
      delete fields.selected;

      try {
        const formData = new FormData();
        formData.append("file", this.file.get(fields.id));
        formData.append("pagamento", JSON.stringify(fields));

        console.log(formData.get("pagamento"))

        const response = await axios.put(`public/pagamentos/pagamento/upload/${fields.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      } catch (error) {}

      console.log(requestFields);

      // try {
      //   const response = await axios.put(`/public/pagamentos/pagamento/${fields.id}`, fields);

      //   console.log(response.data);

      //   if (response.status !== 200) {
      //     throw new Error(`Erro: ${response.status}`);
      //   }
      //   toast.success("Pagamento atualizado com sucesso!");
      // } catch (error) {
      //   console.error("Erro: ", error);
      //   toast.error("Erro ao atualizar pagamento: ", error);
      // } finally {
      //   this.getPayments();
      // }
    },

    async deleteProductor(fields) {
      console.log(fields)
      const toast = useToast();
      try {
        const response = await axios.delete(`/public/produtores/produtor/${fields.id}`, fields);
        if (response.status !== 204) {
          throw new Error(`Erro: `, response.status);
        }
        toast.success("Produtor removido com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar pesquisa: ", error);
        console.error("Erro: ", error);
      } finally {
        this.getProductors();
      }
    },

    onSelectRow(row) {
      this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
      this.updatePayment(this.selectedRow);
    },

    onDeleteRow(row) {
      this.selectedRow = { ...row };
      this.deleteProductor(this.selectedRow);
    },

    onDownloadRow(row) {
      this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
      this.updatePaymentAndUploadFile(this.selectedRow);
    },

    onDownload(row) {
      this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
      this.downloadComprovante(this.selectedRow);
    },


    downloadComprovante(item) {
      const url = `https://siaeserver.com/public/pagamentos/relatorio/generate/${item.id}`;
      window.location.href = url; // Redireciona o navegador e força o downlo
    },
  },
  mounted() {
    this.getPayments();
  },
};
</script>

<style scoped>
.alert-status {
  font-size: 0.8rem;
  align-content: flex-start;
  width: 40%; /* Garante que o alerta ocupe toda a largura disponível */
  word-wrap: break-word; /* Quebra palavras longas que ultrapassam o limite */
  overflow-wrap: break-word; /* Faz o texto quebrar automaticamente quando atingir o limite */
  white-space: normal; /* Permite que o texto se quebre em várias linhas */
  padding: 5px 10px; /* Ajuste o padding conforme necessário */
}
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

.expand::-webkit-scrollbar-button {
  display: none;
}

.expand::-webkit-scrollbar {
  width: 10px;
}

.expand::-webkit-scrollbar-track {
  background: transparent;
}

.expand::-webkit-scrollbar-thumb {
  background-color: rgba(87, 163, 64, 0.7);
  border-radius: 10px;
}

.expand::-webkit-scrollbar-button {
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
  font-size: 14px;
  line-height: 1.1;
  font-weight: bold;
}

.custom-badge .v-badge__badge {
  font-size: 1.8rem; /* Aumenta o tamanho do texto */
  padding: 10px;
}

.custom-alert-text {
  font-size: 0.9rem; /* Ajusta o tamanho da fonte */
  text-align: center; /* Alinha o texto no centro */
  overflow: hidden; /* Impede que o texto ultrapasse a largura */
  white-space: normal; /* Permite quebra de linha */
  word-wrap: break-word; /* Quebra palavras longas para caber na linha */
  line-height: 1.2; /* Ajusta o espaçamento entre as linhas */
  max-width: 100%; /* Garante que o texto não ultrapasse a largura do container */
  height: 100%; /* Garante que o texto se ajuste à altura */
}

.custom-chip {
  width: 170px; /* Define uma largura fixa */
  max-width: 200px; /* Limita a largura máxima */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  text-align: center;
  white-space: normal; /* Permite quebra de linha */
}

::v-deep(.v-field__input) {
  font-size: 12px !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  white-space: normal !important;
}

::v-deep(.v-list-item-title) {
  font-size: 12px !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  white-space: normal !important;
}
</style>
