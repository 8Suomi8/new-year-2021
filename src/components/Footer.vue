<template>
  <div class="footer">
    <span class="footer__text">© 2021. Все права защищены. </span>
    <img src="../assets/img/supportix_logo_new.png" alt="" class="footer__logo">
  </div>
</template>
<script>



export default {
  name: 'Footer',
  data(){
    return {

    }
  },
  components: {

  },
  computed: { 
    
  },
  methods: { 
    
  }


}
</script>
<style scoped lang="scss">
.footer{
  background: #000;
  margin-top: 50px;
  padding: 20px 20px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  &__text{
    margin-bottom: 10px;
  }
  &__logo{
    margin-left: 10px;
    width: 90px;
  }
}

</style>