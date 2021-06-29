import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/index'
import './app.less'

createApp(App).use(Store).mount('#app')
