<template>
<div class="calendarWrapper">
  <button
    v-if="mode == 'viewing'"
    class="addCalendar"
    @click="addCalendar"
  >
    <span v-if="isAuthorized">Мой календарь</span>
    <span v-else>Создать свой календарь</span>
  </button>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddCalendar',
  methods: {
    ...mapMutations([
      'setMode',
      'setTodosUser'
    ]),
    addCalendar() {
      this.setMode('addition');
      this.setTodosUser(this.user ? this.user : null);
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'mode',
      'user'
    ])
  },
}
</script>
<style scoped>
  .addCalendar{
    background: transparent;
    display: block;
    margin: 20px 0 20px auto;
    border: 1px dotted #fff;
    color: #e05c5c;
    padding: 15px 40px;
    
    outline: none;
    cursor: pointer;
  }

  .addCalendar span {
    font-size: 18px;
    font-weight: 700;
  }

  @media(max-width: 758px){
    .addCalendar{
      margin: 20px auto;
    }
  }
</style>