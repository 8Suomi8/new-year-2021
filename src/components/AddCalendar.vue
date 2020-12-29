<template>
  <button
    v-if="viewedUserId || !user"
    class="addCalendar"
    @click="addCalendar"
  >
    Создать свой календарь
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddCalendar',
  methods: {
    addCalendar() {
      if (this.isAuthorized) {
        window.location.href = window.location.origin;
      } else {
        console.error('Необходима авторизация');
      }
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
  @media(max-width: 758px){
    .addCalendar{
      margin: 20px auto;
    }
  }
</style>