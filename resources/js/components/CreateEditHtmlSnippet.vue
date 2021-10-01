<template>
    <b-modal centered id="create-html-snippet" title="Create a HTML Code Snippet" @ok="handleOk"
             @cancel="resetModal" @close="resetModal"
             button-size="sm" size="lg"
             cancelTitle="Discard">
        <template #modal-ok>
            <template v-if="saving">
                <b-spinner small label="Loading..."></b-spinner>
                Saving
            </template>
            <template v-else>Save</template>
        </template>
        <b-form ref="form" enctype="multipart/form-data">
            <b-form-group
                id="input-group-1"
                label="Title"
                label-for="title"
            >
                <b-form-input
                    id="title"
                    type="text"
                    placeholder="i.e. Why Vue is awesome !"
                    required
                    v-model="formData.title"
                    :state="titleState"
                    size="sm"
                ></b-form-input>
                <b-form-invalid-feedback :state="titleState">This field is required</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="Description">
                <b-form-textarea
                    id="textarea"
                    v-model="formData.description"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="8"
                    :state="descriptionState"
                    required
                ></b-form-textarea>
                <b-form-invalid-feedback :state="descriptionState">This field is required</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Paste Code snippet bellow">
                <PrismEditor :snippet="formData.snippet" @onChange="handlePrismChange"/>
                <p v-if="snippetState === false" class="text-danger fs-5 font-weight-bold">Code snippet is required</p>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
import Vue from "vue";
import {
    BForm,
    BFormFile,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BModal,
    BSpinner,
    BToast,
    BFormInvalidFeedback,
    ModalPlugin,
    ToastPlugin
} from "bootstrap-vue";
import PrismEditor from "./PrismEditor";
import {isEmpty} from "lodash-es";

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

const uiComponents = {BModal, BForm, BFormGroup, BFormInput, BFormFile, BToast, BFormTextarea, BSpinner,BFormInvalidFeedback}

export default {
    name: "CreateEditHtmlSnippet",
    components: {
        ...uiComponents,
        PrismEditor
    },
    props: {
        resource: {
            type: Object
        },
        operation: {type: String, required: true}
    },
    data: function () {
        return {
            formData: {
                type: "html",
                title: "",
                description: "",
                snippet: "",
            },
            titleState: null,
            descriptionState: null,
            snippetState: null,
            saving: false,
        }
    },
    methods: {
        checkFormValidity() {
            const titleValidity = !!this.formData.title
            const descriptionValidity = !!this.formData.description
            const snippetValidity = !!this.formData.snippet
            this.titleState = titleValidity
            this.descriptionState = descriptionValidity
            this.snippetState = snippetValidity
            return this.titleState && this.descriptionState && this.snippetState
        },
        resetModal() {
            this.formData.title = ""
            this.formData.description = ""
            this.formData.snippet = ""
            this.titleState = null
            this.descriptionState = null
            this.snippetState = null
            this.$emit("toggle-modal", "create-html-snippet")

        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handlePrismChange(val) {
            this.formData.snippet = val;
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.saving = true;

            const method = this.operation === "create" ? 'post' : 'put';
            const url = method === 'post' ? 'api/create-html-snippet' : `api/update-html-snippet/${this.formData.id}`;

            axios({
                method: method,
                url: url,
                data: this.formData
            })
                .then((res) => {
                    this.$emit('on-change-resource', res.data.resource, this.operation)
                    if (res.status) {
                        this.$nextTick(() => {
                            this.$bvModal.hide('create-html-snippet')
                        })
                    }
                })
                .then(() => {
                    this.saving = false;
                    this.resetModal()
                })
                .catch(error => {
                    this.$bvToast.toast('Something went wrong!', {
                        title: "Opss..",
                        toaster: 'b-toaster-bottom-left',
                        solid: true,
                        variant: 'danger'
                    })
                    console.error(error)
                    this.saving = false;
                })

            this.titleState = null
            this.descriptionState = null
            this.snippetState = null
        }
    },
    created() {
        this.$nextTick(() => {
            if (!isEmpty(this.resource)) {
                this.formData = {...this.resource}
            }
        })
    }
}
</script>
