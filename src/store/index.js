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
        tip: 'event',
        date: '1 января'
      },
      {
        id: 2,
        title: 'Отправиться в путешествие по Европе. Побывать в самых интересных исторических местах, купить сувениры на память. Попробовать путешествовать на машине. Провести несколько дней на природе на берегу озера. ',
        tip: 'bigDate',
        date: '28 мая',
      },
    ],
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
    tipList: state => {
      return state.tipList;
    },
    currentTip: state => (tipID) => {
      // if(tipID == null)
      //   return state.tipsList[0];
      const currentTip = state.tipsList.find(tip => tip.id == tipID);
      return currentTip;
    },
    defaultTip: state => {
      return state.tipsList[0];
    }
  },
  mutations: {
    addTodo: (state, newTodoObj) => {
      state.todos = [...state.todos, newTodoObj];
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    showAddForm: (state) => {
      state.showAddModal = true;
    },
  },
  actions: {
    
  },
});

