import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import './utils/permission'

// import { defineCustomElements, imkit } from '@rongcloud/imkit' // imkit 为核心模块
// defineCustomElements() // im

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(router).use(store).use(useRouter)
app.mount('#app')
