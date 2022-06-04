import { createApp } from 'vue'
import App from './App.vue'
import LogsStore from './store';

const app = createApp(App);
app.mount('#app');
app.use(LogsStore);