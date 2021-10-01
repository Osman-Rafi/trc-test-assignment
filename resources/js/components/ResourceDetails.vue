<template>
    <div class="position-relative">
        <b-badge class="type-title p-1 font-weight-normal" :class="badgeVariant(resource.type)">
            <template v-if="resource.type === 'html'">HTML Snippet</template>
            <template v-if="resource.type === 'pdf'">PDF Attachment</template>
            <template v-if="resource.type === 'link'">External Link</template>
        </b-badge>
        <b-card no-body class="overflow-hidden mb-3 resource-card-warning">
            <b-row>
                <b-col sm="auto" class="d-flex ml-3 mt-3">
                    <template v-if="resource.type === 'html'">
                        <b-avatar rounded variant="warning" text="</>"></b-avatar>
                    </template>
                    <template v-if="resource.type === 'pdf'">
                        <b-avatar rounded variant="info" icon="file-earmark-text"></b-avatar>
                    </template>
                    <template v-if="resource.type === 'link'">
                        <b-avatar rounded variant="success" icon="link45deg"></b-avatar>
                    </template>
                </b-col>
                <b-col>
                    <b-card-body class="mb-3">
                        <div class="card-title mb-0 mr-3">
                            <h1 class="mb-2 fs-3">{{ resource.title }}</h1>
                        </div>
                        <b-card-text class="fs-4">
                            <template v-if="resource.type==='pdf'">This post contains a downloadable resource. Please
                                hit the download
                                button to download the attachment.
                            </template>
                            <template v-if="resource.type==='html' && !detailsCollapseOpen">
                                {{ description }}
                            </template>
                            <template v-if="resource.type === 'link'">
                                <a class="btn btn-outline-dark btn-sm fs-5" :target="resource.new_tab === 1 && '_blank'"
                                   :href="resource.url">Visit URL
                                </a>
                            </template>
                            <template v-if="resource.type=='html'">
                                <b-collapse id="html-details" class="mt-2">
                                    {{ description }}
                                    <b-card class="mt-3" body-class="position-relative">
                                        <prism-editor :snippet="resource.snippet" :readonly="true"/>
                                        <b-button variant="link" @click="copyCodeToClipBoard"
                                                  class="text-dark position-absolute copy-button" v-b-tooltip.hover
                                                  :title="snippetCopyTooltipTitle">
                                            <b-icon icon="clipboard"></b-icon>
                                        </b-button>
                                    </b-card>
                                </b-collapse>
                            </template>
                            <div v-if="resource.type==='pdf' && resource.file">
                                <b-button variant="link" size="sm" class="mt-2 text-dark"
                                          @click="downloadAttachment(resource.file)">
                                    <b-icon icon="download"></b-icon>
                                </b-button>
                            </div>
                        </b-card-text>
                    </b-card-body>
                </b-col>
                <template v-if="resource.type=='html'">
                    <b-button v-b-toggle.html-details block variant="link"
                              class="text-decoration-none text-secondary" @click="toggleCollapse">
                        {{ detailsCollapseOpen ? 'Show Less' : 'Show More' }}
                    </b-button>
                </template>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import PrismEditor from "./PrismEditor";
import {
    BAvatar,
    BBadge,
    BButton,
    BCard,
    BCardBody,
    BCardText,
    BCol,
    BCollapse,
    BIcon,
    BIconClipboard,
    BIconDownload,
    BIconFileEarmarkText,
    BIconLink45deg,
    BRow,
    BToast,
    CollapsePlugin,
    ToastPlugin,
    VBTooltip,
    VBTooltipPlugin
} from "bootstrap-vue"

Vue.use(CollapsePlugin)
Vue.use(ToastPlugin)
Vue.use(VBTooltipPlugin)
Vue.directive('b-tooltip', VBTooltip)

export default {
    name: "ResourceDetails",
    components: {
        PrismEditor,
        BCard,
        BRow,
        BCol,
        BCardBody,
        BAvatar,
        BCardText,
        BButton,
        BIcon,
        BIconDownload,
        BBadge,
        BIconFileEarmarkText,
        BIconLink45deg,
        BCollapse,
        BToast,
        BIconClipboard
    },
    props: {
        resource: {type: Object, required: true},
    },
    data: function () {
        return {
            detailsCollapseOpen: false,
            snippetCopyTooltipTitle: "Copy to Clipboard"
        }
    },
    methods: {
        downloadAttachment(file) {
            const url = file.slice(6)
            axios({
                url: `/api/download-pdf-resource/${url}`,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        badgeVariant(type) {
            if (type === 'pdf') return 'badge-info';
            else if (type === 'link') return 'badge-dark'
            return "bg-purple";
        },
        toggleCollapse() {
            this.detailsCollapseOpen = !this.detailsCollapseOpen
        },
        async copyCodeToClipBoard() {
            const data = this.resource.snippet;
            let vm = this;
            if (navigator.clipboard !== undefined) {//Chrome
                navigator.clipboard.writeText(data).then(function () {
                    vm.snippetCopyTooltipTitle = "Copied !"
                }, function (err) {
                    console.log(err)
                    this.$bvToast.toast("Error", {
                        title: "Can't copy",
                        toaster: 'b-toaster-bottom-left',
                        solid: true,
                        variant: 'danger',
                    })
                });
            } else if (window.clipboardData) { // Internet Explorer
                window.clipboardData.setData("Text", data);
            }
            
            setTimeout(() => {
                this.snippetCopyTooltipTitle = "Copy to Clipboard";
            }, 2000)
        }
    },
    computed: {
        description() {
            if (this.resource.description.length > 200 && !this.detailsCollapseOpen)
                return this.resource.description.substring(0, 200) + '...';
            return this.resource.description;
        },
    },
}
</script>

<style>
.resource-card-warning {
    background: #fff4d3;
    border: 1px solid #ffe7a0;
}

.fs-3 {
    font-size: 17.6px !important;
}

.fs-4 {
    font-size: 14.8px;
}

.fs-5 {
    font-size: 10px !important;
}

.type-title {
    position: absolute;
    z-index: 10;
    top: -10px;
    left: 8px;
}

.copy-button {
    top: 21px;
    right: 29px;
}

.bg-purple {
    background-color: #f75679 !important;
}
</style>

