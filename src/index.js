
import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './style.css';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
