<template>
  <NavBar></NavBar>
  <BtnComeBack></BtnComeBack>
  <h1 style="color: #57a340; margin-top: 10px; padding: 30px; font-size: 3rem">Pagamentos</h1>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-data-table class="custom-table" :items="filteredUsers" :headers="headers" :search="search" show-expand :single-expand="true" v-model:expanded="expanded" :fixed-header="true" height="700px" @update:expanded="onExpand">
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

              <v-col cols="12">
                <v-expand-transition>
                  <v-card v-show="showFilters" variant="outlined" height="150px">
                    <h4 class="ml-4 mt-4" align="start">Filtrar por</h4>
                    <v-row dense class="py-2 px-4">
                      <v-col :cols="2">
                        <v-autocomplete density="compact" variant="outlined" :items="options" label="Status de Pagamento" item-title="title" item-value="value" v-model="filters.status.value" outlined dense clearable></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-row dense>
                        <v-col class="text-end" height="200">
                          <v-btn align="start" justify="center" class="pb-8" color="error" text elevation="0" @click="clearFilters"> Limpar filtros </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>
              </v-col>
            </v-row>
            <v-row class="mb-5 pl-1 ml-4">
              <v-col cols="12" sm="6" md="4" lg="2" class="pa-0 mr-4">
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
              <v-col cols="12" sm="6" md="4" lg="auto" class="pa-0 mr-4" v-if="aguardando_nf > 0 || nf_emitida > 0 || env_empenho > 0 || efetuado > 0">
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
              <v-col cols="12" sm="6" md="4" lg="1" class="pa-0" align="center">
                <v-icon class="pr-2">mdi-calendar-range</v-icon>
                <span class="status-text">Mês</span>
                  <div class="d-flex flex-column status-text align-center ga-3">
                  <span class="text-xs font-weight-medium">Março</span>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="1" class="pa-0 mr-4" align="center">
                <v-icon class="pr-2">mdi-calendar-range</v-icon>
                <span class="status-text">Ano</span>    
                  <div class="d-flex flex-column status-text align-center ga-3">
                  <span class="text-xs font-weight-medium">2025</span>
                </div>
                
              </v-col>
            </v-row>
            <v-row class="mb-5 pl-1 ml-4">
              <v-col cols="12" sm="6" md="4" lg="2" class="pa-0" align="center">
                <span class="status-text">Mês</span>
                   <v-select variant="flat" density="compact" class="elevation-2 rounded-xl"  :hide-details="true" >
                   </v-select>
              </v-col>
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
          <template v-slot:expanded-row="{ item }">
            <tr>
              <td :colspan="12" style="background-color: #37622a; padding: 0">
                <div style="max-height: 400px; /* Ajuste conforme necessário */ overflow-y: auto; background-color: #37622a; padding: 16px" class="text-white expand">
                  <PagamentoExpand :produtorData="JSON.parse(JSON.stringify(item))"></PagamentoExpand>
                </div>
              </td>
            </tr>
          </template>
          <template v-slot:[`item.total`]="{ item }">
            <span>{{ formatPrice(item.total) }}</span>
          </template>
          <template v-slot:[`item.notaFiscal`]="{ item }">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-row justify="start" class="">
                  <v-col cols="12" sm="6" md="6" lg="2">
                    <v-btn class="elevation-0" @click="triggerFileInput(item.id)" v-bind="props">
                      <v-icon color="#deb13e" v-if="file.get(item.id) || item.notaFiscal" inner-icon>mdi-file </v-icon>
                      <v-icon v-else inner-icon> mdi-file-outline </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="">
                    <v-btn icon class="elevation-0" @click="downloadFile(item)" style="background-color: transparent; background: none"><v-icon color="primary">mdi-download</v-icon></v-btn>
                  </v-col>
                </v-row>

                <v-file-input :ref="(el) => setFileInputsRef(item.id, el)" accept=".pdf,.doc,.docx,.jpg,.png" @update:model-value="handleFiles(item.id, $event)" :hide-input="true" color="white" prepend-icon=""></v-file-input>
              </template>
              <span>{{ file.get(item.id)?.name || item.notaFiscal?.fileName || "Sem arquivo associado" }}</span>
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
            <v-select
              style="margin-bottom: -8px; margin-top: 13px; margin-right: -80px; margin-left: 0px"
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
              @update:model-value="handleSelectionChange(index, $event, item)"
            >
            </v-select>
          </template>

          <!-- <template v-slot:[`item.save`]="{ item, index }">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn icon size="x-small" :color="this.payments[index].selected ? 'green' : 'grey'" v-bind="props" style="align-items: center" @click="onSelectRow(item)" :disabled="!this.payments[index].selected">
                  <v-icon>mdi-check-bold</v-icon>
                </v-btn>
              </template>
              <span>Clique para salvar a alteração</span>
            </v-tooltip>
          </template> -->
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
  </v-container>
