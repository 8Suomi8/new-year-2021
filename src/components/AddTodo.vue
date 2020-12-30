<template>
  <div class="addTodo">
    <form  class="addTodo__form">
      <div class="addTodo__content">
        <div class="addTodo__header">
          <div class="addTodo__icon-wrapper">
            <button type="button" class="addTodo__tip-select-btn" @click.stop="toggleTipPicker">
              <!-- <img :src="currentTip().img" alt="" class="addTodo__icon" /> -->
              <img :src="this.tip.img" alt="" class="addTodo__icon" />
            </button>
          </div>
          <DatePicker v-on-clickaway="awayDatePicker" :showDatePicker="showDatePicker" :toggleDatePicker="toggleDatePicker" :setDate="setDate" :not2021='not2021' :date="date" />
        </div>
        <textarea type="text" v-model="title" name="title" class="addTodo__text" placeholder="Введите текст" />
      </div>
      <div class="addTodo__footer">
        <button type="submit" class="addTodo__submit-btn" @click.stop="newTodo">
          <img src="../assets/icons/check.svg" alt="" class="addTodo__submit-icon" />
        </button>
        <button  type="button" class="addTodo__close-btn"  @click.stop="closeModal">
          <img src="../assets/icons/delete.svg" alt="" class="addTodo__close-icon" />
        </button>
      </div>
    </form>
    <TipPicker v-on-clickaway="awayTipPicker" :toggleTipPicker="toggleTipPicker" :showTipPicker="showTipPicker" :setTip="setTip" v-bind:todoTipId='this.todo.tip'/>
  </div>
</template>
<script>
import Vue from 'vue';

import { directive as onClickaway } from 'vue-clickaway';
import { mapActions, mapGetters } from 'vuex';
import DatePicker from './DatePicker';
import TipPicker from './TipPicker';


export default {
  name: 'AddTodo',
  directives: {
    onClickaway: onClickaway,
  },
  components: { 
    DatePicker, 
    TipPicker, 
  },
  data() {
    if(!this.todo) {
      return {
        title: '',
        date: new Date('2021-01-01'),
        showDatePicker: false,
        showTipPicker: false,
        tip: {
            id: 'event',
            text: 'Событие',
            img: require('@/assets/icons/event.svg'),
        },
        emptyTextarea: false,
        likeCount: 0,
      };
    } else {
      return {
        title: this.todo.title,
        date: new Date(this.todo.date),
        showDatePicker: false,
        showTipPicker: false,
        tip: this.$store.getters.currentTip(this.todo.tip),
        emptyTextarea: false,
        likeCount: this.todo.likeCount,
      };
    }
  },
  props: ['toggleAddModal', 'toggleEditModal', 'setTodoData', 'todo'],
  methods: {
    ...mapActions(['addTodo', 'editTodo']),
    newTodo(e) {
      e.preventDefault();
      if (this.title == '') {

        Vue.notify({
          group: 'auth',
          title: 'Добавьте текст',
        })

        this.emptyTextarea = true;
        return;
      }
      this.emptyTextarea = false;
      
      const newTodoObj = {
        title: this.title,
        date: new Date(this.date),
        tip: this.tip.id,
        likeCount: this.likeCount,
      };

      if(!this.todo) {
        this.toggleAddModal();
        this.addTodo(newTodoObj);
      } else {
        this.toggleEditModal();
        this.editTodo(Object.assign({}, this.todo, newTodoObj));
      }
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
    closeTipPicker() {
      this.showTipPicker = false;
    },
    toggleTipPicker() {
      this.showTipPicker = !this.showTipPicker;
    },
    setDate(newDate) {
      this.date = new Date(newDate);
    },
    not2021(date) {
      return date.getFullYear() !== 2021;
    },
    awayDatePicker: function() {
      this.closeDatePicker();
    },
    awayTipPicker: function() {
      this.closeTipPicker();
    },
    setTip(tipsList, tipId){
      const currentTipObject = tipsList.find(tip => tip.id == tipId);
      this.tip = currentTipObject;
      this.toggleTipPicker();
    },
    closeModal(){
      if(!this.todo){
        this.toggleAddModal();
      } else {
        this.toggleEditModal();
      }
    }
  },
  computed: { 
  ...mapGetters([ 'currentTip', 'tipsList', 'defaultTip' ]),  
  },
};
</script>
<style scoped lang="scss">
.addTodo {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #191919;
  &__form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__content {
  }
  &__tip-select-btn {
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
  }
  &__header {
    padding: 20px 35px 15px 35px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #383838;
  }
  &__icon {
    width: 50px;
    min-width: 50px;
    height: 50px;
  }
  &__icon-wrapper {
    margin-right: 40px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 1px;
      border-radius: 50%;
      background-color: #e05c5c66;
      box-shadow: 0px 0px 30px 25px #e05c5c9e;
    }
  }
  &__text {
    height: 170px;
    font-size: 16px;
    line-height: 1.5;
    padding: 0 35px;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    color: #fff;
    resize: none;
  }
  &__footer {
    display: flex;
    align-items: center;
    padding: 5px;
    border-top: 1px solid #383838;
    position: relative;
  }
  &__close-btn {
    background: transparent;
    border: none;
    outline: none;
    margin-left: 10px;
    position: absolute;
    cursor: pointer;
    right: 10px;
  }
  &__close-icon {
    width: 18px;
    height: 18px;
  }
  &__submit-btn {
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
  }
  &__submit-icon {
    width: 35px;
    height: 35px;
  }
}
@media(max-width: 1400px){
  .addTodo{
    &__icon-wrapper{
      margin-right: 15px;
    }
    &__text{
      font-size: 14px;
    }
  }
}
@media(max-width: 400px){
  .addTodo{
    &__header{
      padding: 20px;
    }
    &__text{
      padding: 0 20px;
    }
    &__date{
      font-size: 28px;
    }
  }
}
</style>
