<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Transport Data</h5>
            <div class="row">
                <div class="col-md-3">
                    <label for="inputTransportDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputTransportDate" v-model="inputDate">
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-12">
                    <table class="table datatable">
                        <thead>
                        <tr>
                            <th>Mode</th>
                            <th>Distance (km)</th>
                            <th>Fuel Efficiency (l/km)</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in transportData" :key="item.id">
                            <td>{{ item.mode }}</td>
                            <td>{{ item.distance }}</td>
                            <td>{{ item.fuelEfficiency }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-info" title="Edit Child" @click="editTransportData(item)"><i class="bi bi-pencil-square"></i></button>
                                    <button type="button" class="btn btn-danger" title="Delete Child" @click="deleteTransportData(item)"><i class="bi bi-stop-circle"></i></button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label for="inputTrasnportMode" class="form-label">Mode of Trasnport</label>
                    <select id="inputTrasnportMode" class="form-select" v-model="transportInputs.mode">
                        <option selected value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Car">Car</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Walk">Walk</option>
                    </select> 
                </div>
                <div class="col-md-3">
                    <label for="inputTrasnportDistance" class="form-label">Distance (km)</label>
                    <input type="number" class="form-control" id="inputTrasnportDistance" v-model="transportInputs.distance">
                </div>
                <div class="col-md-3">
                    <label for="inputFuelEfficiency" class="form-label">Fuel Efficiency (l/km)</label>
                    <input type="number" class="form-control" id="inputFuelEfficiency" v-model="transportInputs.fuelEfficiency">
                </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col-6">
                    <button class="btn btn-primary" type="submit" @click="addTransportData">Add</button>
                    <button style="margin-left: 5px;" type="reset" class="btn btn-secondary" @click="resetTransportData">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Home Enery Use</h5>
            <div class="row">
                <div class="col-md-3">
                    <label for="inputHomeEnerySourceEntry" class="form-label">Enery Source</label>
                    <select id="inputHomeEnerySourceEntry" class="form-select" v-model="homeData.enerySource">
                        <option selected value="Electricity">Electricity (Grid)</option>
                        <option value="SolarPower">Solar Power</option>
                        <option value="WindPower">Wind Power</option>
                        <option value="NaturalGas">Natural Gas</option>
                        <option value="HeatingOil">Heating Oil</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputHomeEnergyElectricity" class="form-label">Usage (Ex : Electricity (kWh))</label>
                    <input type="number" class="form-control" id="inputHomeEnergyElectricity" v-model="homeData.electricityUsage">
                </div>
                <div class="col-md-3">
                    <label for="inputHomeEnergyGas" class="form-label" data-bs-toggle="tooltip" data-bs-placement="top" title="">
                        Gas (m3)
                    </label>
                    <input type="number" class="form-control" id="inputHomeEnergyGas" v-model="homeData.gasUsage">
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" style="margin-top: 10px; color: darkcyan;">
                    <span style="font-size: small;">For winter months, you might estimate around 15 to 20 m³ per day for a family of four, including heating, water heating, cooking, and other gas usage.
                        In warmer months, it could be much lower, likely between 5 to 10 m³ per day.
                    </span>
                </div>   
                <div class="col-md-12" style="margin-top: 10px; color: darkcyan;">
                    <span style="font-size: small;">For a family of four, daily average Electricity usage can be 20 to 30 kWh per day.
                    </span>
                </div> 
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body ">
            <h5 class="card-title">Summary of Carbon Emissions | Total : {{ this.totalCarbonEmissions }} kgCO2</h5>
            <div class="row" style="text-align: center;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Transportation - {{ this.calculateTransportEmission() }} kgCO2</h5>
                </div>
                <div class="col-md-6">
                    <h5 style="color: brown;">Home Energy - {{ this.calculateHomeEnergyEmission() }} kgCO2</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <button class="btn btn-primary" type="submit"  @click="submitData">Submit</button>
        </div>
    </div>
</template>

<script>

import ImpactEntryService from "@/services/ImpactEntryService";
import CarbonEmissionCalculation from "@/mixins/CarbonEmissionCalculation.mxn";

export default {
    name: "CarbonFootprintEntry",
    mixins:[CarbonEmissionCalculation],
    data() {           
        return {
            currentId : null,
            mode : "add",
            inputDate : this.$moment().format('YYYY-MM-DD'),
            transportData : [],
            transportInputs : {
                mode : "Bus",
                distance : 0,
                fuelEfficiency : 0,
                id : 0
            },
            homeData : {
                electricityUsage : 0,
                enerySource : "Electricity",
                gasUsage : 0
            }
        };
    },
    components: {
      
    },
    computed: {
        totalCarbonEmissions(){
            return parseFloat(this.calculateTransportEmission()) + parseFloat(this.calculateHomeEnergyEmission());
        }
    },
    methods: {
        fetchEnergyData (){
            this.currentId = null;
            ImpactEntryService.getUserEnergyUsageEntryForDay(this.$util.userId(), this.inputDate)
                .then(response => {       
                    console.log("Today energy data >> ", response.data);
                    if(response.data[0]){
                        this.transportData = response.data[0].transportData;
                        this.homeData = response.data[0].homeData;
                        this.currentId = response.data[0]._id; 
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        resetTransportData(){
            this.transportInputs = {
                mode : "Bus",
                distance : 0,
                fuelEfficiency : 0
            }
            this.mode === "add";
        },
        addTransportData(){
            if(this.mode === "add"){
                this.transportData.push({
                    mode : this.transportInputs.mode,
                    distance : this.transportInputs.distance,
                    fuelEfficiency : this.transportInputs.fuelEfficiency,
                    id : this.$util.generateRandomId()
                });
                this.resetTransportData();
            }
            console.log("this.transportData >> ", this.transportData);
        },
        editTransportData( item ){
            this.mode = "update";
            this.transportInputs = item;
        },
        deleteTransportData( item ){
            let _index = 0
            this.transportData.forEach((element, index) => {
                if( item.id === element.id )
                    _index = index;
            });
            this.transportData.splice(_index, 1);
        },
        submitData(){
            let inputPayload = {
                userId: this.$util.userId(),
                inputDate: this.inputDate, 
                transportData: this.transportData,
                homeData: this.homeData,
                carbonEmissionsEnergy : parseFloat(this.calculateTransportEmission()) + parseFloat(this.calculateHomeEnergyEmission()),
                transportEmissions : parseFloat(this.calculateTransportEmission()),
                homeEnergyEmissions : parseFloat(this.calculateHomeEnergyEmission())
            };

            if(this.currentId){
                inputPayload._id = this.currentId;
                ImpactEntryService.updateEnergyUsageEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully updated carbon footprint entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });  
            }
            else {
                ImpactEntryService.createEnergyUsageEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully added carbon footprint entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });    
            }
        }
    },
    mounted() {   
        this.fetchEnergyData();
    }
};
</script>

<style>

</style>
