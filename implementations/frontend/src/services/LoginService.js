import http from "@/common/http-common.js"

class LoginService{
    login(data){
        return http.post("/login", data);
    }
    
    register(data){
        return http.post("/register", data);
    }
}

export default new LoginService();