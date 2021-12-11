import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import assessment from "./modules/assessment"
import getters from "./getters"
import BaseStore from '@/framework/store/BaseStore'

import equationEditor from '@person/store/modules/equationEditor'
import orgRecord from '@person/store/modules/orgRecord'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    assessment,
    ...BaseStore,
    equationEditor,
    orgRecord
  },
  getters,
  plugins: [createPersiste()]
})

export default store