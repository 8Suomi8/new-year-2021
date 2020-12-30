<template>
<div class="calendarWrapper">
  <button
    v-if="viewedUserId"
    class="addCalendar"
    @click="addCalendar"
  >
    Перейти к своему календарю
  </button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddCalendar',
  methods: {
    addCalendar() {
      // if (this.isAuthorized) {
        window.location.href = window.location.origin;
      // } else {
      //   this.$notify({
      //     group: 'auth',
      //     title: 'Необходима авторизация',
      //   })
      // }
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'viewedUserId',
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
    font-size: 18px;
    font-weight: 700;
    outline: none;
    cursor: pointer;
  }
  .calendarWrapper{

  }
  @media(max-width: 758px){
    .addCalendar{
      margin: 20px auto;
    }
  }
</style>