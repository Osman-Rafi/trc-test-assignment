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
          <template v-if="resource.type === 'link'">External Link</template>
        </b-col>
        <b-col>
          <b-card-body class="mb-3">
            <div class="card-title mb-0">
              <h1 class="mb-2 fs-3">{{ resource.title }}</h1>
            </div>
            <b-card-text class="fs-4">
              <template v-if="resource.type==='pdf'">This post contains a downloadable resource. Please hit the download
                button to download the attachment.
              </template>
              <template v-if="resource.type==='html'">{{ resource.description.substring(0, 200) }}</template>
            </b-card-text>
          </b-card-body>
        </b-col>
        <b-col sm="auto" class="d-flex align-items-center mr-3">
          <template v-if="resource.type==='pdf' && resource.file">
            <b-button variant="outline-secondary" size="sm" @click="downloadAttachment(resource.file)">
              <b-icon icon="download"></b-icon>
            </b-button>
          </template>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {BAvatar, BBadge, BButton, BCard, BCardBody, BCardText, BCol, BIcon, BIconDownload, BRow, BIconFileEarmarkText} from "bootstrap-vue"
import axios from "axios";

export default {
  name: "ResourcesItemPdf",
  components: {BCard, BRow, BCol, BCardBody, BAvatar, BCardText, BButton, BIcon, BIconDownload, BBadge,BIconFileEarmarkText},
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
    }
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

.bg-purple {
  background-color: #f75679 !important;
}
</style>

