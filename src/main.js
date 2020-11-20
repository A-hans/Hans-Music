import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//使用ElementUI
Vue.use(ElementUI);
//在Vue原型中增加一个$bus
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
