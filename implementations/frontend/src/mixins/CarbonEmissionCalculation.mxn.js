// import { INDEX } from '@/common/config.js'

const WASTE_EMISSION_FACTORS = {
    Plastic: 2.5,      // kg CO2 per kg of plastic waste
    Paper: 1.3,        // kg CO2 per kg of paper waste
    Metal: 1.5,        // kg CO2 per kg of metal waste
    Organic: 0.8,      // kg CO2 per kg of organic waste
    General: 1.2,      // kg CO2 per kg of general waste
    Glass: 0.9         // kg CO2 per kg of glass waste
};

const WATER_EMISSION_FACTOR = 0.36; // kg CO₂ per cubic meter of water

const TRANSPORT_EMISSION_FACTORS = {
    Car: 0.24,        // kg CO₂ per km for a car
    Bus: 0.06,        // kg CO₂ per km for a bus
    Train: 0.04,      // kg CO₂ per km for a train
    Bicycle: 0,       // kg CO₂ for cycling
    Walk: 0           // kg CO₂ for walking
};

const HOME_ENERGY_EMISSION_FACTORS = {
    Electricity: 0.5,  // kg CO₂ per kWh
    NaturalGas: 2.2,   // kg CO₂ per therm
    HeatingOil: 3.2,   // kg CO₂ per liter
    SolarPower: 0.05,  // kg CO₂ per kWh (lifecycle emissions)
    WindPower: 3.2     // kg CO₂ per kWh (lifecycle emissions)
};

const GAS_EMISSION_FACTOR = 1.89; // kg CO₂ per cubic meter

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
            return totalEmissions.toFixed(2);
        },
        calculateWaterEmission(){
            if(this.waterUsageData){
                let totalWaterUsage = this.totalHouseholdUsage + this.totalOutdoorUsage + parseInt(this.waterUsageData.miscellaneousUsage);
                let totalWaterUsageInCubicM = totalWaterUsage / 1000;
                return (WATER_EMISSION_FACTOR * totalWaterUsageInCubicM).toFixed(2);
            }
        },
        calculateTransportEmission(){
            let totalEmissions = 0;
            this.transportData.forEach(transport => {
                const { mode, distance } = transport;
                if (TRANSPORT_EMISSION_FACTORS[mode]) {
                    totalEmissions += distance * TRANSPORT_EMISSION_FACTORS[mode];
                } else {
                    console.error(`Unknown transport type: ${mode}`);
                }
            });
            return totalEmissions.toFixed(2);
        },
        calculateHomeEnergyEmission(){
            if(this.homeData){
                let totalHomeUsage = this.homeData.electricityUsage * HOME_ENERGY_EMISSION_FACTORS[this.homeData.enerySource]
                totalHomeUsage += this.homeData.gasUsage * GAS_EMISSION_FACTOR;
                return totalHomeUsage.toFixed(2);
            }
        },
	}
}