<template>
  <div class="todo-list">
    <div v-bind:key="todo.id" v-for="todo in todos" class="todo-list__item">
      <Todo v-bind:todo="todo" />
    </div>
    <div class="todo-list__item todo-list__add-btn" v-if="todosCount < todosMax" @click="showAddForm()">
      <img src="../assets/icons/delete.svg" alt="" class="todo-list__add-icon">
      <AddTodo v-if="showAddModal" />
    </div>


  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
import AddTodo from './AddTodo';


import Todo from './Todo';
export default {
  name: 'Todos',
  components: {
    Todo,
    AddTodo
  },
  props: [
    // "todos"
  ],
  computed: { ...mapGetters([ 'todosCount', 'todos', 'todosMax', 'showAddModal' ]) },
  methods: { ...mapMutations([ 'showAddForm' ]), }


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
</style>