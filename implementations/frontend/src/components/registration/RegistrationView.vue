<template>

<div>
        <main>
          <div class="container">
            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12 d-flex flex-column align-items-center justify-content-center">
                    <div class="d-flex justify-content-center py-4">
                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                            <img alt="Logo" src="@/assets/logo.png">
                        </a>  
                        <h5 class="card-title text-center pb-0 fs-4" style="margin-top: -5px; margin-left: 15px;"> | Let's Get Started !</h5>
                    </div>
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">User Infomation</h5>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label for="inputName" class="form-label">Name</label>
                                                    <input type="text" class="form-control" id="inputName">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputEmail" class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="inputEmail">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputPassword" class="form-label">Password</label>
                                                    <input type="password" class="form-control" id="inputPassword">
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputAddress" class="form-label">Address</label>
                                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputDob" class="form-label">Date of Birth</label>
                                                    <input type="date" class="form-control" id="inputDob">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputHouseholdSize" class="form-label">Household Size</label>
                                                    <input type="number" class="form-control" id="inputHouseholdSize">
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
                                                <select id="inputHomeWasteDisposal" class="form-select">
                                                    <option selected>Municipal Pickup</option>
                                                    <option>Private Service</option>
                                                    <option>Self Disposal</option>
                                                </select> 
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputRecyclingFrequency" class="form-label">Recycling Frequency</label>
                                                <select id="inputRecyclingFrequency" class="form-select">
                                                    <option selected>Daily</option> 
                                                    <option>Weekly</option>
                                                    <option>Monthly</option>
                                                </select> 
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputRecyclingHabits" class="form-label">Recycling Habits</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="checkPaper">
                                                    <label class="form-check-label" for="checkPaper">
                                                        Paper
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="checkPlastic">
                                                    <label class="form-check-label" for="checkPlastic">
                                                        Plastic
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="checkGlass">
                                                    <label class="form-check-label" for="checkGlass">
                                                        Glass
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="checkMetals">
                                                    <label class="form-check-label" for="checkMetals">
                                                        Metals
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputWaterSource" class="form-label">Water Source</label>
                                                <select id="inputWaterSource" class="form-select">
                                                    <option selected>Municipal Supply</option>
                                                    <option>Well</option>
                                                    <option>Rainwater Harvesting</option>
                                                    <option>Other</option>
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
                                                    <select id="inputTrasnport" class="form-select">
                                                        <option selected>Public Transport</option>
                                                        <option>Car</option>
                                                        <option>Motorcycle</option>
                                                        <option>Bicycle</option>
                                                        <option>Walk</option>
                                                    </select> 
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputCommuteDistance" class="form-label">Commute Distance (km)</label>
                                                    <input type="number" class="form-control" id="inputCommuteDistance">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputVehicleType" class="form-label">Vehicle Type</label>
                                                    <select id="inputVehicleType" class="form-select">
                                                        <option selected>Petrol</option>
                                                        <option>Diesel</option>
                                                        <option>Electric</option>
                                                        <option>Hybrid</option>
                                                    </select> 
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputFuelEfficiency" class="form-label">Fuel Efficiency (l/km)</label>
                                                    <input type="number" class="form-control" id="inputFuelEfficiency">
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
                                                <select id="inputHomeEnerySource" class="form-select">
                                                    <option selected>Electricity (Grid)</option>
                                                    <option>Solar Power</option>
                                                    <option>Wind Power</option>
                                                    <option>Natural Gas</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputHomeSize" class="form-label">Home Size (sqft)</label>
                                                <input type="text" class="form-control" id="inputHomeSize">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputHomeType" class="form-label">Home Type</label>
                                                <select id="inputHomeType" class="form-select">
                                                    <option selected>Apartment</option>
                                                    <option>Townhouse</option>
                                                    <option>Detached House</option>
                                                    <option>Basement House</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputWaterSource" class="form-label">Water Source</label>
                                                <select id="inputWaterSource" class="form-select">
                                                    <option selected>Municipal Supply</option>
                                                    <option>Well</option>
                                                    <option>Rainwater Harvesting</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-1">
                                    <button class="btn btn-primary w-100" type="submit" @click="register">Submit</button>
                                </div>
                                <div class="col-1" style="margin-left: -15px;">
                                    <button type="reset" class="btn btn-secondary">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </section>
          </div>
        </main><!-- End #main -->
        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
    </div>

</template>

<script>


export default {
    name: "RegistrationView",
    data() {
        return {

        };
    },
    methods: {
        register(event) {
            event.preventDefault();
            this.$util.setAuth(true);
            this.$router.push({ name: "DashboardView" }); 
            this.$util.wait(200).then(() => {                        
                location.reload();                        
            })  
        },
    },
    mounted() {
    }
};
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
