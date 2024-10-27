// import { INDEX } from '@/common/config.js'

// Emission factors for different waste types (in kg CO2 per kg of waste)
const WASTE_EMISSION_FACTORS = {
    Plastic: 2.5,      // kg CO2 per kg of plastic waste
    Paper: 1.3,        // kg CO2 per kg of paper waste
    Metal: 1.5,        // kg CO2 per kg of metal waste
    Organic: 0.8,      // kg CO2 per kg of organic waste
    General: 1.2,      // kg CO2 per kg of general waste
    Glass: 0.9         // kg CO2 per kg of glass waste
};

const WATER_EMISSION_FACTOR = 0.36; // kg CO₂ per cubic meter of water

export default {
    mixins:[ ],
    data() {
        return {        
        }
    },
    computed: {
    },
    watch: {
        // isIdle(newValue, oldValue) {            
                                 
        // }
    },
	created(){        
    },
	methods:{
        calculateWasteEmission(){
            let totalEmissions = 0;
            this.wasteData.forEach(waste => {
                const { categery, amount } = waste;
                if (WASTE_EMISSION_FACTORS[categery]) {
                    totalEmissions += amount * WASTE_EMISSION_FACTORS[categery];
                } else {
                    console.error(`Unknown waste type: ${categery}`);
                }
            });
            return totalEmissions;
        },
        calculateWaterEmission(){
            if(this.waterUsageData){
                let totalWaterUsage = this.totalHouseholdUsage + this.totalOutdoorUsage + parseInt(this.waterUsageData.miscellaneousUsage);
                let totalWaterUsageInCubicM = totalWaterUsage / 1000;
                return WATER_EMISSION_FACTOR * totalWaterUsageInCubicM;
            }
        } 
	}
}