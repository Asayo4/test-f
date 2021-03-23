import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: { 
    id: "",
    item: "",
    tasks: ""
  },
  mutations: {
    changetask(state, payload) {
      state.item.task = payload;
    }
  },
  actions: {
    changetask({ commit }, { task }) {
      commit("changetask", task);
    }
  },
  modules: {
    data: {
      vm:[]
    }
  }
});