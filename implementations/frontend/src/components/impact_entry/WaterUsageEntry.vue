<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <label for="inputWaterUsageDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputWaterUsageDate" v-model="inputDate">
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Shower / Bath</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDuration" class="form-label">Duration (minutes)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDuration" v-model="waterUsageData.showerDuation">
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageBathWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageBathWaterUsed" v-model="waterUsageData.showerUsage">
                        </div>
                    </div>
                </div>   
                <div class="col-md-6">
                    <h5 style="color: brown;">Dishwashing</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDishwashingMethod" class="form-label">Method</label>
                            <select id="inputWaterUsageDishwashingMethod" class="form-select" v-model="waterUsageData.dishwashingMethod">
                                <option selected value="Dishwasher">Dishwasher</option>
                                <option value="Hand-washing">Hand-washing</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageDishwashingWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDishwashingWaterUsed" v-model="waterUsageData.dishwashingUsage">
                        </div>
                    </div>
                </div> 
            </div>

            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Lawn / Garden Watering</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageLawnMethod" class="form-label">Method</label>
                            <select id="inputWaterUsageLawnMethod" class="form-select" v-model="waterUsageData.gardeningMethod">
                                <option selected value="Hose">Hose</option>
                                <option value="Sprinkler">Sprinkler</option> 
                                <option value="Drip">Drip System</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageLawnWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageLawnWaterUsed" v-model="waterUsageData.gardeningUsage">
                        </div>
                    </div>
                </div>   
                <div class="col-md-6">
                    <h5 style="color: brown;">Other Water Usage</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDrinkingWaterUsed" class="form-label">Drinking / Cooking (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDrinkingWaterUsed" v-model="waterUsageData.drinkingUsage">
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageMiscellaneousWaterUsed" class="form-label">Miscellaneous (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageMiscellaneousWaterUsed" v-model="waterUsageData.miscellaneousUsage">
                        </div>
                    </div>
                </div> 
            </div>

            <div class="row" style="margin-top: 20px;">
                <h5 style="color: brown;">Laundry</h5>
                <div class="row">
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryType" class="form-label">Type</label>
                        <select id="inputWaterUsageLaundryType" class="form-select" v-model="waterUsageData.laundryMethod">
                            <option selected value="FrontLoad">Front Load</option>
                            <option value="TopLoad">Top Load</option> 
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryWaterUsed" class="form-label">Water Used (liters)</label>
                        <input type="int" class="form-control" id="inputWaterUsageLaundryWaterUsed" v-model="waterUsageData.laundryUsage">
                    </div>
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryNumberofLoads" class="form-label">Number of Loads</label>
                        <input type="int" class="form-control" id="inputWaterUsageLaundryNumberofLoads" v-model="waterUsageData.laundryNumOfLoads">
                    </div>
                </div>
            </div>
        
        </div>
    </div>   
    <div class="card">
        <div class="card-body ">
            <h5 class="card-title">Summary of Water Usage | Total : 30 liters</h5>
            <div class="row" style="text-align: center;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Household - {{ this.totalHouseholdUsage }} liters</h5>
                </div>
                <div class="col-md-6">
                    <h5 style="color: brown;">Outdoors - {{ this.totalOutdoorUsage }} liters</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-1">
            <button class="btn btn-primary w-100" type="submit" @click="submitData">Submit</button>
        </div>
        <div class="col-1" style="margin-left: -15px;">
            <button type="reset" class="btn btn-secondary"  @click="resetWaterData">Reset</button>
        </div>
    </div>
</template>

<script>

import ImpactEntryService from "@/services/ImpactEntryService";
import CarbonEmissionCalculation from "@/mixins/CarbonEmissionCalculation.mxn";

export default {
    name: "WaterUsageEntry",
    mixins:[CarbonEmissionCalculation],
    data() {           
        return {
            mode : "add",
            currentId : null,
            inputDate : this.$moment().format('YYYY-MM-DD'),
            waterUsageData : {
                showerDuation : 0,
                showerUsage : 0,
                dishwashingMethod : "Dishwasher",
                dishwashingUsage : 0,
                gardeningMethod : "Hose",
                gardeningUsage : 0,
                drinkingUsage : 0,
                miscellaneousUsage : 0,
                laundryMethod : "FrontLoad",
                laundryUsage : 0,
                laundryNumOfLoads : 0
            },
        };
    },
    components: {
      
    },
    computed: {
        totalHouseholdUsage(){
            return parseInt(this.waterUsageData.showerUsage) + parseInt(this.waterUsageData.dishwashingUsage) + parseInt(this.waterUsageData.drinkingUsage) + 
                ( parseInt(this.waterUsageData.laundryUsage) * parseInt(this.waterUsageData.laundryNumOfLoads) );
        },
        totalOutdoorUsage(){
            return this.waterUsageData.gardeningUsage;
        }
    },
    methods: {
        fetchWaterData(){
            this.currentId = null;
            ImpactEntryService.getUserWaterUsageEntryForDay(this.$util.userId(), this.inputDate)
                .then(response => {       
                    console.log("Today water data >> ", response.data);
                    if(response.data[0]){
                        this.waterUsageData = response.data[0].waterUsageData;
                        this.currentId = response.data[0]._id;
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        resetWaterData(){
            this.waterUsageData = {
                showerDuation : 0,
                showerUsage : 0,
                dishwashingMethod : "Dishwasher",
                dishwashingUsage : 0,
                gardeningMethod : "Hose",
                gardeningUsage : 0,
                drinkingUsage : 0,
                miscellaneousUsage : 0,
                laundryMethod : "FrontLoad",
                laundryUsage : 0,
                laundryNumOfLoads : 0
            }
        },
        submitData(){
            let inputPayload = {
                userId: this.$util.userId(),
                inputDate: this.inputDate, 
                waterUsageData: this.waterUsageData,
                carbonEmissionsWater : this.calculateWaterEmission()
            };

            console.log("waterUsageData >> ", this.waterUsageData);

            if(this.currentId){
                inputPayload._id = this.currentId;
                ImpactEntryService.updateWaterUsageEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully updated water usage entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });  
            }
            else {
                ImpactEntryService.createWaterUsageEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully added water usage entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });    
            }
        }
    },
    mounted() {   
        this.fetchWaterData();
    }
};
</script>

<style>

</style>
