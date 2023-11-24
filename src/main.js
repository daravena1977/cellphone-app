import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import store from './app/store'

import './styles/styles.scss'
import setupInterceptors from '@/app/services/setupinterceptors'

setupInterceptors(store)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
