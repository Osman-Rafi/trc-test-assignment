<template>
    <div class="banner-container">
        <div class="banner-admin text-center h-100 text-white">
            <div class="banner-text">
                <h2 class="banner-title">
                    <template v-if="!title">
                        <span class="font-weight-bold">The Remote Company</span>
                        Test Assignment
                    </template>
                    <template>
                        {{ title }}
                    </template>
                </h2>
                <p class="banner-sub">{{ bannerSub }}</p>
                <div>
                    <b-badge class="p-1" variant="info">{{loggedInAs}}</b-badge>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {BBadge} from "bootstrap-vue"

export default {
    name: "Banner",
    props: {
        title: {type: String},
        bannerSub: {type: String},
        loggedInAs: {type:String}
    },
    components: {BBadge}
}
</script>

<style lang="scss">
.banner-container {
    height: 50vh !important;
}

.banner-admin {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.ibb.co/2k4KLrz/TzAt08.jpg");
    height: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);;
}

@media (min-width: 992px) {
    .banner-title {
        font-size: 50px !important;
    }

    .banner-sub {
        font-size: 22px !important;
    }
}

.banner-title {
    font-size: 22px;
}

.banner-sub {
    font-size: 14px;
}
</style>
