<template>
    <div>
        <header id="header" class="header fixed-top d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between">

            <router-link class="logo d-flex align-items-center" to="/dashboard">
                <img alt="Logo" src="@/assets/logo.png">
                <!-- <span class="d-none d-lg-block">LittleLoom Locator</span> -->
            </router-link>
            <i class="bi bi-list toggle-sidebar-btn"></i>
            </div><!-- End Logo -->

            <!-- <div class="search-bar">
            <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword">
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
            </form>
            </div> -->

            <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">

                <li class="nav-item d-block d-lg-none">
                    <a class="nav-link nav-icon search-bar-toggle " href="#">
                        <i class="bi bi-search"></i>
                    </a>
                </li><!-- End Search Icon-->

                <!-- <li class="nav-item dropdown">
                    <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                        <i class="bi bi-chat-left-text"></i>
                        <span class="badge bg-success badge-number">{{ notificationsCount }}</span>
                    </a>End Messages Icon -->

                <!-- <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages" style="width: 350px;"> -->
                    <!-- <li class="dropdown-header">
                        You have {{ notificationsCount }} new messages
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li> -->


                    <!-- <li class="message-item" v-for="item in notifications" :key="item.id">
                        <a href="#" @click="updateNotification(item)">
                            <img src="@/assets/indi.jpg" alt="Profile" class="rounded-circle">
                            <div>
                                <h4>{{ item.senderName }}</h4>
                                <p>{{ item.message }}</p>
                                <p>{{ item.relDate }}</p>
                            </div>
                        </a>
                    </li>
                    <li>
                    <hr class="dropdown-divider">
                    </li> -->

                <!-- </ul>

                </li> -->

                <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img :src="profileImage" alt="Profile" class="rounded-circle">
                    <span class="d-none d-md-block dropdown-toggle ps-2">{{ $util.getUser() && $util.getUser().userName }}</span>
                </a><!-- End Profile Iamge Icon -->

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                        <h6>{{ entityName }}</h6>
                        <span>{{ entityEmail }}</span>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <router-link class="dropdown-item d-flex align-items-center" :to="profileRouterPath">
                            <i class="bi bi-person"></i>
                            <span>My Profile</span>
                        </router-link>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                    <a class="dropdown-item d-flex align-items-center" href="#" v-on:click.prevent="logout">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                    </li>

                </ul><!-- End Profile Dropdown Items -->
                </li><!-- End Profile Nav -->

            </ul>
            </nav><!-- End Icons Navigation -->
        </header><!-- End Header -->
    </div>
</template>

<script>

import NotificationService from "@/services/NotificationService";
import moment from 'moment';
import lodash from 'lodash';

export default {
    name: "HeaderBar",
    data() {           
        return {
            notificationsCount : 0,
            notifications : []
        };
    },
    methods: {
        logout(){
            this.$util.setAuth(false);
            this.$util.setUser({});
            this.$router.push({ name: "login" }); 
            this.$util.wait(200).then(() => {                        
                location.reload();                        
            })  
        },
        fetchMessages(){
            const user = this.$util.getUser();
            if(user){
                NotificationService.getMyNotifications(user.id)
                    .then(response => {       
                        if(response.data){
                        console.log("Notifications >> ", response.data);
                        this.notifications = this.formatData(response.data);
                        this.notificationsCount = this.notifications.length;
                        }
                    })
                    .catch(e => {
                        this.$util.notify(e.response.data.message);
                    });
            }
        },
        formatData( notifications ){
            notifications.forEach(item => {
                item.relDate = moment(item.createdDateTime).fromNow();      
            });
            notifications = lodash.filter(notifications, { 'read': false });
            return lodash.sortBy( notifications , 'createdDateTime').reverse();
        },
        updateNotification(item){
            item.read = true;
            NotificationService.update(item)
                .then(response => {       
                    if(response.data){
                    console.log("Updated Notification >> ", response.data);
                    this.$util.wait(1000).then(() => {                        
                        this.fetchMessages();                       
                    });
                    }
                })
                .catch(e => {
                    this.$util.notify(e.response.data.message);
                });
        }
    },
    computed: {
        entityName(){
            return this.$util.getUser() && this.$util.getUser().name;
        },
        entityEmail(){
            return this.$util.getUser() && this.$util.getUser().email;
        },
        profileRouterPath(){
            return "/profile";  
        },
        profileImage(){
            let image = 'avatar';
            if(this.$util.getUser())
                image = this.$util.getUser().userName; 
            return require(`@/assets/${image}.jpg`);
        }
    },
    mounted() {   
        // this.fetchMessages();
    }
};
</script>

<style>

</style>
