<template>
    <b-container>
        <b-row class="justify-content-center text-center mt-5 pt-5">
            <b-col md="12" lg="10">
                <h2>The Remote Company Resources</h2>
                <p>To navigate through the resources enter as a visitor, and to create resources enter a admin</p>
                <div>
                    <Link path="/manage-resources" label="Enter as a Admin" variant="primary"/>
                    <Link path="/browse-resources" label="Enter as a Visitor" variant="success"/>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {BContainer,BCol, BRow} from "bootstrap-vue";
import Link from "../components/Link";

const uiElements = {BContainer,BRow, BCol}

export default {
    name: "Welcome",
    components: {
        ...uiElements,
        Link
    }
}
</script>
