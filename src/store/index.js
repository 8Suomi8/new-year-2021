import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import { nanoid } from 'nanoid'

import * as Api from '../utils/api.js';

Vue.use(Vuex);

const initAccessToken = Cookies.get('new_year_2021_access_token');
const initUser = localStorage.getItem('new_year_2021_user');

export const store = new Vuex.Store({
  state: {
    access_token: typeof initAccessToken != 'undefined' ? initAccessToken: '',
    user        : typeof initUser != 'undefined' ? JSON.parse(initUser)  : null,
    todosUser   : null,
    mode        : 'addition', // addition или viewing

    isLoading: false,
    filterType: null,
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
    todosUser: state => {
      return state.todosUser;
    },
    mode: state => {
      return state.mode;
    },
    isAuthorized: state => {
      return state.access_token != '' && state.user && state.user.id != 0;
    },
    isLoading: state => {
      return state.isLoading;
    },
    filterType: state => {
      return state.filterType;
    }
  },
  mutations: {
    setTodos: (state, value) => {
      state.todos = value;
    },
    addTodo: (state, newTodoObj) => {
      state.todos = [...state.todos, newTodoObj];
    },
    editTodo(state, payload) {
      let index = state.todos.findIndex(todo => todo.id == payload.id);
      return [...state.todos.splice(index, 1, payload)];
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    showAddForm: (state) => {
      state.showAddModal = true;
    },
    setLoading: (state, status) => {
      state.isLoading = status;
    },
    setMode: (state, mode) => {
      state.mode = mode;
    },
    setUser: (state, user) => {
      state.user = user;
      localStorage.setItem('new_year_2021_user', JSON.stringify(user));
    },
    setTodosUser: (state, user) => {
      state.todosUser = user;
    },
    setAccessToken: (state, value) => {
      state.access_token = value.access_token;
      
      let cookiesParams = {};
      if (value.expires > 0) {
        cookiesParams = {expires: new Date(value.expires * 1000)};
      }

      Cookies.set('new_year_2021_access_token', value.access_token, cookiesParams);
    },
    toggleFilterTodos: (state, tipId) => {
      if (state.filterType == tipId) {
        state.filterType = null;
      } else {
        state.filterType = tipId;
      }
    }
  },
  actions: {
    addUser ({ commit, dispatch }, params) {
      commit('setLoading', true);
      Api.addUser(params.user).then((result) => {
        commit('setUser', result);
        commit(
          'setAccessToken',
          {
            access_token: params.access_token,
            expires     : params.expire
          }
        );
        commit('setLoading', false);

        dispatch('getTodos');
      })
    },
    addTodo ({ commit, getters }, todo) {
      todo.date = format(todo.date, 'yyyy-MM-dd');

      if (getters.isAuthorized) {
        todo.userId = getters.user.id;

        commit('setLoading', true);
        Api.addTodo(todo).then((result) => {
          commit('addTodo', result);
          commit('setLoading', false);
        })
      } else {
        commit(
          'addTodo',
          Object.assign(
            {},
            todo,
            {
              type: 'local',
              id  : nanoid()
            }
          )
        );
        localStorage.setItem('new_year_2021_todos', JSON.stringify(getters.todos));
      }
    },
    editTodo ({ commit, getters, dispatch }, todo) {
      todo.date = format(todo.date, 'yyyy-MM-dd');

      if (getters.isAuthorized) {
        commit('setLoading', true);
        Api.editTodo(todo).then(() => {
          dispatch('getTodos');
        })
      } else {
        commit('editTodo', todo);
        localStorage.setItem('new_year_2021_todos', JSON.stringify(getters.todos));
      }
    },
    deleteTodo ({ commit, getters, dispatch }, todoId) {
      if (getters.isAuthorized) {
        commit('setLoading', true);
        Api.deleteTodo(todoId).then(() => {
          dispatch('getTodos');
        })
      } else {
        commit('deleteTodo', todoId);
        localStorage.setItem('new_year_2021_todos', JSON.stringify(getters.todos));
      }
    },
    getTodos ({ commit, getters }) {
      if (getters.todosUser) {
        commit('setLoading', true);
        return Api.getTodos({userId: getters.todosUser.id})
          .then((result) => {
            console.log(result);
            commit('setTodos', result['todos']);
            commit('setTodosUser', result['user']);

            commit('setLoading', false);
          })
      } else {
        const localTodosString = localStorage.getItem('new_year_2021_todos');
        if (localTodosString) {
          commit('setTodos', JSON.parse(localTodosString));
        }
      }
    },
    toogleLike ({ commit, dispatch }, todoId) {
      commit('setLoading', true);
      Api.toogleLike(todoId).then(() => {
        dispatch('getTodos');
      })
    }
  }
});

