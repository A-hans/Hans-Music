import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false;
//使用ElementUI
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  //增加占位图
  loading:require('./assets/img/占位.png')
})
//在Vue原型中增加一个$bus
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
