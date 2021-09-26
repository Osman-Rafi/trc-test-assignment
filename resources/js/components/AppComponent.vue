<template>
    <b-container fluid>
        <router-view/>
    </b-container>
</template>

<script>
import {BContainer} from "bootstrap-vue";

export default {
    name: "AppComponent",
    components: {
        BContainer
    }
}
</script>
