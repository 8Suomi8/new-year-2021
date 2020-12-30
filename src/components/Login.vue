<template>
  <div class="authWrapper">
    <div class="congrat__wrapper">
      <dir v-if="!isAuthorized">
        <span>Чтобы сохранить ваши заметки и поделиться ими с друзьями, авторизуйтесь через <button @click="vkLogin" class="socialAuthBtn">ВК</button> или <button @click="googleLogin" class="socialAuthBtn">Google</button>.</span>
      </dir>
    </div>
    <div v-if="isAuthorized" class="logout">
      <span>{{user.first_name}} {{user.last_name}}</span>
      <button @click="logout" class="logoutBtn">Выйти</button>
    </div>
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
      'setTodosUser',
      'setAccessToken',
      'setTodos'
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
        // this.$gAuth.signOut();
      }

      this.setUser(null);
      this.setTodosUser(null);
      this.setAccessToken({access_token: ''});

      this.setTodos([]);
    }
  }
}
</script>
<style lang="scss">
  .congrat{
    &__wrapper{
      margin: 0 auto;
      width: 100%;
      max-width: 500px; 
    }
  }
  .socialAuthBtn{
    color: #e05c5c;
    background: transparent;
    outline: none;
    border: none;
    display: inline-block;
    cursor: pointer;
  }
  .logout{
    display: flex;
    justify-content: flex-end;

  }
  .logoutBtn{
    color: #e05c5c;
    background: transparent;
    outline: none;
    border: none;
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
  }
  .authWrapper{
    // display: inline-block;
    span{
      line-height: 2;
    }
  }
</style>