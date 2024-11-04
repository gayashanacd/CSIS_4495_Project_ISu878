<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">User Infomation</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="inputName" class="form-label">Name</label>
                                <input type="text" class="form-control" id="inputName" v-model="registerFormData.name">
                            </div>
                            <div class="col-md-6" v-if="this.view === 'register'">
                                <label for="inputUsername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="inputUsername" v-model="registerFormData.userName">
                            </div>
                            <div class="col-md-6" v-if="this.view === 'register'">
                                <label for="inputPassword" class="form-label">Password</label>
                                <input type="password" class="form-control" id="inputPassword" v-model="registerFormData.password">
                            </div>
                            <div class="col-md-12">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail" v-model="registerFormData.email">
                            </div>
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="registerFormData.address">
                            </div>
                            <div class="col-md-6">
                                <label for="inputCity" class="form-label">City</label>
                                <input type="text" class="form-control" id="inputCity" v-model="registerFormData.city">
                            </div>
                            <div class="col-md-6">
                                <label for="inputOccupation" class="form-label">Occupation</label>
                                <input type="text" class="form-control" id="inputOccupation" v-model="registerFormData.occupation">
                            </div>
                            <div class="col-md-6">
                                <label for="inputDob" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control" id="inputDob" v-model="registerFormData.dob">
                            </div>
                            <div class="col-md-6">
                                <label for="inputHouseholdSize" class="form-label">Household Size</label>
                                <input type="number" class="form-control" id="inputHouseholdSize" v-model="registerFormData.householdSize">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Water & Recycling Habits</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputHomeWasteDisposal" class="form-label">Waste Disposal Method</label>
                            <select id="inputHomeWasteDisposal" class="form-select" v-model="registerFormData.waterHabits.wasteDisposalMethod">
                                <option selected value="MunicipalPickup">Municipal Pickup</option>
                                <option value="PrivateService">Private Service</option>
                                <option value="SelfDisposal">Self Disposal</option>
                            </select> 
                        </div>
                        <div class="col-md-6">
                            <label for="inputRecyclingFrequency" class="form-label">Recycling Frequency</label>
                            <select id="inputRecyclingFrequency" class="form-select" v-model="registerFormData.waterHabits.recyclingFrequency">
                                <option selected value="Daily">Daily</option> 
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select> 
                        </div>
                        <div class="col-md-6">
                            <label for="inputRecyclingHabits" class="form-label">Recycling Habits</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkPaper" v-model="checkBoxRecyclingHabits.paper">
                                <label class="form-check-label" for="checkPaper">
                                    Paper
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkPlastic" v-model="checkBoxRecyclingHabits.plastic">
                                <label class="form-check-label" for="checkPlastic">
                                    Plastic
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkGlass" v-model="checkBoxRecyclingHabits.glass">
                                <label class="form-check-label" for="checkGlass">
                                    Glass
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="checkMetals" v-model="checkBoxRecyclingHabits.metal">
                                <label class="form-check-label" for="checkMetals">
                                    Metals
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterSource" class="form-label">Water Source</label>
                            <select id="inputWaterSource" class="form-select" v-model="registerFormData.waterHabits.waterSource">
                                <option selected value="MunicipalSupply">Municipal Supply</option>
                                <option value="Well">Well</option>
                                <option value="RainwaterHarvesting<">Rainwater Harvesting</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Trasnport Preferences</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputTrasnport" class="form-label">Primay Mode of Trasnport</label>
                                <select id="inputTrasnport" class="form-select" v-model="registerFormData.transportPreferences.primaryTransportMode">
                                    <option selected value="PublicTransport">Public Transport</option>
                                    <option value="Car">Car</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Bicycle">Bicycle</option>
                                    <option value="Walk">Walk</option>
                                </select> 
                            </div>
                            <div class="col-md-6">
                                <label for="inputCommuteDistance" class="form-label">Commute Distance (km)</label>
                                <input type="number" class="form-control" id="inputCommuteDistance" v-model="registerFormData.transportPreferences.commuteDistance">
                            </div>
                            <div class="col-md-6">
                                <label for="inputVehicleType" class="form-label">Vehicle Type</label>
                                <select id="inputVehicleType" class="form-select" v-model="registerFormData.transportPreferences.vehicleType">
                                    <option selected value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select> 
                            </div>
                            <div class="col-md-6">
                                <label for="inputFuelEfficiency" class="form-label">Fuel Efficiency (l/km)</label>
                                <input type="number" class="form-control" id="inputFuelEfficiency" v-model="registerFormData.transportPreferences.fuelEffeciency">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Enery & Utility Preferences</h5>
                    <div class="row" style="margin-top: 10px;">
                        <div class="col-md-6">
                            <label for="inputHomeEnerySource" class="form-label">Home Enery Source</label>
                            <select id="inputHomeEnerySource" class="form-select" v-model="registerFormData.energyPreferences.homeEnerySource">
                                <option selected value="Electricity">Electricity (Grid)</option>
                                <option value="SolarPower">Solar Power</option>
                                <option value="WindPower">Wind Power</option>
                                <option value="NaturalGas">Natural Gas</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputHomeSize" class="form-label">Home Size (sqft)</label>
                            <input type="text" class="form-control" id="inputHomeSize" v-model="registerFormData.energyPreferences.homeSize">
                        </div>
                        <div class="col-md-6">
                            <label for="inputHomeType" class="form-label">Home Type</label>
                            <select id="inputHomeType" class="form-select" v-model="registerFormData.energyPreferences.homeType">
                                <option selected value="Apartment">Apartment</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="DetachedHouse">Detached House</option>
                                <option value="BasementHouse">Basement House</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div :class="buttonClass">
            <div :class="buttonTextClass">
                <button class="btn btn-primary" type="submit" @click="register">Submit</button>
                <button type="reset" style="margin-left: 5px;" class="btn btn-secondary" @click="resetData">Reset</button>
                <button v-if="this.view === 'register'" type="button" style="margin-left: 5px;" class="btn btn-secondary" @click="backToLogin">
                    Back to Login
                </button>
            </div>
        </div>
    </div>  
  </template>
  
