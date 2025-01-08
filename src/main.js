import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import router from './router/routes.js';
import 'vuetify/styles'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'  // Certifique-se de importar o CSS do mdi
import VueToastificationPlugin, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css'
import VScrollLock from 'v-scroll-lock'
import VuetifyMoney from 'vuetify-money-3'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    icons: 'mdi'
  },
  components,
  directives,
})

app.use(VueTheMask)
app.use(VuetifyMoney);
app.use(VueToastificationPlugin, {
  position: POSITION.BOTTOM_RIGHT, 
  timeout: 3000,  
});

app.use(VScrollLock)
app.use(vuetify)
app.use(router)


app.mount('#app')
