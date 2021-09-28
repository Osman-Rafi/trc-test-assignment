<template>
  <div class="mt-5">
    <template v-if="loading">
      <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
    </template>
    <template v-else>
      <div v-for="resource in resources" :key="resource.id" class="position-relative">
        <resources-item :resource="resource"/>
        <template v-if="canManage">
          <b-dropdown class="position-absolute action-button" toggle-class="text-decoration-none action-button"
                      menu-class="z-index-5" variant="outline-warning" no-caret dropleft>
            <template #button-content>
              Action
              <b-icon-chevron-down/>
            </template>
            <b-dropdown-item variant="link" @click="handleModal(resource)">
              Edit
            </b-dropdown-item>
            <b-dropdown-divider/>
          </b-dropdown>
        </template>
      </div>
    </template>
    <template v-if="enableEditPdf">
      <create-pdf-resource :resource="resource" operation="edit" @toggle-modal="handleModal"/>
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
import axios from "axios";
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
  },
  data: function () {
    return {
      loading: false,
      resource: {},
      resources: {},
      enableEditPdf: false
    }
  },
  methods: {
    fetchResources() {
      this.loading = true;
      axios.get('api/fetch-resources')
          .then(res => res.data.resources)
          .then((res) => {
            this.loading = false
            this.resources = res
          })
    },
    handleModal(resource) {
      const id = resource.type === "pdf" ? "create-pdf-resource" : resource.type === "html" ? "create-html-snippet" : "";
      this.resource = resource;
      switch (id) {
        case "create-pdf-resource":
          this.enableEditPdf = !this.enableEditPdf;
          console.log(this.enableEditPdf)
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
    }
  },
  mounted() {
    this.fetchResources();
  }
}
</script>

<style>
.action-button {
  z-index: 1;
  top: 0px;
  right: 1px;
  font-size: 11px;
  color: #1b1e21;
}

.z-index-5 {
  z-index: 5;
}
</style>
