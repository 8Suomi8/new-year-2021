<template>
  <div id="app">
    <div class="content">
      <Congrat/>
      <AddCalendar/>
      <button v-if="isShowSave" @click="saveTodo" class="saveCalendar">Сохранить</button>
      <Header/>
      <Todos/>

    </div>  
    <Footer/>
    <Loader/>
    <v-dialog />
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
      if (this.user && this.user.id == userId) {
        this.setTodosUser(this.user);
        window.history.replaceState(null, null, window.location.pathname);
      } else {
        this.setMode('viewing');
        this.setTodosUser({id: userId});
      }
    } else if (this.user) {
      this.setTodosUser(this.user);
    }

    this.getTodos();
  },
  computed: {
    ...mapGetters([
      'showAddModal',
      'isAuthorized',
      'todos',
      'user',
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
          title: 'Необходимо авторизоваться',
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
.saveCalendar{
  background: transparent;
  display: block;
  margin: 20px 0 20px auto;
  border: 1px dotted #fff;
  color: #e05c5c;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
}
.notification {
  padding: 20px;
  margin: 0 5px 5px;
  font-size: 14px;
  color: #e05c5c;
  background: #fff;
  background-color: #fff;
  border-left: 5px solid #c02f2f;
  
  .notification-title {
    font-weight: 100;
    
  }
 
  .notification-content {
    
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.fade-single-enter-active {
  transition: opacity .5s;
}
.fade-single-leave-active{
  transition: opacity .5s;
}
.fade-single-enter, .fade-single-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .3s;
}
.list-enter /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px);
}
#app{
  .vue-dialog{
    background: #191919;
    padding: 30px;
  }
  .vm--modal{
    box-shadow: 0 20px 60px 0px rgba(0, 0, 0, .4);
  }
  .vue-dialog-content-title{
    font-weight: 100;
    text-align: center;
  }
  .vue-dialog-buttons{
    border-top: 0;
  }
  .vue-dialog-button:not(:first-of-type){
    margin-left: 20px;
    border-left: 1px dotted #fff;
  }
  .vue-dialog-button{
    border: 1px dotted #fff;
    color: #e05c5c;
    &:hover {
      background:#191919;
    }
  }
}
</style>