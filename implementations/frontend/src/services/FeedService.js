import http from "@/common/http-common.js"

class FeedService{
    getOthersFeeds(userId){
        return http.get(`/getOthersFeeds?userId=${userId}`);
    }

    likeFeed(data){
        return http.patch("/patchLikeUsers", data);
    }
}

export default new FeedService();