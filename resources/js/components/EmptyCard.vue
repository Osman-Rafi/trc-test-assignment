<template>
    <b-card class="text-center mb-5">
        <b-card-text class="my-3 text-black-20">
            <div class="mb-2">
                <BIconExclamationCircle font-scale="6.5"/>
            </div>
            <h2>No Resources Available</h2>
        </b-card-text>
    </b-card>
</template>

<script>
import {BCard, BCardText} from "bootstrap-vue";

export default {
    name: "EmptyCard",
    components: {
        BCard, BCardText
    }
}
</script>

<style scoped>
.text-black-20 {
    color: rgba(0, 0, 0, 0.3) !important;
}
</style>
