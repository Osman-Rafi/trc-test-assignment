require('./bootstrap');
import router from "./router"

window.Vue = require('vue');
import { IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.use(IconsPlugin)

Vue.component('app-component', require('./components/AppComponent').default);


const app = new Vue({
    el: '#app',
    router
});
