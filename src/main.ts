import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import { delConfirm, formatDate } from '@/utils/utils';

// 加载全局样式
import './styles/index.scss';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$delConfirm = delConfirm;
Vue.prototype.$formatDate = formatDate;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
