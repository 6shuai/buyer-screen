import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/index'
import './index.less'
import './util/rem'

createApp(App).use(Store).mount('#app')
