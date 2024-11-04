<template>

<div>
    <main>
        <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex justify-content-center py-4">
                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                            <img alt="Logo" src="@/assets/logo.png">
                        </a>  
                        <h5 class="card-title text-center pb-0 fs-4" style="margin-top: -5px; margin-left: 15px;"> | Let's Get Started !</h5>
                    </div>
                    <div class="card mb-3">
                        <div class="card-body">
                            <UserProfile :view="'register'" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    </main><!-- End #main -->
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</div>

</template>

<script>

import UserProfile from '@/components/registration/UserProfile.vue';

export default {
    name: "RegistrationView",
    data() {
        return {

        };
    },
    components: {
        UserProfile,
    },
    methods: {

    },
    mounted() {
    }
};
</script>

<style scoped>

</style>
