// https://www.climatewatchdata.org/ghg-emissions?calculation=PER_CAPITA&end_year=2021&regions=CAN&sectors=total-excluding-lucf&start_year=2005
// https://worldpopulationreview.com/country-rankings/water-consumption-by-country
// https://www.nature.org/en-us/get-involved/how-to-help/carbon-footprint-calculator/
// https://www.worldbank.org/en/topic/urbandevelopment/brief/solid-waste-management
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Waste_statistics
// https://www.statista.com/statistics/689809/per-capital-msw-generation-by-country-worldwide/

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
import { getLastWeekCarbonFootprint } from '../routes/carbonFootprint.js';
import { getLastWeekWaterUsage, getDayWiseWaterUsage } from '../routes/waterUsage.js';
import { getLastWeekWasteData } from '../routes/wasteManagement.js';

const BENCHMARKS = {
    carbonFootprint: 77,  // Average kg CO₂ per person per year in worldwide is 4000
    waterUsage: 980,        // Average liters per day per person is 140
    wasteManagement: 5.18     // kg of waste per month is 22.2 
};

const CANADIAN_BENCHMARKS = {
    carbonFootprint: 272.3,      // Average kg CO₂ per person per year in Canada is 14200
    waterUsage: 2303,            // Average liters per day per person in Canada is 329
    wasteGeneration: 8.16       // Average kilograms of waste per month per person in Canada is 35
};

class RecommendationEngine {

    constructor(userId) {
        this.userId = userId;
    }

    init(){
        this.generateBenchmarkRecommendations();
        this.generatePatternRecommendations();
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

        // Recommendations for Waste Reduction

        // Recommendations for Daily Electricity Use 
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