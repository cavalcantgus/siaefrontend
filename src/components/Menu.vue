<template>
  <div class="main">
    <NavBar class="navbar"></NavBar>
    <div class="container">
      <v-card class="card-first" color="#57a340">
        <v-card-text>
          <v-row dense>
            <v-col>
              <h1 class="sys-name">Sistema Integrado de Alimentação Escolar</h1>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <h2 class="program">PAA</h2>
            </v-col>
            <v-col>
            <v-card-actions>
            <v-container>
              <v-btn
                class="access-paa" to="/menu-paa"
              >
                Acessar
              </v-btn>
            </v-container>
          </v-card-actions>
          </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="card-second" color="#57a340">
        <v-card-text>
          <v-row dense>
            <v-col>
              <h1 class="sys-name">Sistema Integrado de Alimentação Escolar</h1>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <h2 class="program">PNAE</h2>
            </v-col>
            <v-col>
              <v-card-actions>
                <v-container>
                  <v-btn
                    class="access-pnae" to="/menu-pnae"
                  >
                    Acessar
                  </v-btn>
                </v-container>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  name: 'Menu.vue',
  components: {
    NavBar
  },
  data: () => ({
    pendingUsers: 3,
    items: [],    
  }),
  methods: {
    
  },
}
</script>

<style scoped>
.navbar {
  align-items: center;
  margin: 0;
  justify-content: flex-start;
}

.container {
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  padding-left: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
}

.card-first {
  border-radius: 20px;
  width: 350px;
  height: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.card-second {
  border-radius: 20px;
  width: 350px;
  height: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.sys-name {
  font-size: 0.9rem;
  font-weight: 400;
}

.program {
  margin-left: 20px;
  margin-top: 140px;
  justify-self: flex-start;
}

.access-paa, .access-pnae {
  width: 100%;
  background-color: #ffffff;
  color: #57a340;
  font-weight: bold;
  margin-top: 115px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease
}

.access-paa:hover, .access-pnae:hover {
  transform: scale(1.1);
} 

</style>
