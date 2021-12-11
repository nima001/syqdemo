import Vue from 'vue'
import Vuex from 'vuex'
import createPersiste from 'vue-savedata'
import equationEditor from '@person/store/modules/equationEditor'
import orgRecord from '@person/store/modules/orgRecord'
import BaseStore from '@framework/store/BaseStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...BaseStore,
    equationEditor,
    orgRecord,
  },
  plugins: [createPersiste()]
})

export default store