</template>

<script>
import axios from "@/services/axios.js";
import NavBar from "../../NavBar.vue";
import { useToast } from "vue-toastification";
import BtnComeBack from "../../template/BtnComeBack.vue";
import ConfirmButton from "../../template/ConfirmButton.vue";
import UtilsService from "../../../services/utilsService";
import PagamentoExpand from "./PagamentoExpand.vue";

export default {
  name: "Pagamento",
  components: {
    NavBar,
    BtnComeBack,
    ConfirmButton,
    PagamentoExpand,
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
      { text: "Remover", align: "center", value: "delete", minWidth: "30px" },
      {
        title: "Nome do Produtor",
        align: "center",
        sortable: true,
        value: "produtor.nome",
        minWidth: "200px",
      },
      { title: "Conta", align: "center", sortable: true, value: "produtor.conta" },
      { title: "Agência", align: "center", sortable: true, value: "produtor.agencia" },
      { title: "Total", align: "center", sortable: true, value: "total" },
      { title: "Comprovante De Entrega", align: "center", sortable: true, value: "download", minWidth: "10px" },
      { title: "NF", align: "center", sortable: true, value: "notaFiscal", minWidth: "200px" },
      { title: "Data", align: "center", sortable: true, value: "data" },
      { title: "Status Do Pagamento", align: "center", sortable: true, value: "status", minWidth: "250px" },
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
    filters: {
      status: { value: null, compareType: "equal", prop: "status" },
    },
  }),
  computed: {
    filteredUsers() {
      return this.payments
        .map((payment) => ({
          ...payment,
        }))
        .filter((item) => {
          return this.filters.status.value ? item.status === this.filters.status.value : true;
        });
    },
  },
  watch: {
    payments: function () {
      this.statusAlertPayment();
    },
  },
  methods: {
    deleteItem(id) {
      this.file.delete(id);
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

    handleSelectionChange(index, value, row) {
      this.selectedRow = JSON.parse(JSON.stringify({ ...row }));
      this.selectedValue = value;
      this.updatePaymentAndUploadFile(this.selectedRow);
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
    },

    downloadFile(item) {
      console.log(item);
      const url = `https://siaeserver.com/notas/download/${item?.notaFiscal?.fileName}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = item?.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async getPayments() {
      try {
        const { data } = await axios.get("/public/pagamentos");
        console.log(data);

        this.payments = data.sort((a, b) => a.produtor.nome.localeCompare(b.produtor.nome));
        this.paymentsCopy = JSON.parse(JSON.stringify(this.payments));
      } catch (error) {
        console.log("Error: ", error);
        this.payments = [];
      }
    },

    // async updatePayment(fields) {
    //   const toast = useToast();

    //   fields.status = this.selectedValue

    //   try {
    //     const response = await axios.put(`/public/pagamentos/pagamento/${fields.id}`, fields);

    //     console.log(response.data);

    //     if (response.status !== 200) {
    //       throw new Error(`Erro: ${response.status}`);
    //     }
    //     await this.updatePaymentAndUploadFile(fields)
    //     toast.success("Pagamento atualizado com sucesso!");
    //   } catch (error) {
    //     console.error("Erro: ", error);
    //     toast.error("Erro ao atualizar pagamento: ", error);
    //   } finally {
    //     this.selectedRow.selected = false;
    //     this.getPayments();
    //   }
    // },

    async updatePaymentAndUploadFile(fields) {
      console.log(fields);
      const toast = useToast();
      try {
        const formData = new FormData();
        if (this.selectedValue !== null) {
          fields.status = this.selectedValue;
        }
        let file = null;

        if(this.file.get(fields.id) !== null || this.file.get(fields.id) !== undefined) {
          file = this.file.get(fields.id)
        }

        formData.append("file", file);
        formData.append("pagamento", JSON.stringify(fields));

        console.log(formData.get("pagamento"));
        console.log(formData.get("file"));
        const response = await axios.put(`public/pagamentos/pagamento/upload/${fields.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        if (response.status !== 200) {
          throw new Error("Erro na requisição");
        }
        toast.success("Pagamento atualizado com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar pagamento: ", error);
      } finally {
        this.getPayments();
      }
    },

    async deleteProductor(fields) {
      console.log(fields);
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

.custom-table {
  overflow-x: auto;
}
</style>
