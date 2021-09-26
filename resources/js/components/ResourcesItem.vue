<template>
    <b-card no-body class="overflow-hidden mb-3">
        <b-row no-gutters>
            <b-col sm="auto" class="d-flex ml-3 mt-3">
                <b-avatar rounded variant="warning" text="</>"></b-avatar>
            </b-col>
            <b-col>
                <b-card-body title="Horizontal Card">
                    <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import {BAvatar, BCard, BCardBody, BCol, BRow} from "bootstrap-vue"

export default {
    name: "ResourcesItem",
    components: {BCard, BRow, BCol, BCardBody, BAvatar},
}
</script>

<style scoped>

</style>
