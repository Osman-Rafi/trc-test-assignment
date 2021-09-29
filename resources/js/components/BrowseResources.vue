<template>
    <div class="mt-5" :class="loading &&'d-flex justify-content-center'">
        <template v-if="loading">
            <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
        </template>
        <template v-else>
            <div v-for="resource in allResources" :key="resource.id" class="position-relative">
                <resources-item :resource="resource"/>
                <template v-if="canManage">
                    <b-dropdown class="position-absolute action-button"
                                toggle-class="text-decoration-none action-button"
                                menu-class="z-index-5" variant="outline-warning" no-caret dropleft>
                        <template #button-content>
                            Action
                            <b-icon-chevron-down/>
                        </template>
                        <template v-if="resource.type === 'pdf'">
                            <b-dropdown-item variant="link"
                                             @click="handleModal('create-pdf-resource');getResource(resource)">
                                Edit
                            </b-dropdown-item>
                        </template>
                        <template v-if="resource.type === 'html'">
                            <b-dropdown-item variant="link" @click="handleModal('create-html-snippet')">
                                Edit
                            </b-dropdown-item>
                        </template>
                        <b-dropdown-divider/>
                    </b-dropdown>
                </template>
            </div>
        </template>
        <template v-if="enableEditPdf">
            <create-pdf-resource
                :resource="resource"
                operation="edit"
                @toggle-modal="handleModal"
                @on-change-resource="onChangeResource"
            />
        </template>
        <!--    <create-html-snippet :resource="resource"/>-->
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
import ResourcesItem from "./ResourcesItemPdf";
import CreatePdfResource from "./CreatePdfResource";
import CreateHtmlSnippet from "./CreateHtmlSnippet";

Vue.use(ModalPlugin)

const uiComponents = {
    BSpinner, BButton, BIcon, BIconChevronDown, BDropdown, BDropdownItem, BDropdownDivider, VBModal
}
export default {
    name: "BrowseResources",
    components: {
        CreateHtmlSnippet,
        CreatePdfResource,
        ...uiComponents,
        ResourcesItem
    },
    props: {
        canManage: {type: Boolean, required: true},
        resources: {type: Array, required: true},
        loading: {type: Boolean}
    },
    data: function () {
        return {
            resource: {},
            enableEditPdf: false
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
        },
        getResource(resource) {
            this.resource = resource
        },

        onChangeResource(resource, operation) {
            this.$emit('on-change-resource', resource, operation)
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
