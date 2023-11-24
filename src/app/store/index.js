import { createStore } from 'vuex'

import auth from '@/app/modules/auth/store/auth'
import setup from '@/app/modules/setup/store/setup'

const store = createStore({
  modules: {
    auth,
    setup
  }
})

export default store
