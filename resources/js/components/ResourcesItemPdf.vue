<template>
  <b-card no-body class="overflow-hidden mb-3 resource-card-warning">
    <b-row>
      <b-col sm="auto" class="d-flex ml-3 mt-3">
        <b-avatar rounded variant="warning" text="</>"></b-avatar>
      </b-col>
      <b-col>
        <b-card-body class="mb-3">
          <div class="card-title mb-0">
            <h4 class="mb-2">{{ resource.title }}</h4>
          </div>
          <b-card-text class="fs-5">
            This post contains a downloadable resource. Please hit the download button to download the attachment.
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col sm="2" class="d-flex align-items-center">
        <b-button variant="outline-secondary" size="sm" @click="downloadAttachment(resource.file)">
          <b-icon icon="download"></b-icon>
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {BAvatar, BButton, BCard, BCardBody, BCardText, BCol, BIcon, BIconDownload, BRow,} from "bootstrap-vue"
import axios from "axios";

export default {
  name: "ResourcesItemPdf",
  components: {BCard, BRow, BCol, BCardBody, BAvatar, BCardText, BButton, BIcon, BIconDownload},
  props: {
    resource: {type: Object, required: true},
  },
  methods: {
    downloadAttachment(file) {
      axios({
        url: 'http://localhost:8000/storage/app/public/files/owwhz8JkFjyTuE4SNMytTKjXbVWLLIkaPnaSUF9b.pdf',
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
    }
  }
}
</script>

<style>
.resource-card-warning {
  background: #fff4d3;
  border: 1px solid #ffe7a0;
}

.fs-5 {
  font-size: 10px !important;
}
</style>

