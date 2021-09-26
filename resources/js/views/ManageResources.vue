<template>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" lg="8">
            <div class="d-flex justify-content-between">
                <p>Resources</p>
                <b-dropdown variant="success" toggle-class="text-decoration-none" no-caret right>
                    <template #button-content>
                        &#x1f50d;<span class="sr-only">Search</span>
                    </template>
                    <b-dropdown-item v-b-modal.create-pdf-resource>PDF Attachment</b-dropdown-item>
                    <b-dropdown-item v-b-modal.create-html-snippet>HTML Snippet</b-dropdown-item>
                    <b-dropdown-item v-b-modal.create-link-resource>Link</b-dropdown-item>
                </b-dropdown>
                <create-pdf-resource/>
            </div>
            <div class="d-flex justify-content-center">
                <browse-resources/>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import {BCol, BDropdown, BDropdownItem, BRow} from "bootstrap-vue";
import CreatePdfResource from "../components/CreatePdfResource";
import BrowseResources from "../components/BrowseResources";

const uiElements = {BDropdown, BRow, BCol, BDropdownItem}
export default {
    name: "ManageResources",
    components: {
        ...uiElements,
        CreatePdfResource,
        BrowseResources
    }
}
</script>

<style scoped>

</style>
