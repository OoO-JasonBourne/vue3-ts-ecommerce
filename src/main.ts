import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// main.ts/main.js
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";



const app = createApp(App);
app.use(router).mount('#app')
