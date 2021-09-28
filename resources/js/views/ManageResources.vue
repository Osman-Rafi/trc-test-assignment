<template>
    <b-row class="justify-content-center mt-5">
        <b-col sm="12" lg="8">
            <b-card body-class="d-flex justify-content-between align-items-between">
                <h4>Create Resources</h4>
                <b-dropdown variant="link" toggle-class="text-decoration-none m-0" no-caret right>
                    <template #button-content>
                        <b-icon icon="plus-circle" variant="dark" font-scale="2"/>
                    </template>
                    <b-dropdown-item @click="handleModal('create-pdf-resource')">
                        <b-icon icon="file-earmark-medical" variant="dark"/>
                        <span class="ml-1">PDF Attachment</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="handleModal('create-html-snippet')">
                        <b-icon icon="code-slash" variant="dark"/>
                        <span class="ml-1">HTML Snippet</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal.create-link-resource>
                        <b-icon icon="link45deg" variant="dark"/>
                        <span class="ml-1">Link</span>
                    </b-dropdown-item>
                </b-dropdown>
                <template v-if="enableCreatePdf">
                    <create-pdf-resource @toggle-modal="handleModal"/>
                </template>
                <template v-if="enableCreateHtmlSnippet">
                    <create-html-snippet @toggle-modal="handleModal"/>
                </template>
            </b-card>
            <div>
                <browse-resources :can-manage="true"/>
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
import CreateHtmlSnippet from "../components/CreateHtmlSnippet";

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
        CreateHtmlSnippet,
        ...uiElements,
        CreatePdfResource,
        BrowseResources
    },
    data: function () {
        return {
            enableCreatePdf: false,
            enableCreateHtmlSnippet: false
        }
    },
    methods: {
        handleModal(id) {
            switch (id) {
                case "create-pdf-resource":
                    this.enableCreatePdf = !this.enableCreatePdf;
                    this.toggleModal("create-pdf-resource", this.enableCreatePdf)
                    break;
                case "create-html-snippet":
                    this.enableCreateHtmlSnippet = !this.enableCreateHtmlSnippet;
                    this.toggleModal("create-html-snippet", this.enableCreateHtmlSnippet)
                    break;
            }
        },

        toggleModal(id, state) {
            if (state) {
                this.$nextTick(() => {
                    this.$bvModal.show(id)
                })
            } else {
                this.$nextTick(() => {
                    this.$bvModal.hide(id)
                })
            }
        }
    }
}
</script>

<style>
.btn:focus {
    box-shadow: none !important;
}
</style>
