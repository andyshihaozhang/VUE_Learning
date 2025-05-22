import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './style.css'


const pinia = createPinia()
const app = createApp(App)
            .use(ElementPlus)
            .use(pinia)
            .use(router)

app.mount('#app')
