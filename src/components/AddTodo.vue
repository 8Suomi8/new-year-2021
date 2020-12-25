<template>
  <div>
    <form @submit="newTodo">
      <input type="text" v-model="title" name="title">
      <button type="submit">Add</button>
    </form>
  </div>
</template>
<script>
import {v4 as uuid} from 'uuid';
import { mapMutations } from 'vuex';


export default {
  name: 'AddTodo',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    ...mapMutations([ 'addTodo' ]),
    newTodo(e) {
      e.preventDefault();
      const newTodoObj = {
        id: uuid(),
        title: this.title,
      };
      this.addTodo(newTodoObj);
    },
    

  }
}
</script>
<style scoped>
</style>