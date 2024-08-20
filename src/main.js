import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import store from './app/store'
import moment from 'moment'
import VueTheMask from 'vue-the-mask'



import 'bootstrap/dist/js/bootstrap.bundle'

import './styles/styles.scss'

import setupInterceptors from '@/app/services/setupinterceptors'



setupInterceptors(store)

createApp(App)
    .use(store)
    .use(router)
    .use(moment)
    .use(VueTheMask)
    .mount('#app')
