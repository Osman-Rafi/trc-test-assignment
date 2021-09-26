import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component: () => import("./views/Welcome")
    },
    {
        path:'/browse-resources',
        component: () => import("./components/BrowseResources")
    },
    {
        path:'/manage-resources',
        component: () => import("./views/ManageResources")
    },

]
export default new VueRouter({
    mode:'history',
    routes
})
