<template>
  <div>
    <div class="datePickerWrapper" v-show="showDatePicker">
      <date-picker
        inline
        v-model="date"
        format="D MMMM"
        :lang="lang"
        :disabled-date="not2021"
        @input="setDate"
        @change="this.toggleDatePicker"
      ></date-picker>
    </div>
    <div @click="this.toggleDatePicker">
      {{ date.toLocaleDateString('ru', { month: 'long', day: 'numeric' }) }}
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  props: ['showDatePicker', 'toggleDatePicker'],
  data() {
    return {
      date: new Date('2021-01-01'),
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    };
  },
  methods: {
    setDate(newDate) {
      this.date = new Date(newDate);
    },
    not2021(date) {
      return date.getFullYear() !== 2021;
    },
  },
};
</script>
<style lang="scss">
.mx-input {
  background: transparent;
  color: #e05c5c;
  font-size: 55px;
  border: none;
}
</style>
