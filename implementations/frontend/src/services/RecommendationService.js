import http from "@/common/http-common.js"

class RecommendationService{
    getUserRecommendations(userId, type){
        if(type)
            return http.get(`/getUserRecommendations?userId=${userId}&type=${type}`);
        else 
            return http.get(`/getUserRecommendations?userId=${userId}`);
    }

    archiveRecommendation(data){
        return http.put(`/recommendation/${data._id}`, data);
    }

    getLeaderboard(){
        return http.get(`/getLeaderboardInfo`);
    }
}

export default new RecommendationService();