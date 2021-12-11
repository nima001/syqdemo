import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import BaseStore from './BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: BaseStore,
  plugins: [createPersiste()]
})

export default store
