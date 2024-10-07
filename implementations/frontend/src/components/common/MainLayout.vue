<template>
  <div>
    <HeaderBar />
    <SideBar />
    <div id="main" class="main">            
      <router-view/>         
    </div>
    <FooterBar />
  </div>
</template>

<script>

import HeaderBar from '@/components/common/HeaderBar.vue'
import SideBar from '@/components/common/SideBar.vue'
import FooterBar from '@/components/common/FooterBar.vue'

export default {
    name: "MainLayout",
    data() {           
      return {

      };
    },
    components: {
      HeaderBar,
      SideBar, 
      FooterBar
    },
    methods: {

    },
    mounted() {   

    }
};
</script>

<style>

</style>
