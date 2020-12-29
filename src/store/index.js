import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import Notifications from 'vue-notification'

import * as Api from '../utils/api.js';

Vue.use(Vuex);
Vue.use(Notifications)

const initUser = Cookies.get('new_year_2021_user');
const initAccessToken = Cookies.get('new_year_2021_access_token');

export const store = new Vuex.Store({
  state: {
    isLoading: false,
    access_token: typeof initAccessToken != 'undefined' ? initAccessToken : '',
    user: typeof initUser != 'undefined' ? JSON.parse(initUser) : null,
    viewedUserId: null,

    todosMax: 15,
    showAddModal: false,
    todos: [],
    tipsList: [
      {
        id: 'event',
        text: 'Событие',
        img: require('@/assets/icons/event.svg'),
      },
      {
        id: 'bigDate',
        text: 'Важная дата',
        img: require('@/assets/icons/date.svg'),
      },
      {
        id: 'dream',
        text: 'Мечта',
        img: require('@/assets/icons/dream.svg'),
      },
      {
        id: 'idea',
        text: 'Идея',
        img: require('@/assets/icons/idea.svg'),
      },
      {
        id: 'plans',
        text: 'Планы',
        img: require('@/assets/icons/plans.svg'),
      },
    ],
  },
  getters: {
    todosCount: state => {
      return state.todos.length;
    },
    tipsList: state => {
      return state.tipsList;
    },
    todos: state => {
      return state.todos;
    },
    todosMax: state => {
      return state.todosMax;
    },
    showAddModal: state => {
      return state.showAddModal;
    },
    currentTip: state => tipID => {
      if(tipID == null)
        return state.tipsList[0];
      const currentTip = state.tipsList.find(tip => tip.id == tipID);
      return currentTip;
    },
    defaultTip: state => {
      return state.tipsList[0];
    },
    user: state => {
      return state.user;
    },
    viewedUserId: state => {
      return state.viewedUserId;
    },
    isAuthorized: state => {
      return state.access_token !='' && state.user.id != 0;
    },
    isLoading: state => {
      return state.isLoading;
    },
  },
  mutations: {
    resetTodos: (state) => {
      state.todos = [];
    },
    addTodo: (state, newTodoObj) => {
      state.todos = [...state.todos, newTodoObj];
    },
    showAddForm: (state) => {
      state.showAddModal = true;
    },
    setLoading: (state, status) => {
      state.isLoading = status;
    },
    setViewedUserId: (state, userId) => {
      state.viewedUserId = userId;
    },
    setUser: (state, user) => {
      state.user = user;
      Cookies.set('new_year_2021_user', JSON.stringify(user));
    },
    setAccessToken: (state, accessToken) => {
      state.access_token = accessToken;
      Cookies.set('new_year_2021_access_token', accessToken);
    },
  },
  actions: {
    addUser ({ commit, dispatch }, params) {
      commit('setLoading', true);
      Api.addUser(params.user).then((result) => {
        commit('setAccessToken', params.access_token);
        commit('setUser', result);
        commit('setLoading', false);

        dispatch('getTodos');
      })
    },
    addTodo ({ commit, getters }, todo) {
      if (getters.isAuthorized) {
        todo.date = format(todo.date, 'yyyy-MM-dd')
        todo.userId = getters.user.id;
        commit('setLoading', true);
        Api.addTodo(todo).then((result) => {
          commit('addTodo', result);
          commit('setLoading', false);
        })
      } else {
        Vue.notify({
          group: 'auth',
          title: 'Необходима авторизация',
        })
      }
    },
    editTodo ({ commit, getters, dispatch }, todo) {
      if (getters.isAuthorized) {
        todo.date = format(todo.date, 'yyyy-MM-dd')
        commit('setLoading', true);
        Api.editTodo(todo).then(() => {
          dispatch('getTodos');
        })
      } else {
        Vue.notify({
          group: 'auth',
          title: 'Необходима авторизация',
        })
      }
    },
    deleteTodo ({ commit, getters, dispatch }, todoId) {
      if (getters.isAuthorized) {
        commit('setLoading', true);
        Api.deleteTodo(todoId).then(() => {
          dispatch('getTodos');
        })
      } else {
        Vue.notify({
          group: 'auth',
          title: 'Необходима авторизация',
        })
      }
    },
    getTodos ({ commit, getters }) {
      let userId = null;
      let currentUserId = null;

      if (getters.viewedUserId) {
        userId = getters.viewedUserId;
      }
      
      if (getters.user && getters.user.id) {
        currentUserId = getters.user.id;
        if (!userId) {
          userId = getters.user.id;
        }
      }

      if (!userId) {
        Vue.notify({
          group: 'auth',
          title: 'Необходима авторизация',
        })
      } else {
        commit('setLoading', true);
        return Api.getTodos({
          userId: userId,
          currentUserId: currentUserId,
        }).then((result) => {
          commit('resetTodos');
  
          result.forEach(element => {
            commit('addTodo', element);
          });
          commit('setLoading', false);
        })
      }
    },
    toogleLike ({ commit, getters, dispatch }, todoId) {
      if (getters.isAuthorized) {
        commit('setLoading', true);
        Api.toogleLike(getters.user.id, todoId).then(() => {
          dispatch('getTodos');
        })
      } else {
        Vue.notify({
          group: 'auth',
          title: 'Необходима авторизация',
        })
      }
    },
  }
});

