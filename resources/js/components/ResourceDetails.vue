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
                                   :href="resource.url">Visit URL</a>
                            </template>
                            <template v-if="resource.type=='html'">
                                <b-collapse id="html-details" class="mt-2">
                                    {{ description }}
                                    <b-card class="mt-3">
                                        <prism-editor :snippet="resource.snippet" :readonly="true"/>
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
                              class="text-decoration-none text-secondary" @click="toggleCollapse">Show
                        More
                    </b-button>
                </template>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import Vue from "vue";
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
    BIconDownload,
    BIconFileEarmarkText,
    BIconLink45deg,
    BRow,
    CollapsePlugin
} from "bootstrap-vue"
import axios from "axios";
import PrismEditor from "./PrismEditor";

Vue.use(CollapsePlugin)
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
        BCollapse
    },
    props: {
        resource: {type: Object, required: true},
    },
    methods: {
        downloadAttachment(file) {
            axios({
                url: 'http://localhost:8000/files/owwhz8JkFjyTuE4SNMytTKjXbVWLLIkaPnaSUF9b.pdf',
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
        }
    },
    data: function () {
        return {
            detailsCollapseOpen: false
        }
    },

    computed: {
        description() {
            if (this.resource.description.length > 200 && !this.detailsCollapseOpen)
                return this.resource.description.substring(0, 200) + '...';
            return this.resource.description;
        }
    }
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

.bg-purple {
    background-color: #f75679 !important;
}
</style>

