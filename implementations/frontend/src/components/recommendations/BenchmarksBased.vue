<template>
    <div >
        <section class="section">
            <div class="row">
                <div class="col-lg-4" v-for="(item) in recommendations" :key="item._id">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"> {{ item.title }} </h5>
                            <div style="float: right; margin-top: -50px;">
                                <button style="padding: 2px 6px;" type="button" class="btn btn-danger" title="Delete Child" @click="deleteRecommendation(item)"><i class="bi bi-stop-circle"></i></button>   
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
  