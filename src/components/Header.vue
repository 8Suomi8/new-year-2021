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
      <div class="share" v-if="isAuthorized">
        Поделиться: 
        <vue-goodshare-vkontakte
          :page_url="'http://2021.supportix.ru/?userid=' + user.id"
          title_social=""
          has_icon
        ></vue-goodshare-vkontakte>

    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import VueGoodshareVkontakte from "vue-goodshare/src/providers/Vkontakte.vue";


import {mapGetters} from 'vuex'
// import SocialSharing from './SocialSharing';

export default {
  name: 'Header',
  data() {
    return {
      
    }
  },
  components: {
    VueGoodshareVkontakte
  },
  methods: {

  },
  computed: { 
    ...mapGetters([
      'todosCount',
      'tipsList',
      'todosMax',
      'user',
      'isAuthorized'
    ]) }


}
</script>
<style scoped lang="scss">
.share{
  margin-left: auto;
}
.vkontakte__design__flat{
  background: transparent;
}
.header{
  display: flex;
  align-items: center;
  margin: 40px 0;
  flex-wrap: wrap;
}
.tips{
  display: flex;
  flex-wrap: wrap;
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

@media(max-width: 1280px){
  .tips{
    &__item{
      margin-right: 30px;
    }
  }
}
@media(max-width: 1024px){
    .cards-quantity{
      order: 1;
      margin-left: 0;
      margin-right: 20px;
    }
    .share{
      order: 2;
    }
    .tips{
      width: 100%;
      border-right: none;
      margin-bottom: 10px;
      &__item{
        margin-bottom: 20px;
      }
    }
  }
</style>