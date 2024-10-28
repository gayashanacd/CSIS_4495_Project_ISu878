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

    getUserDailyWaterUsage(userId){
        return http.get(`/getDailyWaterUsageChartData?userId=${userId}`);
    }

    updateWaterUsageEntry(data){
        return http.put(`/waterUsage/${data._id}`, data);
    }

    createEnergyUsageEntry(data){
        return http.post("/newCarbonFootprintEntry", data);
    }

    getUserEnergyUsageEntryForDay(userId, inputDate){
        return http.get(`/getUserEnergyEntryForDay?userId=${userId}&inputDate=${inputDate}`);
    }

    updateEnergyUsageEntry(data){
        return http.put(`/carbonFootprint/${data._id}`, data);
    }
}

export default new ImpactEntryService();