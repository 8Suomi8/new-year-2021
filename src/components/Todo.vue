<template>
  <div class="todo">
    <div class="todo__content">
    <div class="todo__header">
      <div class="todo__icon-wrapper">
        <img src="../assets/icons/plans.svg" alt="" class="todo__icon">
      </div>
      <span class="todo__date">{{todo.date}}</span>
    </div>
    <p class="todo__text">{{ todo.title }}</p>
    </div>
    <div class="todo__footer">
      <div class="todo__like">
        <button class="todo__like-btn">
          <img src="../assets/icons/heart.svg" alt="" class="todo__like-icon">
        </button>
        <span class="todo__like-count">300</span>
      </div>
      <button class="todo__edit-btn">
        <img src="../assets/icons/edit.svg" alt="" class="todo__edit-icon">
      </button>
      <button class="todo__delete-btn" @click="deleteTodo(todo.id)">
        <img src="../assets/icons/delete.svg" alt="" class="todo__delete-icon">
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Todo',
  props: [
    "todo"
  ],
  methods: {
    ...mapMutations([ 'deleteTodo' ]),
  }
}
</script>
<style scoped lang="scss">
  .todo{
    &__content{
      padding: 35px;
    }
    &__header{
      display: flex;
      align-items: center;
      margin-bottom: 35px;
    }
    &__icon{
      width: 50px;
      height: 50px;
    }
    &__icon-wrapper{
      margin-right: 40px;
      position: relative;
      &::after{ 
        content: "" ; 
        position: absolute; 
        top: 50% ; 
        left: 50% ; 
        z-index: 1 ; 
        transform: translate(-50%, -50%) ; 
        width: 1px ; 
        height: 1px ; 
        border-radius: 50% ; 
        background-color: #e05c5c66 ; 
        box-shadow: 0px 0px 30px 25px #e05c5ccc;
      }

    }
    &__date{
      color: #e05c5c;
      font-size: 55px;
    }
    &__text{
      height: 150px;
      font-size: 16px;
      line-height: 1.5;
    }
    &__footer{
      display: flex;
      align-items: center;
      padding: 10px;
    }
    &__like{
      margin-right: auto;
      display: flex;
      align-items: center;
    }
    &__like-btn{
      background: transparent;
      border: none;
      outline: none;
      margin-right: 10px;
      cursor: pointer;
    }
    &__like-icon{
      width: 20px;
      height: 20px;
    }
    &__like-count{
      color: #e05c5c;
    }
    &__edit-btn{
      background: transparent; 
      border: none; 
      outline: none;
      margin-right: 10px;
      position: relative;
      cursor: pointer;
      &::after{
        position: absolute;
        content: '';
        height: 18px;
        width: 1px;
        background: #383838;
        top: 0;
        right: -10px;
      }
    }
    &__edit-icon{
      width: 18px; 
      height: 18px;
    }
    &__delete-btn{
      background: transparent; 
      border: none; 
      outline: none;
      margin-left: 10px;
      cursor: pointer;
    }
    &__delete-icon{
      width: 18px; 
      height: 18px;

    }
  }
</style>