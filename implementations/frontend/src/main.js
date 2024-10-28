import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { utils } from './common/utils'
import moment from 'moment';
import VueApexCharts from "vue3-apexcharts";

// const app = createApp(App).use(router).mount('#app');
const app = createApp(App);
app.use(router).mount('#app');
app.use(VueApexCharts);

app.config.globalProperties.$util = utils;
app.config.globalProperties.$moment = moment;

import 'bootstrap/dist/js/bootstrap.js'