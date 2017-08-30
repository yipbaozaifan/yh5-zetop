// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

import {
  Menu,
  Submenu,
  MenuItem,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Upload,
  Button,
  Message,
  MessageBox,
  Dialog,
 } from 'element-ui';

import 'assets/css/reset.css';
import 'assets/css/func.css';
import 'assets/css/layout.css';

import App from './App';
import router from './router';
import store from './store';
import { types } from './store/navigator/navigator';

// axios 默认配置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
axios.interceptors.request.use(function(config){ // eslint-disable-line
  // 在请求发出之前进行一些操作
  if (config.method === 'post' && !(config.data instanceof FormData)) {
    config.data = qs.stringify(config.data);
  }
  return config;
},function(error){ // eslint-disable-line
  return Promise.reject(error);
});

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Dialog);

Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;

const history = window.sessionStorage;

const beforeLoginRedirect = (to) => {
  history.setItem('redirectUrl', to.path);
};

const loginConfirm = (next, to) => {
  Vue.prototype.$messageBox.confirm('请先登录', '提示', {
    type: 'warning',
  }).then(() => {
    beforeLoginRedirect(to);
    window.location.href = '//mdc.meizu.com/login';
  }, () => {
    next(false);
  });
};

router.beforeEach((to, from, next) => {
  const { hasCheckLogin } = store.state.navigator;
  // store.dispatch(types.UPDATE_ACTIVE_INDEX, to.meta.activeIndex);
  // debugger;
  if (to.meta.requiresAuth) {
    if (!hasCheckLogin) { // 防止刷新浏览器时，login还没获取
      store.dispatch(types.FETCH_LOGINSTATE).then(
        () => {
          if (!store.state.navigator.isLogin) {
            loginConfirm(next, to);
          } else next();
        },
        () => {
          if (!store.state.navigator.isLogin) {
            loginConfirm(next, to);
          } else next();
        },
      );
    } else if (hasCheckLogin && !store.state.navigator.isLogin) {
      loginConfirm(next, to);
    } else next();
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
