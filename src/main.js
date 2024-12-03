import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import router from './router/routes.js';
import 'vuetify/styles'
import './style.css'
import App from './App.vue'


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.use(router)

app.mount('#app')
