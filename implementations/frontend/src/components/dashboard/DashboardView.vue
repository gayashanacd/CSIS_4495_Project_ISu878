<template>
    <div class="pagetitle">
        <h1>Dashboard</h1>
        <div class="row" style="float: right; margin-top: -35px;">
            <div class="col-md-4">
                <select id="inputDashboardDay" class="form-select"  v-model="searchFilters.timePeriod">
                    <option selected value="Today">Today</option>
                    <option value="Last Month">Last Month</option>
                    <option value="Last Year">Last Year</option>
                </select> 
            </div>
            <div class="col-md-1" style="margin: 5px -15px 5px 0px;">
                 | 
            </div>
            <div class="col-md-1" style="margin-right: 5px;">
                <button type="button" class="btn btn-info"><i class="bi bi-caret-left" @click="changeDay('backward');"></i></button>
            </div>
            <div class="col-md-5" style="margin: 0px;">
                <input type="date" class="form-control" id="inputDashboardDate" v-model="searchFilters.date">
            </div>
            <div class="col-md-1" style="margin-left: -20px; margin-right: 15px;">
                <button type="button" class="btn btn-info"><i class="bi bi-caret-right" @click="changeDay('forward');"></i></button>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>

    <section class="section dashboard">
        <div class="row" style="margin-top: 20px;">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-xxl-3 col-md-4">
                        <div class="card info-card sales-card">
                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Total Carbon Footprint <span>| Today</span></h5>
                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cloud-lightning-rain"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ this.carbonFootprintData.total }} <span style="font-size: medium;">kgCO2</span> </h6>
                                        <span class="text-danger small pt-1 fw-bold">5%</span> <span class="text-muted small pt-2 ps-1">increase</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-md-4">
                        <div class="card info-card customers-card">
                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Transport Emissions <span>| Today</span></h5>
                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-car-front"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ this.carbonFootprintData.transport }} <span style="font-size: medium;">kgCO2</span> </h6>
                                        <span class="text-danger small pt-1 fw-bold">2%</span> <span class="text-muted small pt-2 ps-1">increase</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-md-4">
                        <div class="card info-card customers-card">
                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Energy Emissions <span>| Today</span></h5>
                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-plug"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ this.carbonFootprintData.energy }} <span style="font-size: medium;">kgCO2</span> </h6>
                                        <span class="text-success small pt-1 fw-bold">5%</span> <span class="text-muted small pt-2 ps-1">decrease</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-md-4">
                        <div class="card info-card customers-card">
                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Waste Emissions <span>| Today</span></h5>
                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-trash"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ this.carbonFootprintData.waste }} <span style="font-size: medium;">kgCO2</span> </h6> 
                                        <span class="text-danger small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  

        <div class="row" style="margin-top: 20px;">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Carbon Footprint <span> | Today</span></h5>
                        <apexchart width="508" type="donut" 
                            :options="carbonFootprintPieData.options" 
                            :series="carbonFootprintPieData.series">
                        </apexchart>
                    </div>
                </div>
            </div> 
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Waste Management<span> | Today</span></h5>
                        <apexchart width="480" type="pie" 
                            :options="wastePieData.options" 
                            :series="wastePieData.series">
                        </apexchart>
                    </div>
                </div>
            </div> 
        </div>

        <div class="row" style="margin-top: 20px;">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Daily Water Consumption</h5>
                        <apexchart width="100%" type="bar" 
                            :options="waterConsumptionBarData.options" 
                            :series="waterConsumptionBarData.series">
                        </apexchart>
                    </div>
                </div>
            </div> 
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Recommendations</h5>
                        <div class="activity">
                            <div class="activity-item d-flex" v-for="(item, index) in recommendations" :key="item.id">
                                <div class="activite-label">{{ index + 1 }}</div>
                                <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                                <div class="activity-content">
                                    {{ item.text }}
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div> 
        </div>
    </section>
    
</template>

<script>

import ImpactEntryService from "@/services/ImpactEntryService";
const Recyclable = ["Plastic", "Paper", "Metal", "Glass"];
const NonRecyclable = ["General", "Organic"];

