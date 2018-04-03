import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './main.css'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/store'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);
new Vue({
    store,
    render: h => h(App),
    router
}).$mount('#app')
