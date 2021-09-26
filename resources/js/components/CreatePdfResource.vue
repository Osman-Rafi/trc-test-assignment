<template>
    <b-modal centered id="create-pdf-resource" title="Create a PDF Downloadable Resource" @ok="handleOk"
             @cancel="resetModal"
             button-size="sm"
             cancelTitle="Discard" okTitle="Save Post">
        <b-form ref="form" enctype="multipart/form-data">
            <b-form-group
                id="input-group-1"
                label="Title"
                label-for="title"
            >
                <b-form-input
                    id="title"
                    type="email"
                    placeholder="i.e. Why Vue is awesome !"
                    required
                    v-model="title"
                    :state="titleState"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="File">
                <b-form-file
                    v-model="file"
                    :state="fileState"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3" v-if="file"><span class="font-italic">Selected file:</span>
                    {{ file ? file.name : '' }}
                </div>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
import Vue from "vue";
import {BForm, BFormFile, BFormGroup, BFormInput, BModal, BToast, ModalPlugin, ToastPlugin} from "bootstrap-vue";
import axios from "axios";

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

const uiComponents = {BModal, BForm, BFormGroup, BFormInput, BFormFile, BToast}

export default {
    name: "CreatePdfResource",
    components: {
        ...uiComponents
    },
    data: function () {
        return {
            title: "",
            file: null,
            titleState: null,
            fileState: null
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
            this.title = ''
            this.file = null
            this.titleState = null
            this.fileState = null
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
            const formData = new FormData();
            formData.append('title', this.title)
            formData.append('file', this.file)
            formData.append('type', 'pdf')

            axios.post('api/create-pdf-resource', formData)
                .then((res) => {
                    if (res.status === 201) {
                        this.$nextTick(() => {
                            this.$bvModal.hide('create-pdf-resource')
                        })
                    }
                })
                .then(() => {
                    this.$bvToast.toast('Resources Created Successfully', {
                        title: "Success !!",
                        toaster: 'b-toaster-bottom-left',
                        solid: true,
                        variant: 'success'
                    })
                })
                .then(() => {
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
                })

            this.titleState = null
            this.fileState = null
        }
    },
}
</script>
