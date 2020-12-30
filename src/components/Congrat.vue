<template>
  <div class="congrat">
    <div class="congrat__wrapper">
      <p class="congrat__name" v-if="todosUser && todosUser.first_name && todosUser.last_name">
        <span>{{todosUser.first_name}} {{todosUser.last_name}}</span>
      </p>
      <h1 class="congrat__title">Мой календарь</h1>
      <p class="congrat__year">2021</p>
      <p class="congrat__text">Перед вами маленький календарик на следующий год. Но это не простой календарь, заносите сюда все ваши мечты, желания и планы, а также знаменательные для вас даты и события.</p>
      <p class="congrat__text">Не забудьте поделиться вашим календарём с друзьями! </p>
    </div>
    <Login />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Login from './Login';

export default {
  name: 'Congrat',
  components: { 
    Login 
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {

  },
  computed: { 
    ...mapGetters([
      'todosUser'
    ])
  }
}
</script>
<style scoped lang="scss">
  .congrat{
      margin: 50px 0;
    &__wrapper{
      margin: 0 auto;
      width: 100%;
      max-width: 500px; 
    }
    &__title{
      font-size: 47px;
      font-weight: 500;
      text-transform: uppercase;
    }
    &__year{
      font-size: 217px;
      color: #e05c5c;
    }
    &__text{
      font-size: 14px;
      font-weight: 300;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    &__link{
       color: #e05c5c;
    }
    &__name{
      background: #e05c5c;
      color: #fff;
      padding: 7px 20px;
      border-radius: 5px;
      display: inline-block;
      margin-bottom: 30px;
    }
  }
  @media(max-width: 768px){
    .congrat{
      text-align: center;
      &__title{
        font-size: 30px;
      }
      &__year{
        font-size: 150px;
      }
    }
  }
  @media(max-width: 400px){
    .congrat{
      &__title{
        font-size: 24px;
      }
      &__year{
        font-size: 100px;
        margin-bottom: 30px;
      }
      
    }
  }
</style>