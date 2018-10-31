import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  state: defaultState,
  mutations
})

