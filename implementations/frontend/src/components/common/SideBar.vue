<template>
    <div>
      <!-- ======= Sidebar ======= -->
        <aside id="sidebar" class="sidebar">
            <ul class="sidebar-nav" id="sidebar-nav">
                <li class="nav-item">
                    <router-link class="nav-link collapsed" to="/dashboard">
                        <i class="bi bi-pie-chart"></i>
                        <span>Dashboard</span>
                    </router-link>
                </li><!-- End Dashboard Nav -->
                <li class="nav-item" >
                    <router-link class="nav-link collapsed" to="/impact_entry">
                        <i class="bi bi-journal-text"></i>
                        <span>Impact Entry</span>
                    </router-link>
                </li><!-- End Impact Entry Nav -->
                <li class="nav-item" >
                    <router-link class="nav-link collapsed" to="/community">
                        <i class="bi bi-people"></i>
                        <span>Community</span>
                    </router-link>
                </li><!-- End Community Nav -->
                <li class="nav-item" >
                    <router-link class="nav-link collapsed" to="/recommendations">
                        <i class="bi bi-lightbulb"></i>
                        <span>Recommendations</span>
                    </router-link>
                </li><!-- End Recommendations Nav -->
                <li class="nav-item" >
                    <router-link class="nav-link collapsed" to="/profile">
                        <i class="bi bi-person"></i>
                        <span>Profile</span>
                    </router-link>
                </li><!-- End Profile Nav -->
            </ul>
        </aside><!-- End Sidebar-->    
    </div>
  </template>
  
  <script>
  
  export default {
    name: "SideBar",
    data() {           
        return {

        };
    },
    computed: {

    },
    components: {

    },
    methods: {

    },
    mounted() {   

    }
  };
  </script>
  
  <style>
  
  </style>
  