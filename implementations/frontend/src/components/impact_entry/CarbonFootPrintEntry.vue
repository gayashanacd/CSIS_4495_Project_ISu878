<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Transport Data</h5>
            <div class="row">
                <div class="col-md-3">
                    <label for="inputTransportDate" class="form-label">Date</label>
                    <input type="date" class="form-control" id="inputTransportDate">
                </div>
                <div class="col-md-3">
                    <label for="inputTrasnportMode" class="form-label">Mode of Trasnport</label>
                    <select id="inputTrasnportMode" class="form-select">
                        <option selected>Public Transport</option>
                        <option>Car</option>
                        <option>Motorcycle</option>
                        <option>Bicycle</option>
                        <option>Walk</option>
                    </select> 
                </div>
                <div class="col-md-3">
                    <label for="inputTrasnportDistance" class="form-label">Distance (km)</label>
                    <input type="number" class="form-control" id="inputTrasnportDistance">
                </div>
                <div class="col-md-3">
                    <label for="inputFuelEfficiency" class="form-label">Fuel Efficiency (l/km)</label>
                    <input type="number" class="form-control" id="inputFuelEfficiency">
                </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <div class="col-1">
                    <button class="btn btn-primary w-100" type="submit" >Add</button>
                </div>
                <div class="col-1" style="margin-left: -15px;">
                    <button type="reset" class="btn btn-secondary">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Home Enery Use</h5>
            <div class="row">
                <div class="col-md-3">
                    <label for="inputHomeEnergyElectricity" class="form-label">Electricity (kWh)</label>
                    <input type="number" class="form-control" id="inputHomeEnergyElectricity">
                </div>
                <div class="col-md-3">
                    <label for="inputHomeEnerySourceEntry" class="form-label">Enery Source</label>
                    <select id="inputHomeEnerySourceEntry" class="form-select">
                        <option selected>Electricity (Grid)</option>
                        <option>Solar Power</option>
                        <option>Wind Power</option>
                        <option>Natural Gas</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputHomeEnergyGas" class="form-label">Gas (m3)</label>
                    <input type="number" class="form-control" id="inputHomeEnergyGas">
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-body ">
            <h5 class="card-title">Summary of Carbon Emissions | Total : 12.5 kgCO2</h5>
            <div class="row" style="text-align: center;">
                <div class="col-md-6">
                    <h5 style="color: brown;">Transportation - 8.5 kgCO2</h5>
                </div>
                <div class="col-md-6">
                    <h5 style="color: brown;">Home Energy - 4 kgCO2</h5>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-1">
            <button class="btn btn-primary w-100" type="submit">Submit</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "CarbonFootprintEntry",
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
