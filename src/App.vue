<template>
  <div id="app">
    <div class="content">
      <Congrat/>
      <AddCalendar/>
      <Header/>
      <Todos/>

      <button v-if="isShowSave" @click="saveTodo">Сохранить</button>
    </div>  
    <Footer/>
    <Loader/>
    <notifications group="auth" classes="notification" position="bottom right"/>
  </div>
</template>
<script>
import {store} from './store'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'

import Todos from './components/Todos';
import Congrat from './components/Congrat';
import AddCalendar from './components/AddCalendar';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';


export default {
  name: 'app',
  store,
  components: {
    Congrat,
    Todos,
    AddCalendar,
    Header,
    Footer,
    Loader
  },
  storage: {
    keys: ['todos'],
    namespace: 'app'
  },
  data() {
    return {}
  },
  beforeMount() {
    const url = new URL(window.location.href);
    const userId = url.searchParams.get('userid');
    
    if (userId) {
      this.setMode('viewing');
      this.setTodosUser({id: userId});
    }

    this.getTodos();
  },
  computed: {
    ...mapGetters([
      'showAddModal',
      'isAuthorized',
      'todos',
      'mode'
    ]),
    isShowSave() {
      return !this.isAuthorized && this.todos.length > 0 && this.mode == 'addition'
    }
  },
  methods: {
    ...mapMutations([
      'setMode',
      'setTodosUser'
    ]),
    ...mapActions([
      'loadUser',
      'getTodos'
    ]),
    saveTodo() {
      if (!this.isAuthorized) {
        Vue.notify({
          group: 'auth',
          title: 'Необходимо авторизироваться',
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

@import './assets/styles/global.css';

body{
  background: #191919;
  color: #fff;
}
#app{
  
}
.content{
  width: 100%;
  max-width: 1640px;
  padding: 0 20px;
  margin: 0 auto;
}
.notification {
  padding: 20px;
  margin: 0 5px 5px;
  font-size: 14px;
  color: #fff;
  background: #e05c5c;
  background-color: #e05c5c;
  border-left: 5px solid #c02f2f;
  
  .notification-title {
    font-weight: 100;
    
  }
 
  .notification-content {
    
  }
}
</style>