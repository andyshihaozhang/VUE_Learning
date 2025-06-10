import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'
import '@/styles/style.css'
import { setupStore } from '@/stores'

function setupApp(){
    const app = createApp(App);
    setupStore(app)
    app.use(ElementPlus)
    app.use(router)
    app.mount('#app')
}

setupApp()


