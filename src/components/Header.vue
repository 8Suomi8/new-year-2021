<template>
  <div class="header">
    <div class="tips">
      <div v-for="tip in tips" v-bind:key="tip.id" class="tips__item">
        <img :src="tip.img" alt="" class="tips__icon">
        <span class="tips__text">{{tip.text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      tips: [
        {
          id: 1,
          text: 'Событие',
          img: require('@/assets/icons/event.svg'),
        },
        {
          id: 2,
          text: 'Важная дата',
          img: require('@/assets/icons/date.svg'),
        },
        {
          id: 3,
          text: 'Мечта',
          img: require('@/assets/icons/dream.svg'),
        },
        {
          id: 4,
          text: 'Идея',
          img: require('@/assets/icons/idea.svg'),
        },
        {
          id: 5,
          text: 'Планы',
          img: require('../assets/icons/plans.svg'),
        },
      ]
    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>