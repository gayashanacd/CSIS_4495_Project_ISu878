import { getUser, getAllUserIds, getAllUsers } from '../routes/users.js';
import { getLastWeekCarbonFootprint } from '../routes/carbonFootprint.js';
import { getLastWeekWaterUsage } from '../routes/waterUsage.js';
import { getLastWeekWasteData } from '../routes/wasteManagement.js';

class Gamification {

    constructor() {
        this.userIds = [];
        this.users = [];
        this.leaderboard = [];
    }

    async init(){
        this.users = await getAllUsers();
        await this.getCarbonChampion();
        await this.getWaterSaver();
        await this.getWasteMinimizer();
        return this.leaderboard;
    }

    // based on lastweek data
    async getCarbonChampion(){
        let carbonChamp = {
            totalFootprint : Infinity,
            name : "",
            userId : 0,
            title : "Carbon Champion",
            userName : ""
        };
        for (const user of this.users) {
            const totalFootprint = await getLastWeekCarbonFootprint(user._id);
            if (totalFootprint < carbonChamp.totalFootprint) {
                carbonChamp.totalFootprint = totalFootprint;
                carbonChamp.name = user.name; 
                carbonChamp.userId = user._id; 
                carbonChamp.userName = user.userName; 
            }
        }
        this.leaderboard.push(carbonChamp);
    }

    // based on lastweek data
    async getWaterSaver(){
        let waterSaver = {
            totalUsage : Infinity,
            name : "",
            userId : 0,
            title : "Water Saver",
            userName : ""
        };
        for (const user of this.users) {
            const totalUsage = await getLastWeekWaterUsage(user._id);
            if (totalUsage < waterSaver.totalUsage) {
                waterSaver.totalUsage = totalUsage;
                waterSaver.name = user.name; 
                waterSaver.userId = user._id; 
                waterSaver.userName = user.userName; 
            }
        }
        this.leaderboard.push(waterSaver);
    }

    // based on lastweek data
    async getWasteMinimizer(){
        let wasteMinimizer = {
            totalUsage : Infinity,
            name : "",
            userId : 0,
            title : "Waste Minimizer",
            userName : ""
        };
        for (const user of this.users) {
            const totalUsage = await getLastWeekWasteData(user._id);
            if (totalUsage < wasteMinimizer.totalUsage) {
                wasteMinimizer.totalUsage = totalUsage;
                wasteMinimizer.name = user.name; 
                wasteMinimizer.userId = user._id; 
                wasteMinimizer.userName = user.userName; 
            }
        }
        this.leaderboard.push(wasteMinimizer);
    }

}

export default Gamification;