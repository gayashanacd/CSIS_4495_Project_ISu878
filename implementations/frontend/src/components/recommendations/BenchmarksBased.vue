<template>
    <div >
        <section class="section">
            <div class="row">
                <div class="col-md-12" style="margin-top: 10px; color: darkcyan;">
                    <span style="font-size: small;">All these recommendations are based on from <b>last week</b> data and canadian benchmarks. 
                    </span>
                </div>   
                <div class="col-md-12" style="margin-top: 10px; color: darkcyan; margin-bottom: 15px;">
                    <span style="font-size: small;">In Canada, the average daily footprint per person includes <b>39 kg of CO₂</b>emissions, <b>329 liters</b> of water usage, and <b>1.16 kg</b> of waste.
                        Worldwide, the average daily footprint per person includes <b>10.9 kg of CO₂</b> emissions, <b>140 liters</b> of water usage, and <b>0.74 kg</b> of waste
                    </span>
                </div> 
            </div>
            <div class="row">
                <div class="col-lg-4" v-for="(item) in recommendations" :key="item._id">
                    <div :class="$util.recommendationCardClass(item)">
                        <div class="card-body">
                            <h5 class="card-title"> {{ item.title }} </h5>
                            <div style="float: right; margin-top: -50px;">
                                <button style="padding: 2px 6px;" type="button" class="btn btn-danger" title="Delete Recommendation" @click="deleteRecommendation(item)"><i class="bi bi-stop-circle"></i></button>   
                            </div>
                            {{ item.message }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
    
    import RecommendationService from "@/services/RecommendationService";

    export default {
        name: "BenchmarksBased",
        data() {           
            return {
                recommendations : []
            };
        },
        methods: {
            fetchRecommendations(){
                this.recommendations = [];
                RecommendationService.getUserRecommendations(this.$util.userId(), "benchmark")
                    .then(response => {       
                        console.log("Recommendations >> ", response.data);
                        if(response.data.length > 0){
                            this.recommendations = response.data;
                        }
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });
            },
            deleteRecommendation(item){
                item.isArchived = true;
                RecommendationService.archiveRecommendation(item)
                    .then(response => {       
                        console.log("Archived >> ", response.data);
                        this.$util.wait(200).then(() => {                        
                            this.fetchRecommendations();                    
                        })    
                    })
                    .catch(e => {
                        console.log(e.response.data);
                    });
            }
        },
        mounted() {   
            this.fetchRecommendations();
        }
    };

</script>
  
<style scoped>
    .card-body{
        padding: 0 20px 20px 20px;
    }
</style>
  