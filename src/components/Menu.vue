<template>
  <div class="main">
    <v-row dense class="navbar">
      <v-col cols="1">
        <v-img class="logo-img" src=".\img\logo (1).svg"></v-img>
      </v-col>
      <v-col cols="2">
        <h2 class="logo-name">SIAE</h2>
      </v-col>
    </v-row>
    <hr class="line">
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
                class="access-paa"
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
                    class="access-pnae"
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

<script></script>

<style scoped>
.navbar {
  margin-left: 10px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
}
hr {
  margin: 10px 0 30px;
}
.line {
  border: 0;
  border-top: 3px solid rgba(87, 163, 64, 0.7);
}
.container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  margin: 0;
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

.logo-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.logo-name {
  color: #37622a;
  justify-self: flex-start;
}
</style>
