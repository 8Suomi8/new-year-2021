<template>
  <div id="vk_auth">111</div>
</template>
  
<script>
export default {
  name: 'VKAuthWidjet',
  head() {
    return {
      script: [
          { src: 'https://vk.com/js/api/openapi.js?168'}
        ]
    }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted () {
    // VK.init({apiId: API_ID});
    // VK.Widgets.Auth("vk_auth", {"authUrl":"/dev/Login"});
  }
}
</script>
<style scoped lang="scss">
 
</style>