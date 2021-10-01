<template>
    <b-container>
        <b-row class="justify-content-center text-center mt-5 pt-5">
            <b-col md="12" lg="10">
                <h2>The Remote Company Resources</h2>
                <p>To navigate through the resources enter as a visitor, and to create resources enter a admin</p>
                <div>
                    <router-link to="/manage-resources">
                        <b-button variant="primary" @click="adminViewLoading=true">
                            <b-spinner v-if="adminViewLoading" small label="Loading..."></b-spinner>
                            Enter as an Admin
                        </b-button>
                    </router-link>

                    <router-link to="/browse-resources">
                        <b-button variant="success" @click="visitorsViewLoading=true">
                            <b-spinner v-if="visitorsViewLoading" small label="Loading..."></b-spinner>
                            Enter as a Visitor
                        </b-button>
                    </router-link>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {BButton, BCol, BContainer, BRow, BSpinner} from "bootstrap-vue";

const uiElements = {BContainer, BRow, BCol, BButton, BSpinner}

export default {
    name: "Welcome",
    data: function () {
        return {
            adminViewLoading: false,
            visitorsViewLoading: false
        }
    },
    components: {
        ...uiElements,
    }
}
</script>
