<template>
  <v-card
    class="card"
    :class="customClass.card"
    :color="color"
    :width="width"
    :height="height"
    @click="onClick"
  >
    <v-card-text>
      <!-- Título principal -->
      <div class="main-title-container">
        <slot name="main-title">
          <h1 v-if="mainTitle" class="sys-name" :class="customClass.sysName">
            {{ mainTitle }}
          </h1>
        </slot>
      </div>

      <!-- Conteúdo principal -->
      <div class="content-container">
        <slot name="content">
          <h2 v-if="sysTitle" class="program" :class="customClass.program">{{sysTitle}}</h2>
        </slot>
      </div>

      <div class="program-container">
        <slot name="program-content">
          <h6 v-if="title" class="program-name" :class="customClass.programName">{{title}}</h6>
        </slot>
      </div>

        <slot name="actions">
          <v-btn
            v-if="route"
            class="access-program"
            :class="customClass.accessProgram"
            :to="route"
          >
            {{ buttonText }}
          </v-btn>
        </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardTemplate",
  props: {
    customClass: {
      type: Object,
      default: () => ({
        card: "",
        sysName: "",
        program: "",
        accessProgram: "",
        actionsContainer: "",
        programName: ""
      }),
    },
    route: {
      type: String,
      default: null,
    },
    sysTitle: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    mainTitle: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: "Acessar",
    },
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "200px",
    },
    color: {
      type: String,
      default: "#57a340",
    },

    onClick: {
      type: Function,
      default: null
    }
  },
};
</script>

<style scoped>

.sys-name {
  font-size: 0.9rem ;
  font-weight: 400;
}

.program {
  margin-left: 20px;
  margin-top: 120px;
  margin-bottom: 20px;
  justify-self: flex-start;
}

.access-program {
  height: 30px;
  display: flex;
  width: auto; 
  justify-self: flex-end;
  margin: auto;
  background-color: #ffffff;
  color: #57a340;
  font-weight: bold;
  padding: 5px 10px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>