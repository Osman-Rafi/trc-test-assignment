<template>
    <b-modal centered id="create-pdf-resource" title="Create a PDF Downloadable Resource" @ok="handleOk"
             @cancel="resetModal" @close="resetModal"
             button-size="sm"
             cancelTitle="Discard" okTitle="Save Post">
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
                    size="sm"
                    v-model="title"
                    :state="titleState"
                ></b-form-input>
                <b-form-invalid-feedback :state="titleState">This field is required</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="File"
                description="Only PDF is accepted"
            >
                <b-form-file
                    v-model="file"
                    :state="fileState"
                    size="sm"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="application/pdf"
                ></b-form-file>

                <div class="mt-3" v-if="file"><span class="font-italic">Selected file:</span>
                    {{ file ? file.name : '' }}
                </div>
                <b-form-invalid-feedback :state="fileState">This field is required</b-form-invalid-feedback>
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
    BFormInvalidFeedback,
    BModal,
    BSpinner,
    BToast,
    ModalPlugin,
    ToastPlugin
} from "bootstrap-vue";
import axios from "axios";
import {isEmpty} from 'lodash-es';

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

const uiComponents = {BModal, BForm, BFormGroup, BFormInput, BFormFile, BToast, BFormInvalidFeedback, BSpinner}

export default {
    name: "CreateEditPdfResource",
    components: {
        ...uiComponents
    },
    props: {
        resource: {
            type: Object
        },
        operation: {type: String, required: true}
    },
    data: function () {
        return {
            title: "",
            file: null,
            titleState: null,
            fileState: null,
            saving: false
        }
    },
    methods: {
        checkFormValidity() {
            const titleValidity = !!this.title
            const fileValidity = !!this.file
            this.titleState = titleValidity
            this.fileState = fileValidity
            return this.titleState && this.fileState
        },
        resetModal() {
            this.title = ""
            this.file = null
            this.titleState = null
            this.fileState = null
            this.$emit("toggle-modal", "create-pdf-resource")
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.saving = true;
            const formData = new FormData();
            formData.append('title', this.title)
            formData.append('file', this.file)
            formData.append('type', 'pdf')
            if (this.operation === "edit")
                formData.append("_method", "post")

            const url = this.operation === 'edit' ? `api/update-pdf-resource/${this.resource.id}` : 'api/create-pdf-resource';


            axios.post(url, formData)
                .then((res) => {
                    this.$emit('on-change-resource', res.data.resource, this.operation)
                    if (res.status) {
                        this.$nextTick(() => {
                            this.$bvModal.hide('create-pdf-resource')
                        })
                    }
                })
                .then(() => {
                    this.$bvToast.toast('Resources Created Successfully', {
                        title: "Success !!",
                        toaster: 'b-toaster-top-left',
                        solid: true,
                        variant: 'primary'
                    })
                    this.resetModal()
                    this.saving = false
                })
                .catch(error => {
                    const errors = error.response.data.errors;
                    for (let key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            const message = errors[key];
                            this.$bvToast.toast(message, {
                                title: "Your input is not valid",
                                toaster: 'b-toaster-bottom-left',
                                solid: true,
                                variant: 'danger',
                                autoHideDelay: 15000,
                            })
                        }
                    }
                    this.$bvToast.toast('Something went wrong!', {
                        title: "Opss..",
                        toaster: 'b-toaster-bottom-left',
                        solid: true,
                        variant: 'danger'
                    })
                    this.saving = false
                })

            this.titleState = null
            this.fileState = null
        },
    },
    created() {
        this.$nextTick(() => {
            if (!isEmpty(this.resource)) {
                this.title = this.resource.title
            }
        })
    }
}
</script>
