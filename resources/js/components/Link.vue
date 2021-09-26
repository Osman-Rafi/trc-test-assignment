<template>
    <router-link :to="path">
        <b-button :variant="variant" :size="size">{{ label }}</b-button>
    </router-link>
</template>

<script>
import {BButton} from "bootstrap-vue"

export default {
    name: "Link",
    components: {
        BButton
    },
    props: {
        label: {type: String, required: true},
        path: {type: String, required: true},
        variant: {type: String, default: "secondary"},
        size:{type:String,default: ''}
    }
}
</script>

<style scoped>

</style>
