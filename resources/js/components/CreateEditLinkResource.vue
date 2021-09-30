<template>
    <b-modal centered id="create-link-resource" title="Create a External Link Resource" @ok="handleOk"
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
                label="Title"
                label-for="title"
            >
                <b-form-input
                    id="title"
                    type="text"
                    placeholder="i.e. Why Vue is awesome !"
                    required
                    size="sm"
                    v-model="formData.title"
                    :state="titleState"
                ></b-form-input>
                <b-form-invalid-feedback :state="titleState">This field is required</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="URL"
                label-for="url"
            >
                <b-form-input
                    id="url"
                    type="url"
                    placeholder=""
                    required
                    size="sm"
                    v-model="formData.url"
                    :state="urlState"
                ></b-form-input>
                <b-form-invalid-feedback :state="urlState">This field is required</b-form-invalid-feedback>
            </b-form-group>
            <b-form-checkbox
                :value="1"
                :unchecked-value="0"
                v-model="formData.newTab"
            >
                Open in a new tab
            </b-form-checkbox>
        </b-form>
    </b-modal>
</template>

<script>
import Vue from "vue";
import {BForm, BFormCheckbox, BFormGroup, BFormInput, BModal, BToast, ModalPlugin, ToastPlugin,BFormInvalidFeedback,BSpinner} from "bootstrap-vue";
import axios from "axios";
import {isEmpty} from 'lodash-es';

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

const uiComponents = {BModal, BForm, BFormGroup, BFormInput, BToast, BFormCheckbox,BFormInvalidFeedback,BSpinner}

export default {
    name: "CreateEditLinkResource",
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
            formData: {
                title: "",
                url: "",
                newTab: 1,
                type: "link"
            },
            titleState: null,
            urlState: null,
            saving: false
        }
    },
    methods: {
        checkFormValidity() {
            const titleValidity = !!this.formData.title
            const urlValidity = !!this.formData.url
            this.titleState = titleValidity
            this.urlState = urlValidity
            return this.titleState && this.urlState
        },
        resetModal() {
            this.formData = {
                title: "",
                url: "",
                newTab: false,
                type: "link"
            }
            this.titleState = null
            this.urlState = null
            this.$emit("toggle-modal", "create-link-resource")
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            this.saving = true;
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }

            const method = this.operation === "create" ? 'post' : 'put';
            const url = method === 'post' ? 'api/create-link-resource' : `api/update-link-resource/${this.formData.id}`;

            axios({
                method: method,
                url: url,
                data: this.formData
            })
                .then((res) => {
                    this.$emit('on-change-resource', res.data.resource, this.operation)
                    if (res.status) {
                        this.$nextTick(() => {
                            this.$bvModal.hide('create-link-resource')
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
                    this.saving = false
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
                    this.saving = false
                })

            this.titleState = null
            this.fileState = null
        },
    },
    created() {
        this.$nextTick(() => {
            if (!isEmpty(this.resource)) {
                this.formData = {...this.resource}
                this.formData.newTab = this.resource.new_tab
            }
        })
    }
}
</script>

<style scoped>

</style>
