<template>
  <div class="header">
    <div class="tips">
      <div v-for="tip in tipsList" v-bind:key="tip.id" class="tips__item" :class="{'isActive': filterType === tip.id}" @click='toggleFilterTodos(tip.id)'>
        <div class="tips__icon-wrapper">
          <img :src="tip.img" alt="" class="tips__icon">
        </div>
        <span class="tips__text">{{tip.text}}</span>
      </div>
    </div>
    <div class="cards-quantity">
      <p class="cards-quantity__text">Карточки: <span class="cards-quantity__number">{{this.todosCount}}</span> / {{todosMax}}</p>
    </div>
      <div class="share">
        Поделиться: 
        <vue-goodshare-vkontakte
          v-if="user"
          :page_url="'https://2021.supportix.ru/?userid=' + user.id"
          title_social=""
          has_icon
        ></vue-goodshare-vkontakte>
        <vue-goodshare-vkontakte
          v-if="!user"
          page_url="http://2021.supportix.ru/"
          title_social=""
          has_icon
        ></vue-goodshare-vkontakte>
        <vue-goodshare-facebook
          v-if="user"
          :page_url="'https://2021.supportix.ru/?userid=' + user.id"
          title_social=""
          has_icon
        ></vue-goodshare-facebook>
        <vue-goodshare-facebook
          v-if="!user"
          page_url="http://2021.supportix.ru/"
          title_social=""
          has_icon
        ></vue-goodshare-facebook>

    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import VueGoodshareVkontakte from "vue-goodshare/src/providers/Vkontakte.vue";
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";


import {mapGetters, mapMutations} from 'vuex'
// import SocialSharing from './SocialSharing';

export default {
  name: 'Header',
  data() {
    return {
      
    }
  },
  components: {
    VueGoodshareVkontakte,
    VueGoodshareFacebook
  },
  methods: {
    ...mapMutations([ 'toggleFilterTodos' ]), 
  },
  computed: { 
    ...mapGetters([
      'todosCount',
      'tipsList',
      'todosMax',
      'user',
      'isAuthorized',
      'filterType',
      'viewedUserId'
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
.facebook__design__flat{
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
    cursor: pointer;
    &.isActive{
      .tips__icon-wrapper::after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 1px;
        border-radius: 50%;
        background-color: #e05c5c66;
        box-shadow: 0px 0px 15px 15px #e05c5c9e;
      }
    }
  }
  &__text{
    font-size: 14px;
  }
  &__icon-wrapper{
    position: relative;
    margin-right: 10px;
  }
  &__icon{
    width: 25px;
    height: 25px;
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