import http from "@/common/http-common.js"

class UserRegistratioService{
    register(data){
        return http.post("/register", data);
    }
    updateUserProfile(data){
        return http.put(`/user/${data._id}`, data);
    }
}

export default new UserRegistratioService();