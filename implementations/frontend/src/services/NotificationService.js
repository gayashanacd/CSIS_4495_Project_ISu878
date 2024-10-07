import http from "@/common/http-common.js"

class NotificationService{
  getAll(){
    return http.get("/notifications");
  }

  getMyNotifications(receiverId){
    return http.get(`/notifications?receiverId=${receiverId}`);
  }

  create(data){
    return http.post("/notifications", data);
  }

  update(data){
    return http.patch(`/notifications/${data.id}`, data);
  }

  delete(id){
    return http.delete(`/notifications/${id}`);
  }
}

export default new NotificationService();