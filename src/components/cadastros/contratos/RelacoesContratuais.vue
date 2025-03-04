<template>
    <NavBar></NavBar>
    <v-tabs v-model="tab" color="green">
        <v-tab value="contratos">Contratos</v-tab>
        <v-tab value="contratante">Contratante</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item value="contratos">
            <Contrato></Contrato>
        </v-tabs-window-item>

        <v-tabs-window-item value="contratante">
            <Contratante></Contratante>
        </v-tabs-window-item>
    </v-tabs-window>
</template>

<script>
import Contrato from './Contrato.vue';
import NavBar from "../../NavBar.vue";
import Contratante from './Contratante.vue';

export default {
    name: 'RelacoesContratuais',
    components: {
        Contrato,
        NavBar,
        Contratante
    },
    data: () => ({
        tab: null
    })
}
</script>