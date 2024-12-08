<template>
  <v-card
    class="card"
    :class="customClass.card"
    :color="color"
    :width="width"
    :height="height"
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
          <h2 v-if="title" class="program" :class="customClass.program">{{title}}</h2>
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
        actionsContainer: ""
      }),
    },
    route: {
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
  },
};
</script>