export default {
    name: "DashboardView",
    data() {           
        return {
            today : this.$moment().format('YYYY-MM-DD'),
            searchFilters : {
                timePeriod : "Today",
                date : this.$moment().format('YYYY-MM-DD'),
            },
            carbonFootprintData : {
                total : 0,
                transport : 0,
                energy : 0,
                waste : 0
            },
            carbonFootprintPieData : {
                options: {
                    chart: {
                        id: 'carbonFootprintPieChart'
                    },
                    labels : ["Transport Emissions", "Energy Emissions", "Waste Emissions"]
                },
                series: [], 
            },
            wastePieData : {
                options: {
                    chart: {
                        id: 'wastePieChart'
                    },
                    labels : ["Recyclable", "NonRecyclable"]
                },
                series: [], 
            },
            waterConsumptionBarData : {
                options: {
                    chart: {
                        id: 'waterConsumptionBarChart',
                        toolbar: {
                            show: true
                        }
                    },
                    xaxis: {
                        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                    }
                },
                series: [{
                    name: 'series-1',
                    data: [0, 0, 0, 0, 0, 0, 0]
                }]
            },
            recommendations : [
                { id : 1, text : "Recycle your plastic botteles" },
                { id : 1, text : "Compost organic waste" },
                { id : 1, text : "Recycling contamination alert" },
                { id : 1, text : "Cutdown on single use plastic" },
                { id : 1, text : "Shorten your shower by 5 minutes to save 40 liters of water" },
                { id : 1, text : "Switch to a water-efficient dishwasher cycle to reduce water use by 30%" }
            ]
        };
    },
    components: {
      
    },
    methods: {
        changeDay(type){
            if( type === 'forward'){
                const today = this.$moment().startOf('day');
                const newDate = this.$moment(this.searchFilters.date).add(1, 'days');
                if (newDate.isAfter(today)) {
                    this.$util.notify("Invalid day !", "warning"); 
                }
                else{
                    this.searchFilters.date = newDate.format('YYYY-MM-DD');
                    this.fetchEnergyData();
                    this.fetchWasteData();
                }
            }
            else {
                this.searchFilters.date = this.$moment(this.searchFilters.date).subtract(1, 'days').format('YYYY-MM-DD');
                this.fetchEnergyData();
                this.fetchWasteData();
            }
        },
        fetchEnergyData (){
            ImpactEntryService.getUserEnergyUsageEntryForDay(this.$util.userId(), this.searchFilters.date)
                .then(response => {       
                    console.log("Today energy data >> ", response.data);
                    if(response.data[0]){
                        this.carbonFootprintData.transport = response.data[0].transportEmissions;
                        this.carbonFootprintData.energy = response.data[0].carbonEmissionsEnergy;
                    }
                    this.calculateTotalEmission();
                    this.renderCarbonFootprintPieChart();
                })
                .catch(e => {
                    console.log(e.response.data);
                });
        },
        fetchWasteData(){
            ImpactEntryService.getUserWasteManagementEntryForDay(this.$util.userId(), this.searchFilters.date)
                .then(response => {       
                    console.log("Today waste data >> ", response.data);
                    if(response.data[0]){
                        this.carbonFootprintData.waste = response.data[0].carbonEmissionsWaste;
                    }
                    this.renderCarbonFootprintPieChart();
                    this.renderWastePieChart(response.data[0]);
                })
                .catch(e => {
                    console.log(e.response);
                });
        },
        fetchDailyWaterUsageChartData(){
            ImpactEntryService.getUserDailyWaterUsage(this.$util.userId())
                .then(response => {       
                    if(response.data){
                        let _data = [];
                        if(response.data.Mon)
                            _data.push(response.data.Mon);  
                        else 
                            _data.push(0);  
                        if(response.data.Tue)
                            _data.push(response.data.Tue);  
                        else 
                            _data.push(0);
                        if(response.data.Wed)
                            _data.push(response.data.Wed);  
                        else 
                            _data.push(0);
                        if(response.data.Thu)
                            _data.push(response.data.Thu);  
                        else 
                            _data.push(0);
                        if(response.data.Fri)
                            _data.push(response.data.Fri);  
                        else 
                            _data.push(0);
                        if(response.data.Sat)
                            _data.push(response.data.Sat);  
                        else 
                            _data.push(0);
                        if(response.data.Sun)
                            _data.push(response.data.Sun);  
                        else 
                            _data.push(0);
                        this.waterConsumptionBarData.series = [
                            {
                                name: 'days',
                                data: _data
                            }
                        ];
                    }
                })
                .catch(e => {
                    console.log(e.response);
                });
        },
        renderCarbonFootprintPieChart(){
            this.carbonFootprintPieData.series = [
                this.carbonFootprintData.transport,
                this.carbonFootprintData.energy,
                this.carbonFootprintData.waste
            ];
        },
        renderWastePieChart(wasteDataObj){
            let totRecyclable = 0;
            let totNonRecyclable = 0;
            wasteDataObj.wasteData.forEach(element => {
                if(Recyclable.includes(element.categery)){
                    totRecyclable += element.amount;  
                }
                else if(NonRecyclable.includes(element.categery)){
                    totNonRecyclable += element.amount; 
                }
            });
            this.wastePieData.series = [totRecyclable, totNonRecyclable];
        },
        calculateTotalEmission(){
            this.carbonFootprintData.total =  (this.carbonFootprintData.transport + this.carbonFootprintData.energy + this.carbonFootprintData.waste).toFixed(2)
        }
    },
    mounted() {   
        this.fetchEnergyData();
        this.fetchWasteData();
        this.fetchDailyWaterUsageChartData();
    }
};
</script>

<style scoped>
    .card-body{
        padding: 0 20px 20px 20px;
    }
</style>
