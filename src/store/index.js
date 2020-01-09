import Vue from 'vue';
import Vuex from 'vuex';

import { SERVICES_MESSAGES_TYPES } from '@/constants.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMessages: [],
    serviceMessages: [],
    users: [],
    userName: null
  },
  mutations: {
    SOCKET_CHAT_LEAVE (state, payload) {
      state.users = state.users.filter(item => item !== payload.user);
      state.serviceMessages.push({
        user: payload.user,
        text: SERVICES_MESSAGES_TYPES[payload.type]
      })
    },
    SOCKET_CHAT_ENTER (state, payload) {
      state.serviceMessages.push({
        user: payload.user,
        text: SERVICES_MESSAGES_TYPES[payload.type]
      })
    },
    SET_USER (state, userName) {
      state.userName = userName;
    },
    SOCKET_USERS_RELOAD (state, users) {
      state.users = users;
    },
    SOCKET_CHAT_MESSAGE (state, payload) {
      state.userMessages.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
