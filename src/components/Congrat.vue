<template>
  <div class="congrat">
    <h1 class="congrat__title">Мой календарь</h1>
    <p class="congrat__year">2021</p>
    <p class="congrat__text">Перед вами маленький календарик на следующий год. Но это не простой календарь, заносите сюда все ваши мечты, желания и планы, а также знаменательные для вас даты и события.</p>
    <p class="congrat__text">Не забудьте поделиться вашим календарём с друзьями! <br>
    Чтобы сохранить ваши заметки и поделиться ими с друзьями, <a href="" class="congrat__link">авторизуйтесь</a> через сервисы.</p>
    
  </div>
</template>
<script>

export default {
  name: 'Congrat',
  components: {

  },
  data() {
    return {
      title: ''
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .congrat{
    width: 100%;
    max-width: 500px;
    margin: 50px auto;
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
  }
</style>