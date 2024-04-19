import { createStore } from 'vuex'

import auth from '@/app/modules/auth/store/auth'
import setup from '@/app/modules/setup/store/setup'
import repair from '@/app/modules/repair/store/repair'


const store = createStore({
  modules: {
    auth,
    setup,
    repair
  }
})

export default store
