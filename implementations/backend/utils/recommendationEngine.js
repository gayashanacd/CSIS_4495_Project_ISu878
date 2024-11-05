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

import { createRecommendation } from '../routes/recommendations.js';
import { getLastWeekCarbonFootprint } from '../routes/carbonFootprint.js';

const BENCHMARKS = {
    carbonFootprint: 77,  // Average kg CO₂ per person per year in worldwide is 4000
    waterUsage: 980,        // Average liters per day per person is 140
    wasteManagement: 0.74     // kg of waste per month is 22.2 
};

const CANADIAN_BENCHMARKS = {
    carbonFootprint: 272.3,      // Average kg CO₂ per person per year in Canada is 14200
    waterUsage: 2303,            // Average liters per day per person in Canada is 140
    wasteGeneration: 1.16       // Average kilograms of waste per month per person in Canada is 35
};

class RecommendationEngine {

    constructor(userId) {
        this.userId = userId;
    }

    init(){
        // console.log("came to init >> ", this.userId);
        this.generateBenchmarkRecommendations();
    }

    async generateBenchmarkRecommendations(){
        // Carbon Footprint
        let lastWeekFootprint = await this.getLastWeekFootprint()
        // console.log("lastWeekFootprint >> ", lastWeekFootprint);
        let recoObj = {
            type : "benchmark",
            userId : this.userId 
        };

        // Calculate Carbon Footprint Recommendations
        if (lastWeekFootprint > CANADIAN_BENCHMARKS.carbonFootprint) {
            this.createRecommendation({
                ...recoObj,
                title: "Reduce Your Carbon Footprint",
                message: "Your carbon footprint is above the Canadian average. Consider using public transport, reducing energy usage at home, or investing in energy-efficient appliances."
            });
        } else {
            this.createRecommendation({
                ...recoObj,
                title: "Great Job on Carbon Savings!",
                message: "You're maintaining a carbon footprint below the Canadian average. Keep up the sustainable habits!"
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

    // Method to create a recommendation
    async createRecommendation(data) {
        try {
            const recommendation = await createRecommendation(data);
            return recommendation;
        } catch (error) {
            console.error("Error creating recommendation:", error.message);
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