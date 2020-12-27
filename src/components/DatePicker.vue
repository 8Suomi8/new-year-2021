<template>
  <div class="datePicker">
    <div class="datePickerWrapper" v-show="showDatePicker">
      <date-picker
        inline
        v-bind="date"
        format="D MMMM"
        :lang="lang"
        :disabled-date="this.not2021"
        @input="this.setDate"
        @change="this.toggleDatePicker"
      ></date-picker>
    </div>
    <div @click="this.toggleDatePicker" class="datePicker__date">
      {{ date.toLocaleDateString('ru', { month: 'long', day: 'numeric' }) }}
      <img src="../assets/icons/calendar.svg" alt="" class="datePicker__icon">
    </div>
  </div>
</template>
<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  props: ['showDatePicker', 'toggleDatePicker', 'date', 'setDate', 'not2021', 'closeDatePicker'],
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    };
  },
  methods: {
  },
};
</script>
<style lang="scss">
.datePickerWrapper{
    position: absolute;
    right: 0;
    bottom: 100%;
}
.datePicker{
  width: 100%;
  position: relative;
  &__date{
    color: #e05c5c;
    font-size: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__icon{
    width: 25px;
    height: 25px;
  }
}
.mx-input {
  background: transparent;
  color: #e05c5c;
  font-size: 55px;
  border: none;
}
</style>
