import { createStore } from 'vuex'

import auth from '../modules/auth/store/auth'
import setup from '../modules/setup/store/setup'

const store = createStore({
  modules: {
    auth,
    setup
  }
})

export default store
