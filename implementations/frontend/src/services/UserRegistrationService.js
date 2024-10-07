import http from "@/common/http-common.js"

class UserRegistratioService{
    create(data){
        return http.post("/users", data);
    }
}

export default new UserRegistratioService();