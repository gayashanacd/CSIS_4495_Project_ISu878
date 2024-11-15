// https://www.climatewatchdata.org/ghg-emissions?calculation=PER_CAPITA&end_year=2021&regions=CAN&sectors=total-excluding-lucf&start_year=2005
// https://worldpopulationreview.com/country-rankings/water-consumption-by-country
// https://www.nature.org/en-us/get-involved/how-to-help/carbon-footprint-calculator/
// https://www.worldbank.org/en/topic/urbandevelopment/brief/solid-waste-management
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Waste_statistics
// https://www.statista.com/statistics/689809/per-capital-msw-generation-by-country-worldwide/
// https://ca.renogy.com/blog/how-many-kwh-does-the-average-home-use/

// 1. recommendations based on benchmarks
// these values defer with country.
// these are weekly benchmarks

// 2. Pattern Recognition in User Data Trends
// ex 1 : if a user’s water usage spikes on weekends, 
// GreenPath could suggest activities like reducing weekend water usage or incorporating water-saving devices specifically for those peak times.

// 3. Comparative Feedback with Peer Groups
// ex 2 : GreenPath could inform a user that their carbon emissions are higher than the average for their city, 
// suggesting localized advice like opting for public transport where available.

// 4. Context-Aware Suggestions
// Based on factors like seasonal changes, local policies, or even upcoming events (e.g., Earth Day), GreenPath could offer context-specific recommendations. 
// For instance, during summer, users could get reminders to reduce energy consumption by setting their air conditioning more efficiently, or during water scarcity periods, 
// users could receive additional tips on conserving water.

import { createRecommendation, checkDuplicate, updateRecommendation } from '../routes/recommendations.js';
import { getLastWeekCarbonFootprint, calculateDailyAverageElectricityUsage, calculateDailyAverageCarbonFootprint } from '../routes/carbonFootprint.js';
import { getLastWeekWaterUsage, getDayWiseWaterUsage, calculateDailyAverageWaterUsage } from '../routes/waterUsage.js';
import { getLastWeekWasteData } from '../routes/wasteManagement.js';
import { getUser, getAllUserIds } from '../routes/users.js';

const BENCHMARKS = {
    carbonFootprint: 77,  // Average kg CO₂ per person per year in worldwide is 4000
    waterUsage: 980,        // Average liters per day per person is 140
    wasteManagement: 5.18,     // kg of waste per month is 22.2 
    electricUsage : 15      // Average daily usage worldwide
};

const CANADIAN_BENCHMARKS = {
    carbonFootprint: 272.3,      // Average kg CO₂ per person per year in Canada is 14200
    waterUsage: 2303,            // Average liters per day per person in Canada is 329
    wasteGeneration: 8.16,       // Average kilograms of waste per month per person in Canada is 35
    electricUsage : 25          // Average daily usage during other seasons except winter
};

const CONTEXT_AWARE_BENCHMARKS = {
    worldEarthDay: "04-22",  
    winterSeason: {start : "11-15", end : "03-31"},    // North america
    summerSeason: {start : "06-01", end : "08-31"},    // North america
    plasticFreeJuly : "07"     
};

class RecommendationEngine {

    constructor(userId) {
        this.userId = userId;
        this.user = null;
        this.userIds = [];
    }

    async init(){
        this.user = await getUser(this.userId);
        this.userIds = await getAllUserIds();
        this.generateBenchmarkRecommendations();
        this.generatePatternRecommendations();
        this.generateComperativeRecommendations();
        this.generateContextAwareRecommendations();
    }

