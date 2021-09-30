<template>
    <div>
        <Banner/>
        <b-container>
            <b-row class="justify-content-center mt-5">
                <b-col sm="12" lg="10">
                    <div>
                        <Resources :resources="resources" :can-manage="false" :loading="loading"/>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {BCol, BContainer, BRow} from "bootstrap-vue";
import Banner from "../components/Banner";
import Resources from "../components/Resources";
import axios from "axios";

export default {
    name: "BrowseResources",
    components: {
        BContainer,
        BRow,
        BCol,
        Banner,
        Resources
    },
    data: function () {
        return {
            resources: [],
            loading: false
        }
    },
    methods: {
        fetchResources() {
            this.loading = true;
            axios.get('api/fetch-resources')
                .then(res => res.data.resources)
                .then((res) => {
                    this.loading = false
                    this.resources = res
                })
        },
    },
    created() {
        this.fetchResources()
    }
}
</script>
