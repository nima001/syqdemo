import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import getters from './getters'
import appinfo from './modules/appinfo'
import BaseStore from '@/framework/store/BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    appinfo,
    ...BaseStore
  },
  getters,
  plugins: [createPersiste()]
})

export default store
