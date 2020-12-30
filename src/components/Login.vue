<template>
  <div class="authWrapper">
    <div v-if="isAuthorized">
      <button @click="logout" class="vkAuthBtn">Выйти</button>
    </div>
    <dir v-else>
      <span>Чтобы сохранить ваши заметки и поделиться ими с друзьями, <button @click="vkLogin" class="vkAuthBtn">авторизуйтесь</button> через сеть ВКонтакте.</span>
      <button @click="googleLogin">GoogleLogin</button>
    </dir>
  </div>
</template>
  
<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import VKAuth from '@dyadikov/vue-vk-oauth2'
import GoogleAuth from '../utils/google.js'

Vue.use(VKAuth, {apiId: 7713155})
Vue.use(GoogleAuth, {
  clientId: '977537483129-c6r9bk04qhmcfebjr9e1jipq959ssu9f.apps.googleusercontent.com',
  scope   : 'profile email',
  prompt  : 'select_account'
});


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
      'setAccessToken',
      'resetTodos'
    ]),
    googleLogin () {
      this.$gAuth
        .signIn()
        .then(googleUser => {
          let profile = googleUser.getBasicProfile();
          let authResponse = googleUser.getAuthResponse();

          this.addUser({
            user: {
              type      : 'google',
              userId    : profile.getId(),
              href      : profile.getEmail(),
              first_name: profile.getGivenName(),
              last_name : profile.getFamilyName(),
            },
            access_token: authResponse.access_token,
            expire: authResponse.expires_at / 1000,
          })
        })
        .catch(() => {
          Vue.notify({
            group: 'auth',
            title: 'Ошибка авторизации',
          })
        })
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
              access_token: response.session.sid,
              expire: response.session.expire,
            })
          } else {
            Vue.notify({
              group: 'auth',
              title: 'Ошибка авторизации',
            })
          }
        })
    },
    logout () {
      if (this.user.type == 'vk') {
        this.$vkAuth.logout();
      }

      if (this.user.type == 'google') {
        this.$gAuth.signOut();
      }

      this.setUser(null);
      this.setAccessToken({access_token: ''});

      this.resetTodos();
    }
  }
}
</script>
<style lang="scss">
  .vkAuthBtn{
    color: #e05c5c;
    background: transparent;
    outline: none;
    border: none;
    display: inline-block;
    cursor: pointer;
  }
  .authWrapper{
    display: inline-block;
    span{
      line-height: 2;
    }
  }
</style>