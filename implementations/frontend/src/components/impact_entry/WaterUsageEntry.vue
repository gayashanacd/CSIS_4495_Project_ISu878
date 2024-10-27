<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <label for="inputWaterUsageDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputWaterUsageDate">
                </div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Shower / Bath</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDuration" class="form-label">Duration (minutes)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDuration">
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageBathWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageBathWaterUsed">
                        </div>
                    </div>
                </div>   
                <div class="col-md-6">
                    <h5 style="color: brown;">Dishwashing</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDishwashingMethod" class="form-label">Method</label>
                            <select id="inputWaterUsageDishwashingMethod" class="form-select">
                                <option selected>Dishwasher</option>
                                <option>Hand-washing</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageDishwashingWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDishwashingWaterUsed">
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
                            <select id="inputWaterUsageLawnMethod" class="form-select">
                                <option selected>Hose</option>
                                <option>Sprinkler</option> 
                                <option>Drip System</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageLawnWaterUsed" class="form-label">Water Used (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageLawnWaterUsed">
                        </div>
                    </div>
                </div>   
                <div class="col-md-6">
                    <h5 style="color: brown;">Other Water Usage</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputWaterUsageDrinkingWaterUsed" class="form-label">Drinking / Cooking (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageDrinkingWaterUsed">
                        </div>
                        <div class="col-md-6">
                            <label for="inputWaterUsageMiscellaneousWaterUsed" class="form-label">Miscellaneous (liters)</label>
                            <input type="int" class="form-control" id="inputWaterUsageMiscellaneousWaterUsed">
                        </div>
                    </div>
                </div> 
            </div>

            <div class="row" style="margin-top: 20px;">
                <h5 style="color: brown;">Laundry</h5>
                <div class="row">
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryType" class="form-label">Type</label>
                        <select id="inputWaterUsageLaundryType" class="form-select">
                            <option selected>Front Load</option>
                            <option>Top Load</option> 
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryWaterUsed" class="form-label">Water Used (liters)</label>
                        <input type="int" class="form-control" id="inputWaterUsageLaundryWaterUsed">
                    </div>
                    <div class="col-md-3">
                        <label for="inputWaterUsageLaundryNumberofLoads" class="form-label">Number of Loads</label>
                        <input type="int" class="form-control" id="inputWaterUsageLaundryNumberofLoads">
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
                    <h5 style="color: brown;">Household - 20 liters</h5>
                </div>
                <div class="col-md-6">
                    <h5 style="color: brown;">Outdoors - 10 liters</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-1">
            <button class="btn btn-primary w-100" type="submit">Submit</button>
        </div>
        <div class="col-1" style="margin-left: -15px;">
            <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "WaterUsageEntry",
    data() {           
        return {
        };
    },
    components: {
      
    },
    methods: {

    },
    mounted() {   
    }
};
</script>

<style>

</style>
