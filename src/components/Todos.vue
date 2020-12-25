<template>
  <div class="todo-list">
    <div v-bind:key="todo.id" v-for="todo in this.$store.state.todos" class="todo-list__item">
      <Todo v-bind:todo="todo" />
    </div>
  </div>
</template>
<script>
import Todo from './Todo';
export default {
  name: 'Todos',
  components: {
    Todo
  },
  props: [
    // "todos"
  ]
}
</script>
<style scoped lang="scss">
.todo-list{
  display: flex;
  flex-wrap: wrap;
  &__item{
    width: 32.5%;
    margin-right: 1.2%;
    margin-bottom: 1.2%;
    border: 1px solid #383838;
    
    &:nth-child(3n){
      margin-right: 0;
    }
  }
}
</style>