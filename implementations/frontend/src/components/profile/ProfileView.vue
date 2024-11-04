<template>
    <div >
        <div class="pagetitle">
            <h1>Profile</h1>
        </div><!-- End Page Title -->
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <UserProfile :view="'profile'"  />
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import UserProfile from '@/components/registration/UserProfile.vue';

    export default{
        name: "ProfileView",
        data(){
            return{

            };
        },
        components: {
            UserProfile,
        },
        methods: {
        },
        mounted() {   
        }
    }

</script>

<style>

</style>
