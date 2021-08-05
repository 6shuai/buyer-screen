import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/index'
// import 'csshake.min.css'
import './index.less'
import './util/rem'

createApp(App).use(Store).mount('#app')
