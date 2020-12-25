<template>
  <button class="addCalendar">Создать свой календарь</button>
</template>
<script>
export default {
  name: 'AddCalendar',
  data() {
    return {
      title: ''
    }
  },
  methods: {

  }
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
</style>