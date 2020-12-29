<template>
  <div>
    <div v-if="isAuthorized">
      <button @click="logout">Выйти</button>
    </div>
    <dir v-else>
      <button @click="vkLogin">vkLogin</button>
      <button @click="fbLogin">fbLogin</button>
    </dir>
  </div>
</template>
  
<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import VKAuth from '@dyadikov/vue-vk-oauth2'

Vue.use(VKAuth, {apiId: 7713155})

export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'isAuthorized',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'addUser'
    ]),
    ...mapMutations([
      'setUser',
      'setAccessToken'
    ]),
    fbLogin () {
    },
    vkLogin () {
      this.$vkAuth.login()
        .then(response => {
          if (response.status === 'connected') {
            this.addUser({
              user: {
                type      : 'vk',
                userId    : response.session.user.id,
                href      : response.session.user.href,
                first_name: response.session.user.first_name,
                last_name : response.session.user.last_name,
              },
              access_token: response.session.sid
            })
          } else {
            console.error('ошибка авторизации');
          }
        })
    },
    logout () {
      if (this.user.type == 'vk') {
        this.$vkAuth.logout();
      }

      this.setUser(null);
      this.setAccessToken('');
    }
  }
}
</script>