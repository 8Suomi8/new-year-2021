<template>
  <div class="header">
    <div class="tips">
      <div v-for="tip in tipsList" v-bind:key="tip.id" class="tips__item">
        <img :src="tip.img" alt="" class="tips__icon">
        <span class="tips__text">{{tip.text}}</span>
      </div>
    </div>
    <div class="cards-quantity">
      <p class="cards-quantity__text">Карточки: <span class="cards-quantity__number">{{this.todosCount}}</span> / {{todosMax}}</p>
    </div>
    <div class="share">
      Поделиться: вк, fb
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      
    }
  },
  methods: {

  },
  computed: { 
    ...mapGetters([
      'todosCount',
      'tipsList',
      'todosMax'
    ]) }


}
</script>
<style scoped lang="scss">
.header{
  display: flex;
  align-items: center;
  margin: 40px 0;
}
.tips{
  display: flex;
  align-items: center;
  border-right: 1px solid #fff;
  &__item{
    display: flex;
    align-items: center;
    margin-right: 50px;
  }
  &__text{
    font-size: 14px;
  }
  &__icon{
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}
.cards-quantity{
  margin-left: 50px;
  margin-right: 50px;
  &__text{

  }
  &__number{
    color: #e05c5c;
  }
}
.share{
  margin-left: auto;
}
</style>