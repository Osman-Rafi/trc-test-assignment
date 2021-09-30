<template>
    <div>
        <Banner banner-sub="Manage & Browse resources from here !"/>
        <b-container>
            <b-row class="justify-content-center mt-5">
                <b-col sm="12" lg="10">
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
                            <b-dropdown-item @click="handleModal('create-link-resource')">
                                <b-icon icon="link45deg" variant="dark"/>
                                <span class="ml-1">Link</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-card>
                    <template v-if="enableCreatePdf">
                        <create-pdf-resource
                            operation="create"
                            @toggle-modal="handleModal"
                            @on-change-resource="onChangeResource"
                        />
                    </template>
                    <template v-if="enableCreateHtmlSnippet">
                        <create-html-snippet
                            operation="create"
                            @toggle-modal="handleModal"
                            @on-change-resource="onChangeResource"
                        />
                    </template>
                    <template v-if="enableCreateLink">
                        <create-edit-link-resource
                            operation="create"
                            @toggle-modal="handleModal"
                            @on-change-resource="onChangeResource"
                        />
                    </template>
                    <div>
                        <Resources
                            :resources="resources"
                            :can-manage="true"
                            :loading="loading"
                            @on-change-resource="onChangeResource"
                        />
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {
    BCard,
    BCol,
    BContainer,
    BDropdown,
    BDropdownItem,
    BIcon,
    BIconCodeSlash,
    BIconFileEarmarkMedical,
    BIconLink45deg,
    BIconPlusCircle,
    BImg,
    BRow
} from "bootstrap-vue";
import CreatePdfResource from "../components/CreateEditPdfResource";
import Resources from "../components/Resources";
import CreateHtmlSnippet from "../components/CreateEditHtmlSnippet";
import axios from "axios";
import CreateEditLinkResource from "../components/CreateEditLinkResource";
import Banner from "../components/Banner";

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
    BCard,
    BContainer, BImg
}
export default {
    name: "ManageResources",
    components: {
        CreateEditLinkResource,
        CreateHtmlSnippet,
        ...uiElements,
        CreatePdfResource,
        Resources,
        Banner
    },
    data: function () {
        return {
            enableCreatePdf: false,
            enableCreateHtmlSnippet: false,
            enableCreateLink: false,
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
                case "create-link-resource":
                    this.enableCreateLink = !this.enableCreateLink;
                    this.toggleModal("create-link-resource", this.enableCreateLink)
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
        },

        onChangeResource(resource, operation) {
            let vm = this;
            const index = this.resources.findIndex(i => i.id === resource.id);

            if (operation === "create")
                this.resources.unshift(resource)
            else if (operation === "edit") {
                vm.resources.splice(index, 1, resource)
            } else if (operation === "delete") {
                vm.resources.splice(index, 1)
            }
        }
    },
    mounted() {
        this.fetchResources()
    }
}
</script>

<style lang="scss">
.btn:focus {
    box-shadow: none !important;
}

</style>
