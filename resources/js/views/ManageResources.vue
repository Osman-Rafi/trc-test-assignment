<template>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" lg="8">
            <b-card body-class="d-flex justify-content-between align-items-between">
                <h4>Create Resources</h4>
                <b-dropdown variant="link" toggle-class="text-decoration-none m-0" no-caret right>
                    <template #button-content>
                        <b-icon icon="plus-circle" variant="dark" font-scale="2"/>
                    </template>
                    <b-dropdown-item v-b-modal.create-pdf-resource>
                        <b-icon icon="file-earmark-medical" variant="dark"/>
                        <span class="ml-1">PDF Attachment</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal.create-html-snippet>
                        <b-icon icon="code-slash" variant="dark"/>
                        <span class="ml-1">HTML Snippet</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal.create-link-resource>
                        <b-icon icon="link45deg" variant="dark"/>
                        <span class="ml-1">Link</span>
                    </b-dropdown-item>
                </b-dropdown>
                <create-pdf-resource/>
            </b-card>
            <div>
                <browse-resources/>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import {
    BCard,
    BCol,
    BDropdown,
    BDropdownItem,
    BIcon,
    BIconCodeSlash,
    BIconFileEarmarkMedical,
    BIconLink45deg,
    BIconPlusCircle,
    BRow
} from "bootstrap-vue";
import CreatePdfResource from "../components/CreatePdfResource";
import BrowseResources from "../components/BrowseResources";

const uiElements = {
    BDropdown,
    BRow,
    BCol,
    BDropdownItem,
    BIcon,
    BIconPlusCircle,
    BIconCodeSlash,
    BIconFileEarmarkMedical,
    BIconLink45deg,
    BCard
}
export default {
    name: "ManageResources",
    components: {
        ...uiElements,
        CreatePdfResource,
        BrowseResources
    }
}
</script>

<style>
.btn:focus {
    box-shadow: none !important;
}
</style>
