<template>
    <v-btn ref="submitButton" :loading="loading" @click="onClick" :type="type" elevation="0" v-bind="$attrs">
      <slot />
      <v-dialog persistent max-width="290" v-model="open">
        <v-card>
          <v-card-title>
            Atenção
          </v-card-title>
          <v-card-text>
            Tem certeza que deseja realizar essa ação?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="onCancel">
              Cancelar
            </v-btn>
            <v-btn color="green" text @click="onConfirmLocal">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </template>
  <script >
  export default {
    data() {
      return {
        type: 'button',
        step: 0,
        open: false
      }
    },
    methods: {
      onCancel() {
        this.open = false
      },
      onConfirmLocal() {
        if (this.onConfirm) {
          this.onConfirm()
          this.unmount()
        }
        else {
          this.type = 'submit'
          setTimeout(() => {
  
            this.$refs.submitButton.$el.click()
            this.unmount()
          }, 100)
        }
      },
      onClick() {
        this.open = true
      },
      unmount() {
        this.open = false
        this.type = 'button'
      }
    },
    mounted() {
      this.step = 0
      this.type = 'button'
  
    },
    computed: {
      isOpen: {
        get() {
          return this.step > 0
        },
        set(value) {
          if (!value) this.unmount()
        },
      }
    },
    props: {
      loading: Boolean,
      onConfirm: Function,
      block: {
        type: Boolean,
        default: true
      },
    },
  }
  </script>
  
  