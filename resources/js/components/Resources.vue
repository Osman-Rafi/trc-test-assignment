<template>
    <div class="mt-3" :class="loading &&'d-flex justify-content-center'">
        <template v-if="loading">
            <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
        </template>
        <template v-else>
            <empty-card v-if="resources.length === 0"/>
            <div v-for="resource in allResources" :key="resource.id" class="position-relative">
                <resource-details :resource="resource"/>
                <template v-if="canManage">
                    <b-dropdown class="position-absolute action-button"
                                toggle-class="text-decoration-none action-button" menu-class="z-index-5"
                                variant="outline-warning" no-caret dropleft>
                        <template #button-content>
                            Action
                            <b-icon-chevron-down/>
                        </template>
                        <template v-if="resource.type === 'pdf'">
                            <b-dropdown-item
                                variant="link"
                                @click="handleModal('create-pdf-resource');getResource(resource)">
                                Edit
                            </b-dropdown-item>
                        </template>
                        <template v-if="resource.type === 'html'">
                            <b-dropdown-item
                                variant="link"
                                @click="handleModal('create-html-snippet');getResource(resource)">
                                Edit
                            </b-dropdown-item>
                        </template>
                        <template v-if="resource.type === 'link'">
                            <b-dropdown-item
                                variant="link"
                                @click="handleModal('create-link-resource');getResource(resource)">
                                Edit
                            </b-dropdown-item>
                        </template>
                        <b-dropdown-divider/>
                        <b-dropdown-item variant="danger" v-b-modal.delete-resource @click="setDelete(resource)">
                            Delete
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
            </div>
            <b-modal centered id="delete-resource" title="Delete Resource" ok-variant="danger" ok-title="Delete"
                     button-size="sm" @ok="handDelete">
                <p class="my-4">Are you sure to delete this resource ? </p>
            </b-modal>
        </template>
        <template v-if="enableEditPdf">
            <create-pdf-resource
                :resource="resource"
                operation="edit"
                @toggle-modal="handleModal"
                @on-change-resource="onChangeResource"
            />
        </template>
        <template v-if="enableEditHtmlSnippet">
            <create-html-snippet
                :resource="resource"
                operation="edit"
                @toggle-modal="handleModal"
                @on-change-resource="onChangeResource"
            />
        </template>
        <template v-if="enableEditLink">
            <create-edit-link-resource
                :resource="resource"
                operation="edit"
                @toggle-modal="handleModal"
                @on-change-resource="onChangeResource"
            />
        </template>
    </div>
</template>

<script>
import Vue from "vue";
import {
    BButton,
    BDropdown,
    BDropdownDivider,
    BDropdownItem,
    BIcon,
    BIconChevronDown,
    BSpinner,
    ModalPlugin,
    VBModal
} from "bootstrap-vue";
import ResourceDetails from "./ResourceDetails";
import CreatePdfResource from "./CreatePdfResource";
import CreateHtmlSnippet from "./CreateHtmlSnippet";
import CreateEditLinkResource from "./CreateEditLinkResource";
import EmptyCard from "./EmptyCard";

Vue.use(ModalPlugin)

const uiComponents = {
    BSpinner, BButton, BIcon, BIconChevronDown, BDropdown, BDropdownItem, BDropdownDivider, VBModal
}
export default {
    name: "BrowseResources",
    components: {
        CreateEditLinkResource,
        ResourceDetails,
        CreateHtmlSnippet,
        CreatePdfResource,
        ...uiComponents,
        EmptyCard
    },
    props: {
        canManage: {type: Boolean, required: true},
        resources: {type: Array, required: true},
        loading: {type: Boolean}
    },
    data: function () {
        return {
            resource: {},
            enableEditPdf: false,
            enableEditHtmlSnippet: false,
            enableEditLink: false,
        }
    },
    computed: {
        allResources: function () {
            return [...this.resources]
        }
    },
    methods: {
        handleModal(id) {
            switch (id) {
                case "create-pdf-resource":
                    this.enableEditPdf = !this.enableEditPdf;
                    this.toggleModal("create-pdf-resource", this.enableEditPdf)
                    break;
                case "create-html-snippet":
                    this.enableEditHtmlSnippet = !this.enableEditHtmlSnippet;
                    this.toggleModal("create-html-snippet", this.enableEditHtmlSnippet)
                    break;
                case "create-link-resource":
                    this.enableEditLink = !this.enableEditLink;
                    this.toggleModal("create-link-resource", this.enableEditLink)
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
        getResource(resource) {
            this.resource = resource
        },

        onChangeResource(resource, operation) {
            this.$emit('on-change-resource', resource, operation)
        },
        setDelete(resource) {
            this.resource = resource;
        },
        handDelete() {
            const resource = this.resource;
            axios.delete(`api/delete-resource/${resource.id}`)
                .then(() => {
                    this.$emit('on-change-resource', resource, 'delete')
                })
                .then(() => {
                    this.$bvToast.toast('Resource deleted successfully', {
                        title: "Deleted",
                        toaster: 'b-toaster-bottom-left',
                        solid: true,
                        variant: 'danger'
                    })
                })
        }
    }
}
</script>

<style>
.action-button {
    z-index: 1;
    top: 0;
    right: 1px;
    font-size: 11px;
    color: #1b1e21;
}

.z-index-5 {
    z-index: 5;
}
</style>
