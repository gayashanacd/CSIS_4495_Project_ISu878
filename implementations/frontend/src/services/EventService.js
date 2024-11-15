import http from "@/common/http-common.js"

class EventService{
    getUserEvents(userId){
        return http.get(`/getUserEvents?userId=${userId}`);
    }

    getAllEvents(){
        return http.get(`/getEvents`);
    }
    
    joinLeaveEvent(data){
        return http.patch("/joinLeaveEvent", data);
    }
    // archiveRecommendation(data){
    //     return http.put(`/recommendation/${data._id}`, data);
    // }
}

export default new EventService();