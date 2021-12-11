import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import getters from './getters'
import salary from './modules/salary'
import BaseStore from '@/framework/store/BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    salary,
    ...BaseStore
  },
  getters,
  plugins: [createPersiste()]
})

export default store
