import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'element-plus/dist/index.css'

// 在开发环境下引入 mock
if (import.meta.env.DEV) {
  import('./mock/user')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
