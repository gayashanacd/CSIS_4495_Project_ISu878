<template>
    <div >
        <div class="pagetitle">
            <h1>Impact Entry</h1>
        </div><!-- End Page Title -->
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <!-- Default Tabs -->
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="carbon-footprint-tab" data-bs-toggle="tab" data-bs-target="#carbon-footprint" type="button" role="tab" aria-controls="carbon-footprint" aria-selected="true">Carbon Footprint</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="water-usage-tab" data-bs-toggle="tab" data-bs-target="#water-usage" type="button" role="tab" aria-controls="water-usage" aria-selected="false">Water Usage</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="waste-management-tab" data-bs-toggle="tab" data-bs-target="#waste-management" type="button" role="tab" aria-controls="waste-managemente" aria-selected="false">Waste Management</button>
                                </li>
                            </ul>
                            <div class="tab-content pt-2" id="myTabContent">
                                <div class="tab-pane fade show active" id="carbon-footprint" role="tabpanel" aria-labelledby="carbon-footprint-tab">
                                    <CarbonFootPrintEntry /> 
                                </div>
                                <div class="tab-pane fade" id="water-usage" role="tabpanel" aria-labelledby="water-usage-tab">
                                    <WaterUsageEntry />    
                                </div>
                                <div class="tab-pane fade" id="waste-management" role="tabpanel" aria-labelledby="waste-management-tab">
                                    <WasteManagementEntry />      
                                </div>
                            </div><!-- End Default Tabs -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import CarbonFootPrintEntry from '@/components/impact_entry/CarbonFootPrintEntry';
    import WaterUsageEntry from '@/components/impact_entry/WaterUsageEntry';
    import WasteManagementEntry from '@/components/impact_entry/WasteManagementEntry';

    export default{
        name: "InstituteView",
        data(){
            return{

            };
        },
        components: {
            CarbonFootPrintEntry,
            WaterUsageEntry,
            WasteManagementEntry
        },
        methods: {
        },

        mounted() {   
        }
    }

</script>

<style>

</style>