<script>

import UserRegistrationService from "@/services/UserRegistrationService";

export default {
    name: "UserProfile",
    props: ['view'],
    data() {
        return {
            registerFormData: { 
                userName: "", 
                password: "",
                name : "",
                email : "",
                address : "",
                city : "",
                occulation : "",
                dob : "",
                householdSize : 0,
                energyPreferences: {
                    homeEnerySource : "Electricity",
                    homeSize : 0,
                    homeType : "Apartment"
                }, 
                transportPreferences: {
                    primaryTransportMode : "PublicTransport",
                    commuteDistance : 0,
                    vehicleType : "Petrol",
                    fuelEffeciency : 0
                },
                waterHabits: {
                    wasteDisposalMethod : "MunicipalPickup",
                    recyclingHabits : [],
                    recyclingFrequency : "Daily",
                    waterSource : "MunicipalSupply"
                }
            },
            checkBoxRecyclingHabits : {
                paper : false,
                plastic : false,
                metal : false,
                glass : false
            }
        };
    },
    computed: {
        buttonClass(){
            return this.view === 'register' ? 'row justify-content-center' : 'row';
        },
        buttonTextClass(){
            return this.view === 'register' ? 'col-12 btn-align-center' : 'col-12 btn-align-left';
        }
    },
    methods: {
        populateData(){
            this.resetData();
            let userData = this.$util.getUser();
            this.registerFormData = userData;
        },
        register(event) {
            event.preventDefault();
            this.registerFormData.dob = this.$moment(this.registerFormData.dob).format('YYYY-MM-DD');

            if(this.view === 'profile'){
                UserRegistrationService.updateUserProfile(this.registerFormData)
                    .then(response => {       
                        let user = response.data;
                        console.log(user);
                        this.$util.setUser(user);
                        this.$util.notify("Successfully updated user data !", "success"); 
                    })
                    .catch(e => {
                        this.$util.notify(e.response.data);
                        this.message = e.response.data;
                        console.log(e.response.data);
                    });
            }
            else {
                UserRegistrationService.register(this.registerFormData)
                    .then(response => {       
                        let user = response.data;
                        console.log(user);
                        this.$util.setUser(user);
                        this.$util.setAuth(true);
                        this.$router.push({ name: "DashboardView" }); 
                        this.$util.wait(200).then(() => {                        
                            location.reload();                        
                        })  
                    })
                    .catch(e => {
                        this.$util.notify(e.response.data);
                        this.message = e.response.data;
                        console.log(e.response.data);
                    });
            }
        },
        backToLogin(){
            this.$router.push({ name: "login" }); 
            this.$util.wait(200).then(() => {                        
                location.reload();                        
            })  
        },
        resetData(){
            this.registerFormData = { 
                userName: "", 
                password: "",
                name : "",
                email : "",
                address : "",
                city : "",
                occulation : "",
                dob : "",
                householdSize : 0,
                energyPreferences: {
                    homeEnerySource : "Electricity",
                    homeSize : 0,
                    homeType : "Apartment"
                }, 
                transportPreferences: {
                    primaryTransportMode : "PublicTransport",
                    commuteDistance : 0,
                    vehicleType : "Petrol",
                    fuelEffeciency : 0
                },
                waterHabits: {
                    wasteDisposalMethod : "MunicipalPickup",
                    recyclingHabits : [],
                    recyclingFrequency : "Daily",
                    waterSource : "MunicipalSupply"
                }
            }   
        }
    },
    mounted() {
        if(this.view === 'profile')
            this.populateData();
    }
};

</script>
  
<style scoped>
  .edit-form {
      max-width: 300px;
      margin: auto;
  }
  .row div{
      margin-bottom: 10px;
  }
  .btn-align-center {
    text-align: center; 
  }
  .btn-align-left {
    text-align: left; 
  }
</style>
  