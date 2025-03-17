import './assets/main.css';  
import { createApp } from 'vue';
import App from './app.vue';
import router from './router.vue.js'; 

const app = createApp(App);

app.use(router);

app.mount('#app');
