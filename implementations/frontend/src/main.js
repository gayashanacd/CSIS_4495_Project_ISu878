import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { utils } from './common/utils'

// const app = createApp(App).use(router).mount('#app');
const app = createApp(App);
app.use(router).mount('#app');

app.config.globalProperties.$util = utils;

import 'bootstrap/dist/js/bootstrap.js'