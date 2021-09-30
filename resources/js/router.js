import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component: () => import("./views/Welcome")
    },
    {
        path:'/manage-resources',
        component: () => import("./views/ManageResources")
    },
    {
        path:'/browse-resources',
        component: () => import("./views/BrowseResources")
    },
    {
        path:'*',
        component: () => import("./components/NotFound")
    },

]
export default new VueRouter({
    mode:'history',
    routes
})
