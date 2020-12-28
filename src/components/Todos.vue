<template>
  <div class="todo-list">
    <div v-bind:key="todo.id" v-for="todo in todos" class="todo-list__item">
      <Todo v-bind:todo="todo" />
    </div>
    <div class="todo-list__item todo-list__add-btn" v-if="todosCount < todosMax" @click.self="toggleAddModal">
      <img src="../assets/icons/delete.svg" alt="" class="todo-list__add-icon" @click.self="toggleAddModal">
      <AddTodo v-if="showAddModal" :toggleAddModal="toggleAddModal" :showAddModal="showAddModal"/>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
import AddTodo from './AddTodo';


import Todo from './Todo';
export default {
  name: 'Todos',
  data(){
    return {
      showAddModal: false,
    }
  },
  components: {
    Todo,
    AddTodo
  },
  props: [
    // "todos"
  ],
  computed: { 
    ...mapGetters([ 'todosCount', 'todos', 'todosMax']) ,
  },
  methods: { 
    ...mapMutations([ 'showAddForm' ]), 
    toggleAddModal() {
      this.showAddModal = !this.showAddModal;
    },
    // addLike(todoId){
    //   console.log(todoId);
    //   // todos[todoId].likeCount++;
    // },
    // deleteLike(todoId){
    //   console.log(todoId);
    //   // todos[todoId].likeCount--;
    // },
  }


}
</script>
<style scoped lang="scss">
.todo-list{
  display: flex;
  flex-wrap: wrap;
  &__item{
    height: 363px;
    width: 32.5%;
    margin-right: 1.2%;
    margin-bottom: 1.2%;
    border: 1px solid #383838;
    position: relative;
    &:nth-child(3n){
      margin-right: 0;
    }
  }
  &__add-btn{
    cursor: pointer;
    background: transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__add-icon{
    width: 60px;
    height: 60px;
    transform: rotate(45deg);
  }
}

@media(max-width: 1024px){
  .todo-list{
    &__item{
      width: 49%;
      margin-right:2%;
      margin-bottom: 2%;
      &:nth-child(3n){
        margin-right: 2%;
      }
      &:nth-child(2n){
        margin-right: 0;
      }
    }
  }
}
@media(max-width: 700px){
  .todo-list{
    &__item{
      width: 100%;
      margin-right: 0;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
}

</style>