import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import BaseStore from '@/framework/store/BaseStore'
import HomeStore from "../store/modules/home"
import OverviewStore from "../store/modules/overview"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...BaseStore,
    HomeStore,
    OverviewStore
  },
  plugins: [createPersiste()]
})

export default store
