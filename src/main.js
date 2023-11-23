import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/styles.scss'
import setupInterceptors from '@/services/setupinterceptors'

setupInterceptors(store)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
