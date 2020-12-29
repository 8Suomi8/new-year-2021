<template>
  <div class="todo">
    <div class="todo__content">
    <div class="todo__header">
      <div class="todo__icon-wrapper">
        <img :src="currentTip(todo.tip).img" alt="" class="todo__icon">
      </div>
      <span class="todo__date">{{new Date(todo.date).toLocaleDateString('ru', { month: 'long', day: 'numeric' })}}</span>
    </div>
    <p class="todo__text">{{ todo.title }}</p>
    </div>
    <div class="todo__footer">
      <div class="todo__like">
        <button class="todo__like-btn" @click="toggleLike">
          <img :src="todo.liked ? require('../assets/icons/full-heart.svg') : require('../assets/icons/heart.svg')" alt="" class="todo__like-icon">
        </button>
        <span class="todo__like-count">{{ todo.likeCount }}</span>
      </div>
      <div v-if="!viewedUserId && user && user.id">
        <button class="todo__edit-btn" @click="toggleEditModal">
          <img src="../assets/icons/edit.svg" alt="" class="todo__edit-icon">
        </button>
        <button class="todo__delete-btn" @click="deleteTodo(todo.id)">
          <img src="../assets/icons/delete.svg" alt="" class="todo__delete-icon">
        </button>
      </div>
    </div>
    <AddTodo v-if="showEditModal" :todo="todo" :toggleEditModal="toggleEditModal"/>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import AddTodo from './AddTodo';

export default {
  name: 'Todo',
  components: { 
    AddTodo,
  },
  props: [
    "todo",
  ],
  data() { 
    return { 
      showEditModal: false
    } 
  },

  methods: {
    ...mapActions(['deleteTodo', 'toogleLike']),
    ...mapMutations(['showAddModal']),
    toggleEditModal(){
      this.showEditModal = !this.showEditModal
    },
    toggleLike() {
      if (!this.viewedUserId) {
        return;
      }

      this.toogleLike(this.todo.id);
    },
  },
  computed: { 
    ...mapGetters([ 'currentTip', 'viewedUserId', 'user' ]),  },
}
</script>
<style scoped lang="scss">
  .todo{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        box-shadow: 0px 0px 30px 25px #e05c5c9e;
      }

    }
    &__date{
      color: #e05c5c;
      font-size: 55px;
      width: 100%;
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
@media(max-width: 1400px){
  .todo{
    &__text{
      font-size: 14px;
    }
    &__date{
      font-size: 36px;
    }
    &__icon-wrapper{
      margin-right: 15px;
    }
  }
}
@media(max-width: 400px){
  .todo{
    &__content{
      padding: 20px;
    }
    &__date{
      font-size: 28px;
    }
  }
}
</style>