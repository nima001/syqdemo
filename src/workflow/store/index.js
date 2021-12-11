import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import workflow from './modules/workflow'
import getters from './getters'
import BaseStore from '@/framework/store/BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workflow,
    ...BaseStore
  },
  getters,
  plugins: [createPersiste()]
})

export default store
