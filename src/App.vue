<template>
  <div id="app">
    <Congrat/>
    <AddCalendar/>
    <Header/>
    <Todos/>
    
  </div>
</template>
<script>
import {store} from './store'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import Todos from './components/Todos';
import Congrat from './components/Congrat';
import AddCalendar from './components/AddCalendar';
import Header from './components/Header';


export default {
  name: 'app',
  store,
  components: {
    Congrat,
    Todos,
    AddCalendar,
    Header
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
      this.setCurrentUser(userId);
    } else if (this.isAuthorized) {
      this.setCurrentUser(this.user.id);
    }

    this.getTodos()
  },
  computed: {
    ...mapGetters([
      'showAddModal',
      'isAuthorized',
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentUser'
    ]),
    ...mapActions([
      'getTodos'
    ])
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

@import './assets/styles/global.css';

body{
  background: #191919;
  color: #fff;
}
#app{
  width: 100%;
  max-width: 1640px;
  padding: 0 20px;
  margin: 0 auto;
}
</style>