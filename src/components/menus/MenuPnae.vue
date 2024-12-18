<template>
  <div class="main">
    <NavBar class="navbar"></NavBar>
    <div class="container">
      <v-row dense class="justify-center" align="center" wrap>
        <v-col
          v-for="(card, index) in cardTitles"
          :key="index"
          cols="12" sm="6" md="3" lg="3" xl="3"
        >
          <CardsTemplate
          :key="index"
          :main-title="'Sistema Integrado de Alimentação Escolar'"
          :title="card.title"
          :route="card.route"
          width="250px"
          height="250px"
          :customClass="{
            card: 'card',
            sysName: 'sys-name',
            program: 'program',
            accessProgram: 'access-program',
          }"
        ></CardsTemplate>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import NavBar from '../NavBar.vue';
import CardsTemplate from '../template/CardsTemplate.vue';

export default {
  name: 'MenuPnae.vue',
  components: {
    NavBar, CardsTemplate
  },
  data: () => ({
    pendingUsers: 3,
    items: [],  
    cardTitles: [
        {title: 'PRODUTORES', route: "/cadastro-produtor"}, 
        {title: 'PRODUTOS', route: "/cadastro-produtor"}, 
        {title: 'PESQUISA DE PREÇO', route: "/cadastro-produtor"}, 
        {title: 'PAUTA DA CHAMADA', route: "/cadastro-produtor"}, 
       {title: 'PROJETO DE VENDA', route: "/cadastro-produtor"}, 
        {title: 'CRONOGRAMA DE ENTREGA', route: "/cadastro-produtor"}, 
        {title: 'COMPROVANTE DE RECEBIMENTO', route: "/cadastro-produtor"}, 
        {title: 'CONTRATOS', route: "/cadastro-produtor"}
    ],
  }),
  methods: {
    
  },
}
</script>

<style>
.navbar {
  align-items: center;
  margin: 0;
  justify-content: flex-start;
}

.container {
  display: flex;
  flex-direction: row;
  margin-top: 0;
  width: 100vw;
  height: 100vh;
  padding-left: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
}

.card {
  display: flexbox;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.sys-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.program {
  margin-top: 100px;
  margin-left: 0;
  height: 20px;
  justify-self: center;
  font-size: 1rem;
}

.access-program {
  background-color: #ffffff;
  color: #57a340;
  font-weight: bold;
  width: 100%;
  max-height: 30px;
  justify-self:center;
  margin-top: 30px;
  margin-right: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.access-program:hover {
  transform: scale(0.9);
}

</style>