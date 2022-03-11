import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useRouter } from 'vue-router'

const app = createApp(App)

app.use(ElementPlus).use(router).use(store).use(useRouter)
app.mount('#app')
