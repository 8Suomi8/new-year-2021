<template>
  <div class="loader" v-if="isLoading">
    <img src="../assets/icons/snow flake-spinner.svg" alt="" class="loader__icon">
  </div>
</template>
<script>

import { mapGetters} from 'vuex'
export default {
  name: 'Loader',
  components: { 

  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
}
</script>
<style scoped lang="scss">
  .loader{
    position: fixed;
    widows: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &__icon{
      width: 60px;
      height: 60px;
      animation: 2s linear infinite rotate;
    }
  }
 @keyframes rotate { from { transform: rotate(0deg) } to { transform: rotate(360deg) }  }
</style>