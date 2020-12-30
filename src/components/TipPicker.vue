<template>
<transition name="fade">
  <div class="tipPicker" v-show="showTipPicker">
    <form class="tipPicker__form">
      <div class="tipPicker__content">
        <div class="tipPicker__header">
          <div class="tipPicker__icon-wrapper">
              <!-- <img :src="currentTip().img" alt="" class="tipPicker__icon" /> -->
              <img :src="currentTip().img" alt="" class="tipPicker__icon" />
          </div>
          <!-- <span>{{currentTip().text}}</span> -->
          <span>{{currentTip().text}}</span>
        </div>
        <div class="tipsList">
          <div v-for="tip in tipsList" v-bind:key="tip.id" class="tipsList__item" @click="setTip(tipsList, tip.id)">
            <img :src="tip.img" alt="" class="tipsList__icon">
            <span class="tipsList__text">{{tip.text}}</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</transition>
</template>
<script>

import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'TipPicker',
  data() {
    return {

    };
  },
  props: ['showTipPicker', 'toggleTipPicker', 'setTip'],
  methods: {
    ...mapMutations([ 'curretnTip' ]),
  },
  computed: { 
    ...mapGetters([ 'currentTip', 'tipsList', 'defaultTip' ]),  
  },
};
</script>
<style scoped lang="scss">
.tipPicker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:#191919;
  &__form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__content {
  }
  &__tip-select-btn {
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
  }
  &__header {
    height: 102px;
    padding: 20px 35px 15px 35px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #383838;
  }
  &__icon {
    width: 50px;
    height: 50px;
  }
  &__icon-wrapper {
    position: relative;
    margin-right: 40px;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 1px;
      border-radius: 50%;
      background-color: #e05c5c66;
      box-shadow: 0px 0px 30px 25px #e05c5c9e;
    }
  }
}
.tipsList{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 35px;
  &__item{
    width: 49%;
    display: flex;
    align-items: center;
    margin-bottom: 18px;
  }
  &__text{
    font-size: 14px;
  }
  &__icon{
    width: 35px;
    height: 35px;
    margin-right: 20px;
  }
}
</style>
