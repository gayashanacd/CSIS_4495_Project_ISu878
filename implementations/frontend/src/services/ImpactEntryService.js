import http from "@/common/http-common.js"

class ImpactEntryService{
    createWasteManagementEntry(data){
        return http.post("/newWasteManagementEntry", data);
    }

    getUserWasteManagementEntryForDay(userId, inputDate){
        return http.get(`/getUserWasteEntryForDay?userId=${userId}&inputDate=${inputDate}`);
    }

    updateWasteManagementEntry(data){
        return http.put(`/wasteManagement/${data._id}`, data);
    }

    createWaterUsageEntry(data){
        return http.post("/newWaterUsageEntry", data);
    }

    getUserWaterUsageEntryForDay(userId, inputDate){
        return http.get(`/getUserWaterEntryForDay?userId=${userId}&inputDate=${inputDate}`);
    }

    updateWaterUsageEntry(data){
        return http.put(`/waterUsage/${data._id}`, data);
    }
}

export default new ImpactEntryService();