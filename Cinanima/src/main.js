import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Define Material Design Icons como padrão
  },
});


const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router)
app.use(vuetify)
app.mount('#app')
