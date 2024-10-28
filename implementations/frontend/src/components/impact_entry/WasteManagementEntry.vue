<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <label for="inputWasteDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputWasteDate" v-model="inputDate">
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-12">
                    <table class="table datatable">
                        <thead>
                        <tr>
                            <th>Categery</th>
                            <th>Amount (kg)</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in wasteData" :key="item.id">
                            <td>{{ item.categery }}</td>
                            <td>{{ item.amount }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-info" title="Edit Child" @click="editWasteData(item)"><i class="bi bi-pencil-square"></i></button>
                                    <button type="button" class="btn btn-danger" title="Delete Child" @click="deleteWasteData(item)"><i class="bi bi-stop-circle"></i></button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-3">
                    <label for="inputWasteCategery" class="form-label">Categery</label>
                    <select id="inputWasteCategery" class="form-select"  v-model="wasteInputs.categery">
                        <option selected value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                        <option value="Metal">Metal</option>
                        <option value="Organic">Organic</option>
                        <option value="Glass">Glass</option>
                        <option value="General">General</option>
                    </select> 
                </div>
                <div class="col-md-3">
                    <label for="inputWasteAmount" class="form-label">Amount (kg)</label>
                    <input type="number" class="form-control" id="inputWasteAmount" v-model="wasteInputs.amount">
                </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col-1">
                    <button class="btn btn-primary w-100" type="submit"  @click="addWasteData">Add</button>
                </div>
                <div class="col-1" style="margin-left: -15px;">
                    <button type="reset" class="btn btn-secondary" @click="resetWasteData">Reset</button>
                </div>
            </div>
        </div>
    </div>   
    <div class="card">
        <div class="card-body ">
            <h5 class="card-title">Summary of Waste | Total : 5 kg</h5>
            <div class="row" style="text-align: center;">
                <div class="col-md-4">
                    <h5 style="color: brown;">Recyclable - {{ this.totalRecyclable }} kg</h5>
                </div>
                <div class="col-md-4">
                    <h5 style="color: brown;">Non-Recyclable - {{ this.totalNonRecyclable }} kg</h5>
                </div>
                <div class="col-md-4">
                    <h5 style="color: brown;">Estimated Carbon Emissions - {{ this.calculateWasteEmission() }} kg CO2 - eq</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-1">
            <button class="btn btn-primary w-100" type="submit" @click="submitData">Submit</button>
        </div>
        <!-- <div class="col-1" style="margin-left: -15px;">
            <button type="reset" class="btn btn-secondary">Reset</button>
        </div> -->
    </div>  
</template>

<script>

import ImpactEntryService from "@/services/ImpactEntryService";
import CarbonEmissionCalculation from "@/mixins/CarbonEmissionCalculation.mxn";
const Recyclable = ["Plastic", "Paper", "Metal", "Glass"];
const NonRecyclable = ["General", "Organic"];

export default {
    name: "WasteManagementEntry",
    mixins:[CarbonEmissionCalculation],
    data() {           
        return {
            currentId : null,
            mode : "add",
            inputDate : this.$moment().format('YYYY-MM-DD'),
            wasteData : [],
            wasteInputs : {
                categery : "Plastic",
                amount : 0,
                id : 0
            }
        };
    },
    components: {
      
    },
    computed: {
        totalRecyclable(){
            let totRecyclable = 0;
            this.wasteData.forEach(element => {
                if(Recyclable.includes(element.categery)){
                    totRecyclable += element.amount;  
                }
            });
            return totRecyclable;
        },
        totalNonRecyclable(){
            let totNonRecyclable = 0;
            this.wasteData.forEach(element => {
                if(NonRecyclable.includes(element.categery)){
                    totNonRecyclable += element.amount;  
                }
            });
            return totNonRecyclable;
        }
    },
    methods: {
        fetchWasteData(){
            this.currentId = null;
            ImpactEntryService.getUserWasteManagementEntryForDay(this.$util.userId(), this.inputDate)
                .then(response => {       
                    console.log("Today waste data >> ", response.data);
                    if(response.data[0]){
                        this.wasteData = response.data[0].wasteData;
                        this.currentId = response.data[0]._id; 
                    }
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        resetWasteData(){
            this.wasteInputs = {
                categery : "Plastic",
                amount : 0
            }
            this.mode === "add";
        },
        addWasteData(){
            if(this.mode === "add"){
                this.wasteData.push({
                    categery : this.wasteInputs.categery,
                    amount : this.wasteInputs.amount,
                    id : this.$util.generateRandomId()
                });
                this.resetWasteData();
            }
        },
        editWasteData( item ){
            this.mode = "update";
            this.wasteInputs = item;
        },
        deleteWasteData( item ){
            let _index = 0
            this.wasteData.forEach((element, index) => {
                if( item.id === element.id )
                    _index = index;
            });
            this.wasteData.splice(_index, 1);
        },
        submitData(){
            let inputPayload = {
                userId: this.$util.userId(),
                inputDate: this.inputDate, // this.$moment(this.inputDate).format('YYYY-MM-DD'),
                wasteData: this.wasteData,
                carbonEmissionsWaste : this.calculateWasteEmission()
            };

            if(this.currentId){
                inputPayload._id = this.currentId;
                ImpactEntryService.updateWasteManagementEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully updated waste management entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });  
            }
            else {
                ImpactEntryService.createWasteManagementEntry(inputPayload)
                    .then(response => {       
                        console.log(response.data);
                        this.$util.notify("Successfully added waste management entry !", "success"); 
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });    
            }
        }
    },
    mounted() {   
        this.fetchWasteData();
    }
};
</script>

<style>

</style>
