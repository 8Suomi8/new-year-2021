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
import {mapGetters} from 'vuex'
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
  data() {
    return {
      
    }
  },
  computed: { ...mapGetters([ 'showAddModal' ]) }
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