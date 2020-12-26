import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // todos: null,
    todosMax: 15,
    showAddModal: false,
    todos: [
      {
        id: 1,
        title: 'Встретить новый год',
        type: 'Событие',
        date: '1 января'
      },
      {
        id: 2,
        title: 'Отправиться в путешествие по Европе. Побывать в самых интересных исторических местах, купить сувениры на память. Попробовать путешествовать на машине. Провести несколько дней на природе на берегу озера. ',
        type: 'Важная дата',
        date: '28 мая',
      },
    ],
    tipsList: [
        {
          id: 1,
          text: 'Событие',
          img: require('@/assets/icons/event.svg'),
        },
        {
          id: 2,
          text: 'Важная дата',
          img: require('@/assets/icons/date.svg'),
        },
        {
          id: 3,
          text: 'Мечта',
          img: require('@/assets/icons/dream.svg'),
        },
        {
          id: 4,
          text: 'Идея',
          img: require('@/assets/icons/idea.svg'),
        },
        {
          id: 5,
          text: 'Планы',
          img: require('@/assets/icons/plans.svg'),
        },
      ]
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
    }
  },
  mutations: {
    addTodo: (state, newTodoObj) => {
         state.todos = [...state.todos, newTodoObj];
         state.showAddModal = false;
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    showAddForm: (state) => {
      state.showAddModal = true;
    }
  },
  actions: {
    
  },
});

