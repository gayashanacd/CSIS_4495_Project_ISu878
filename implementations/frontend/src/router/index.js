import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/components/user/UserLogin.vue";
import DashboardView from "@/components/dashboard/DashboardView.vue";
import ImpactEntryView from "@/components/impact_entry/ImpactEntryView.vue";
import CommunityView from "@/components/community/CommunityView.vue";
import RecommendationsView from "@/components/recommendations/RecommendationsView.vue";
import ProfileView from "@/components/profile/ProfileView.vue";
import RegistrationView from "@/components/registration/RegistrationView.vue";

const routes = [
    {
        path : "/",
        alias : '/login',
        name : "login",
        component : UserLogin
    },
    {
        path : "/login",
        alias : '/login',
        name : "login",
        component : UserLogin
    },
    {
        path : "/dashboard",
        alias : '/dashboard',
        name : "DashboardView",
        component : DashboardView
    },
    {
        path : "/impact_entry",
        alias : '/impact_entry',
        name : "ImpactEntryView",
        component : ImpactEntryView
    },
    {
        path : "/community",
        alias : '/community',
        name : "CommunityView",
        component : CommunityView
    },
    {
        path : "/recommendations",
        alias : '/recommendations',
        name : "RecommendationsView",
        component : RecommendationsView
    },
    {
        path : "/profile",
        alias : '/profile',
        name : "ProfileView",
        component : ProfileView
    },
    {
        path : "/register",
        alias : '/register',
        name : "RegistrationView",
        component : RegistrationView
    }
]

const router = createRouter(
    {
        history : createWebHistory(),
        routes 
    }
)

export default router;