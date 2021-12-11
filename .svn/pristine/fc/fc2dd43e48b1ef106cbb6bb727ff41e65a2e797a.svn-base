import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import BaseStore from '@/framework/store/BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...BaseStore,
  },
  plugins: [createPersiste()]
})

export default store
