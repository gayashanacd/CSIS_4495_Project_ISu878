<template>
    <div class="pagetitle">
        <h1>Recommendations Based On</h1>
    </div>
    <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <!-- Default Tabs -->
                            <ul class="nav nav-tabs" id="recommendationsTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="benchmarks-tab" data-bs-toggle="tab" data-bs-target="#benchmarks" type="button" role="tab" aria-controls="benchmarks" aria-selected="true">Benchmarks</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pattern-recognition-tab" data-bs-toggle="tab" data-bs-target="#pattern-recognition" type="button" role="tab" aria-controls="pattern-recognition" aria-selected="false">Historic Data</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="comparative-feedback-tab" data-bs-toggle="tab" data-bs-target="#comparative-feedback" type="button" role="tab" aria-controls="comparative-feedback" aria-selected="false">Comparative Feedback</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="context-aware-tab" data-bs-toggle="tab" data-bs-target="#context-aware" type="button" role="tab" aria-controls="context-aware" aria-selected="false">Context Aware</button>
                                </li>
                            </ul>
                            <div class="tab-content pt-2" id="recommendationsTabContent">
                                <div class="tab-pane fade show active" id="benchmarks" role="tabpanel" aria-labelledby="benchmarks-tab">
                                    <BenchmarksBased /> 
                                </div>
                                <div class="tab-pane fade" id="pattern-recognition" role="tabpanel" aria-labelledby="pattern-recognition-tab">
                                    <PatternBased />    
                                </div>
                                <div class="tab-pane fade" id="comparative-feedback" role="tabpanel" aria-labelledby="comparative-feedback-tab">
                                    <ComparativeBased />      
                                </div>
                                <div class="tab-pane fade" id="context-aware" role="tabpanel" aria-labelledby="context-aware-tab">
                                    <ContextAware />      
                                </div>
                            </div><!-- End Default Tabs -->
                        </div>
                    </div>
                </div>
            </div>
        </section>  
</template>

<script>

import BenchmarksBased from '@/components/recommendations/BenchmarksBased.vue';
import PatternBased from '@/components/recommendations/PatternBased.vue';
import ComparativeBased from '@/components/recommendations/ComparativeBased.vue';
import ContextAware from '@/components/recommendations/ContextAware.vue';

export default {
    name: "RecommendationsView",
    data() {           
        return {
        };
    },
    components: {
        BenchmarksBased,
        PatternBased,
        ComparativeBased,
        ContextAware
    },
    methods: {

    },
    mounted() {   
    }
};
</script>

<style>

</style>
