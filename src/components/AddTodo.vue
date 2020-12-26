<template>
  <div class="addTodo">
    <form @submit="newTodo" class="addTodo__form">
      <div class="addTodo__content">
        <div class="addTodo__header">
          <div class="addTodo__icon-wrapper">
            <button class="addTodo__tip-select-btn">
              <img src="../assets/icons/plans.svg" alt="" class="addTodo__icon" />
            </button>
          </div>
          <!-- <span class="addTodo__date">1 zydfhz</span> -->
          <DatePicker :showDatePicker="showDatePicker" :toggleDatePicker="toggleDatePicker" />
        </div>
        <textarea type="text" v-model="title" name="title" class="addTodo__text" />
      </div>
      <div class="addTodo__footer">
        <button type="submit" class="addTodo__submit-btn">
          <img src="../assets/icons/check.svg" alt="" class="addTodo__submit-icon" />
        </button>
        <button class="addTodo__close-btn">
          <img src="../assets/icons/delete.svg" alt="" class="addTodo__close-icon" />
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { v4 as uuid } from 'uuid';
import { mapMutations } from 'vuex';
import DatePicker from './DatePicker';

export default {
  name: 'AddTodo',
  components: { DatePicker },
  data() {
    return {
      title: '',
      showDatePicker: false,
    };
  },
  methods: {
    ...mapMutations(['addTodo']),
    newTodo(e) {
      e.preventDefault();
      const newTodoObj = {
        id: uuid(),
        title: this.title,
      };
      this.addTodo(newTodoObj);
    },
    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
      console.log(this.showDatePicker);
    },
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
  background: #000;
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
    padding: 35px 35px 15px 35px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #383838;
  }
  &__icon {
    width: 50px;
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
  &__date {
    color: #e05c5c;
    font-size: 55px;
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
  }
  &__submit-icon {
    width: 35px;
    height: 35px;
  }
}
</style>