    async generateBenchmarkRecommendations(){
        // Carbon Footprint
        let lastWeekFootprint = await this.getLastWeekFootprint()

        let recoObj = {
            type : "benchmark",
            userId : this.userId 
        };

        // Generate Carbon Footprint Recommendations
        if (lastWeekFootprint > CANADIAN_BENCHMARKS.carbonFootprint) {
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Reduce Your Carbon Footprint",
                message: "Your carbon footprint is above the Canadian average. Consider using public transport, reducing energy usage at home, or investing in energy-efficient appliances."
            });
        } else {
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Great Job on Carbon Savings!",
                message: "You're maintaining a carbon footprint below the Canadian average. Keep up the sustainable habits!"
            });
        }

        // Water Usage
        let getLastWeekWaterUsage = await this.getLastWeekWaterUsage()

        // Generate Water Usage Recommendations
        if (getLastWeekWaterUsage > CANADIAN_BENCHMARKS.waterUsage) {
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Reduce Water Usage",
                message: "Your water consumption exceeds the Canadian average. Try shorter showers, fix leaks, and use water-efficient fixtures to conserve water."
            });
        } else {
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Efficient Water Usage",
                message: "Your water usage is below the Canadian average. Keep conserving water to support sustainable usage!"
            });
        }

        // Waste Generation
        let lastWeekWasteData = await this.getLastWeekWasteGenData()

        // Generate Waste Generation Recommendations
        if (lastWeekWasteData > CANADIAN_BENCHMARKS.wasteGeneration) {
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Minimize Waste Generation",
                message: "Your waste generation is above the average. Consider recycling more, composting, and reducing single-use plastics."
            });
        } else {
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Excellent Waste Management",
                message: "You're generating less waste than the average. Keep practicing waste reduction techniques!"
            });
        }
    }

    async generatePatternRecommendations(){
        let recoObj = {
            type : "pattern",
            userId : this.userId 
        };

        // Recommendations for weekend water spikes 
        let dayWiseWaterUsageData = await this.getDayWiseWaterUsageData();
        let _dayWiseWaterUsageData = {
            Mon : dayWiseWaterUsageData.Mon ? dayWiseWaterUsageData.Mon : 0,
            Tue : dayWiseWaterUsageData.Tue ? dayWiseWaterUsageData.Tue : 0,
            Wed : dayWiseWaterUsageData.Wed ? dayWiseWaterUsageData.Wed : 0,
            Thu : dayWiseWaterUsageData.Thu ? dayWiseWaterUsageData.Thu : 0,
            Fri : dayWiseWaterUsageData.Fri ? dayWiseWaterUsageData.Fri : 0,
            Sat : dayWiseWaterUsageData.Sat ? dayWiseWaterUsageData.Sat : 0,
            Sun : dayWiseWaterUsageData.Sun ? dayWiseWaterUsageData.Sun : 0
        };
        let totalWeekendData = _dayWiseWaterUsageData.Sat + _dayWiseWaterUsageData.Sun;
        let totalWeekData = _dayWiseWaterUsageData.Mon + _dayWiseWaterUsageData.Tue + _dayWiseWaterUsageData.Wed + _dayWiseWaterUsageData.Thu + _dayWiseWaterUsageData.Fri;

        if((totalWeekendData / 2) > (totalWeekData / 5)){
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Water Usage Spike on Weekends",
                message: "We’ve noticed your water usage significantly increases on weekends. Consider setting reminders to take shorter showers or batch laundry loads to minimize peak usage. Small adjustments on busy days can save both water and money!"
            });
        }

        // Recommendations for Waste Reduction considering last 2 weeks
        const totalWasteLastWeek = await getLastWeekWasteData(this.userId);
        const today = new Date();
        const lastWeek = new Date();
        const weekBeforelastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        weekBeforelastWeek.setDate(today.getDate() - 14);
        const totalWasteWeekBeforeLastWeek = await getLastWeekWasteData(this.userId, {
            from : weekBeforelastWeek,
            to : lastWeek
        });
        let pecentageOfWaste = 0;

        if(totalWasteLastWeek > totalWasteWeekBeforeLastWeek){
            pecentageOfWaste = (totalWasteLastWeek - totalWasteWeekBeforeLastWeek) / totalWasteLastWeek * 100;
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Increase in Waste Output !",
                message: `Your waste output has increased by ${pecentageOfWaste.toFixed(2)}% over the last week. To help reverse this trend, try composting food scraps and choosing reusable items whenever possible. Together, we can work towards reducing waste and making a positive impact!`
            });  
        }
        else {
            pecentageOfWaste = (totalWasteWeekBeforeLastWeek - totalWasteLastWeek.toFixed(2)) / totalWasteWeekBeforeLastWeek * 100;
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Improvement in Waste Reduction!",
                message: `You’ve reduced your waste output by ${pecentageOfWaste}% over the last week! To continue this positive trend, consider composting food scraps or opting for reusable items. Let’s aim to keep reducing even more!`
            });  
        }

        // Recommendations for Daily Electricity Use 
        const dailyElectricityUsage = await calculateDailyAverageElectricityUsage(this.userId);
        // console.log("dailyElectricityUsage >> ", dailyElectricityUsage);
        if (dailyElectricityUsage > CANADIAN_BENCHMARKS.electricUsage) {
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Daily Electricity Use is Above Benchmark",
                message: "Your electricity usage is consistently higher than average. Try implementing energy-saving habits like unplugging unused devices or setting appliances on eco mode. Reducing daily electricity use can significantly lower your carbon footprint."
            });
        } else {
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Daily Electricity Use is Below Benchmark",
                message: "Your electricity usage is consistently lower than average—great job! Maintaining energy-efficient habits like turning off lights when not needed and using eco-friendly appliance settings helps keep your consumption low. Your efforts make a positive impact on reducing your carbon footprint!"
            });
        }
    }

    async generateComperativeRecommendations(){
        let recoObj = {
            type : "comparative",
            userId : this.userId 
        };

        // Recommendations city wise average carbon footprint campared to user
        const averageCarbonFootprintData = await calculateDailyAverageCarbonFootprint(this.user, this.userId);
        let pecentageOfCarbonFootprint = 0;
        if (averageCarbonFootprintData.averageUserFootprint > averageCarbonFootprintData.averageCityFootprint) {
            pecentageOfCarbonFootprint = (averageCarbonFootprintData.averageUserFootprint - averageCarbonFootprintData.averageCityFootprint) / averageCarbonFootprintData.averageUserFootprint * 100;
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Above Average Carbon Footprint for Your City",
                message: `Your carbon footprint is ${pecentageOfCarbonFootprint.toFixed(2)}% higher than the average in your area. Consider reducing car travel or switching to energy-efficient appliances to bring your emissions more in line with others nearby.`
            });
        } else {
            pecentageOfCarbonFootprint = (averageCarbonFootprintData.averageCityFootprint - averageCarbonFootprintData.averageUserFootprint) / averageCarbonFootprintData.averageCityFootprint * 100;
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Below Average Carbon Footprint for Your City",
                message: `Your carbon footprint is ${pecentageOfCarbonFootprint.toFixed(2)}% lower than the average in your area. Great work! Continuing to use energy-efficient appliances and minimizing car travel keeps your emissions lower than most nearby. Keep up the eco-friendly habits!`
            });
        }

        // Recommendations household wise average water usage campared to user
        const averageWaterUsageData = await calculateDailyAverageWaterUsage(this.user, this.userId);
        let pecentageOfWaterUsage = 0;
        if (averageWaterUsageData.averageUserWaterUsage > averageWaterUsageData.averageHouseholdWaterUsage) {
            pecentageOfWaterUsage = (averageWaterUsageData.averageUserWaterUsage - averageWaterUsageData.averageHouseholdWaterUsage) / averageWaterUsageData.averageUserWaterUsage * 100;
            this.createRecommendation({
                ...recoObj,
                category : "bad",
                title: "Higher Water Usage Than Peers in Similar Households",
                message: `Your water usage is ${pecentageOfWaterUsage.toFixed(2)}% higher than the average household of similar size. Consider adopting water-saving habits like fixing leaks, using low-flow fixtures, or limiting lawn watering. Small changes can make a big difference for the environment and your utility bill.`
            });
        } else {
            pecentageOfWaterUsage = (averageWaterUsageData.averageHouseholdWaterUsage - averageWaterUsageData.averageUserWaterUsage) / averageWaterUsageData.averageHouseholdWaterUsage * 100;
            this.createRecommendation({
                ...recoObj,
                category : "good",
                title: "Lower Water Usage Than Peers in Similar Households",
                message: `Well done! Your water usage is ${pecentageOfWaterUsage.toFixed(2)}%  lower than the average household of similar size. Keep up the efficient habits, and you may inspire others in your community to do the same.`
            });
        }
    }

    async generateContextAwareRecommendations(){
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        // World earth day recommendations - trigger week before 
        // Define Earth Day
        const earthDay = new Date(`${currentYear}-${CONTEXT_AWARE_BENCHMARKS.worldEarthDay}`);

        // Get current date (ignoring time)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Calculate the start of the 1-week window
        const oneWeekBeforeEarthDay = new Date(earthDay);
        oneWeekBeforeEarthDay.setDate(earthDay.getDate() - 7);

        // Check if the current date is within the 1-week range
        if (currentDate >= oneWeekBeforeEarthDay && currentDate < earthDay) {
            this.gerenerateForAllUsers(
                "Prepare for Earth Day !",
                "Earth Day is coming up! Find a community cleanup or tree-planting event near you to make a tangible impact. Every small action adds up to a healthier planet."
            );
        } 

        // Winter season recommendations
        // Define the start and end dates of the winter season
        const winterStart = new Date(`${currentYear}-${CONTEXT_AWARE_BENCHMARKS.winterSeason.start}`);
        const winterEnd = new Date(`${nextYear}-${CONTEXT_AWARE_BENCHMARKS.winterSeason.end}`);

        // Check if the current date is within the winter season
        if (currentDate >= winterStart && currentDate <= winterEnd) {
            this.gerenerateForAllUsers(
                "Reduce Heating Costs This Winter",
                "With winter approaching, consider insulating windows and doors to reduce heat loss. You’ll save energy, lower your carbon footprint, and cut utility bills."
            );
        } 

        // Summer season recommendations
        // Define the start and end dates of the summer season
        const summerStart = new Date(`${currentYear}-${CONTEXT_AWARE_BENCHMARKS.summerSeason.start}`);
        const summerEnd = new Date(`${nextYear}-${CONTEXT_AWARE_BENCHMARKS.summerSeason.end}`);

        // Check if the current date is within the winter season
        if (currentDate >= summerStart && currentDate <= summerEnd) {
            this.gerenerateForAllUsers(
                "Maximize Savings on Energy This Summer",
                "As temperatures rise, optimize air conditioning usage by setting thermostats to 78°F when at home and higher when away. Use ceiling fans to stay cool and reduce energy consumption."
            );
        } 

    }

    gerenerateForAllUsers(title, message){
        let recoObj = {
            type : "context",
            category : "good"
        };

        for (const userId of this.userIds) {
            this.createRecommendation({
                ...recoObj,
                userId : userId,
                title: title,
                message: message
            });
        }
    }

    async getLastWeekFootprint() {
        try {
            const totalFootprint = await getLastWeekCarbonFootprint(this.userId);
            // console.log("Total carbon footprint for the last week:", totalFootprint);
            return totalFootprint; 
        } catch (error) {
            console.error("Error getting last week's carbon footprint:", error.message);
            throw error; 
        }
    }

    async getDayWiseWaterUsageData() {
        try {
            const dayWaterUsage = await getDayWiseWaterUsage(this.userId);
            return dayWaterUsage; 
        } catch (error) {
            console.error("Error getting day wise water usage:", error.message);
            throw error; 
        }
    }

    async getLastWeekWaterUsage() {
        try {
            const totalWaterUsage = await getLastWeekWaterUsage(this.userId);
            return totalWaterUsage; 
        } catch (error) {
            console.error("Error getting last week's water usage:", error.message);
            throw error; 
        }
    }

    async getLastWeekWasteGenData() {
        try {
            const totalWasteData = await getLastWeekWasteData(this.userId);
            return totalWasteData; 
        } catch (error) {
            console.error("Error getting last week's waste data:", error.message);
            throw error; 
        }
    }

    // Method to create a recommendation
    async createRecommendation(data) {
        try {
            let recommendation = null;
            const recommendationObj = await checkDuplicate({
                userId : data.userId,
                title : data.title,
                type : data.type
            });
            if(recommendationObj[0]){
                if(recommendationObj[0].isArchived){
                    recommendationObj[0].isArchived = false;
                    recommendationObj[0].message = data.message;
                    recommendation = updateRecommendation(recommendationObj[0]);
                }
            }
            else {
                recommendation = await createRecommendation(data);
            }
            
            return recommendation;
        } catch (error) {
            console.error("Error creating / updating recommendation:", error.message);
            throw error;
        }
    }

    // Additional methods can be added here as needed
    async fetchRecommendations(userId) {
        // Fetch recommendations based on userId or other criteria
        // Placeholder code - implement as needed
    }
}

export default RecommendationEngine;