import http from "@/common/http-common.js"

class RecommendationService{
    getUserRecommendations(userId){
        return http.get(`/getUserRecommendations?userId=${userId}`);
    }
}

export default new RecommendationService();