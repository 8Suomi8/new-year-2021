<template>
  <div class="authWrapper">
    <div v-if="isAuthorized">
      <button @click="logout" class="vkAuthBtn">Выйти</button>
    </div>
    <dir v-else>
      <span>Чтобы сохранить ваши заметки и поделиться ими с друзьями, <button @click="vkLogin" class="vkAuthBtn">авторизуйтесь</button> через сеть ВКонтакте.</span>
      <!-- <button @click="fbLogin">fbLogin</button> -->
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
      'setAccessToken',
      'resetTodos'
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