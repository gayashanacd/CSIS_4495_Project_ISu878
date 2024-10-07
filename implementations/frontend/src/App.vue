<template>
  <div id="app">
    <div v-if="auth">
      <main-layout></main-layout>
    </div>
    <div v-else-if="pathName === '/register'">
      <registration-view></registration-view>
    </div>
    <div v-else>
      <login-layout></login-layout>
    </div>
  </div>
</template>

<script>

import MainLayout from '@/components/common/MainLayout.vue'
import LoginLayout from '@/components/user/UserLogin.vue'
import RegistrationView from '@/components/registration/RegistrationView.vue'

export default{
  name : "app",
  data() {           
    return {
      auth : false,
    };
  },
  components:{
    MainLayout,
    LoginLayout,
    RegistrationView
  },
  computed:{
    pathName(){
      console.log("Router >> ", window.location.pathname)
      return window.location.pathname;  
    }
  },
  mounted() {   
    this.auth = JSON.parse(localStorage.getItem('isAuth')); 
  }
}
</script>

<style>
</style>
