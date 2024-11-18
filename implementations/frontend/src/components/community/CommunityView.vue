<template>
    <div >
        <div class="pagetitle">
            <h1>Community</h1>
        </div><!-- End Page Title -->
        <section class="section dashboard">
            <div class="row" style="margin-top: 20px;">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Latest Activity Feed</h5>
                            <div class="activity">
                                <div class="activity-item d-flex" v-for="(feed) in feeds" :key="feed._id">
                                    <i class="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                                    <div class="activity-content">
                                        {{ feed.title }}
                                        <button style="padding: 2px 6px; margin-left: 20px;" type="button" :class="feedClass(feed)" title="Like Feed" @click="likeFeed(feed)"><i class="bi bi-heart"></i></button>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Challenges / Events</h5>
                            <div class="activity">
                                <div class="activity-item d-flex" v-for="(event) in events" :key="event._id">
                                    <!-- <div class="activite-label">{{ index + 1 }}</div> -->
                                    <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                                    <div class="activity-content">
                                        {{ event.title }}
                                        <button style="padding: 2px 6px; margin-left: 20px;" type="button" class="btn btn-success" title="Join Event" @click="joinEvent(event)"><i class="bi bi-plus-lg"></i> Join</button>   
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Active Challenges / Events</h5>
                            <div class="activity">
                                <div class="activity-item d-flex" v-for="(event, index) in userEvents" :key="event._id">
                                    <div class="activite-label">{{ index + 1 }}</div>
                                    <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                                    <div class="activity-content">
                                        {{ event.title }}
                                        <button style="padding: 2px 6px; margin-left: 20px;" type="button" class="btn btn-danger" title="Leave Event" @click="leaveEvent(event)"><i class="bi bi-dash"></i> Leave</button>   
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Gamification Leaderboard <span> | Based on last week stats</span></h5>
                            <div class="activity">
                                <div class="activity-item d-flex" v-for="(item) in leaderboard" :key="item.userId">
                                    <div class="activity-content">
                                        {{ item.title }} : 
                                        <span style="font-weight:bold; margin-left: 20px">{{ item.name}}</span>  
                                        <img style="max-height: 36px; margin-left: 20px" :src="profileImage(item.userName)" alt="Profile" class="rounded-circle">
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </section>
    </div>
</template>

<script>

import EventService from "@/services/EventService";
import FeedService from "@/services/FeedService";
import RecommendationService from "@/services/RecommendationService";

export default {
    name: "CommunityView",
    data() {           
        return {
            events : [],
            feeds : [],
            userEvents : [],
            leaderboard : []
        };
    },
    methods: {
        feedClass(item){
            if(item.likeUserIds.indexOf(this.$util.userId()) == -1){
                return "btn btn-secondary";
            }
            else {
                return "btn btn-warning";
            }
        },
        fetchEvents(){
            this.events = [];
            EventService.getAllEvents()
                .then(response => {       
                    console.log("All events >> ", response.data);
                    if(response.data.length > 0){
                        const filteredEvents = response.data.filter((event) => event.userIds.indexOf(this.$util.userId()) == -1);
                        this.events = filteredEvents;
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        fetchUserEvents(){
            this.userEvents = [];
            EventService.getUserEvents(this.$util.userId())
                .then(response => {       
                    console.log("User events >> ", response.data);
                    if(response.data.length > 0){
                        this.userEvents = response.data;
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        fetchFeeds(){
            this.feeds = [];
            FeedService.getOthersFeeds(this.$util.userId())
                .then(response => {       
                    console.log("feeds >> ", response.data);
                    if(response.data.length > 0){
                        this.feeds = response.data;
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        fetchLeadeboard(){
            this.leaderboard = [];
            RecommendationService.getLeaderboard()
                .then(response => {       
                    console.log("leaderboard >> ", response.data);
                    if(response.data.length > 0){
                        this.leaderboard = response.data;
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        joinEvent(item){
            const payload = {
                eventId : item._id, 
                userId : this.$util.userId(), 
                action : 'add'
            };
            EventService.joinLeaveEvent(payload)
                .then(response => {       
                    if(response.data){
                        this.$util.notify("Successfully join the event !", "success"); 
                        this.$util.wait(200).then(() => {                        
                            this.fetchEvents();
                            this.fetchUserEvents();                       
                        }) 
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        leaveEvent(item){
            const payload = {
                eventId : item._id, 
                userId : this.$util.userId(), 
                action : 'remove'
            };
            EventService.joinLeaveEvent(payload)
                .then(response => {       
                    if(response.data){
                        this.$util.notify("Successfully left the event !", "success"); 
                        this.$util.wait(200).then(() => {                        
                            this.fetchEvents();
                            this.fetchUserEvents();                       
                        }) 
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        likeFeed(item){
            const payload = {
                feedId : item._id, 
                userId : this.$util.userId(), 
                action : 'add'
            };

            if(item.likeUserIds.indexOf(this.$util.userId()) != -1){
                payload.action = 'remove'
            }

            FeedService.likeFeed(payload)
                .then(response => {       
                    if(response.data){
                        this.$util.wait(200).then(() => {                        
                            this.fetchFeeds();                    
                        }) 
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        profileImage(userName){
            let image = 'avatar';
            if(userName)
                image = userName; 
            return require(`@/assets/${image}.jpg`);
        }
    },
    mounted() {   
        this.fetchEvents();
        this.fetchUserEvents();
        this.fetchFeeds();
        this.fetchLeadeboard();
    }
};
</script>

<style scoped>
    .card-body{
        padding: 0 20px 20px 20px;
    }
</style>
