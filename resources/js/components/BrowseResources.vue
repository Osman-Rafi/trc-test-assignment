<template>
    <div class="mt-5">
        <template v-if="loading">
            <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
        </template>
        <template v-else>
            <div v-for="resource in resources" :key="resource.id">
                <div>
                    <resources-item/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import {BSpinner} from "bootstrap-vue";
import ResourcesItem from "./ResourcesItem";
import axios from "axios";

const uiComponents = {
    BSpinner
}
export default {
    name: "BrowseResources",
    components: {
        ...uiComponents,
        ResourcesItem
    },
    data: function () {
        return {
            loading: false,
            resources: {}
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
        }
    },
    created() {
        this.fetchResources();
    }
}
</script>
