import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import router from '@/router';
import qs from 'qs';

const request = axios.create({

});

request.interceptors.request.use(config => {
  const { user } = store.state;
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});
let isRefreshing = false; // 控制刷新token的状态
let failRequests: any[] = []; // 刷新token期间过来的401请求
request.interceptors.response.use(res => {
  return res;
}, async err => {
  if (err.response) {
    const { status } = err.response;
    if (status === 400) {
      Message.error('请求参数错误');
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin();
        return Promise.reject(err);
      }
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败');
          }
          store.commit('setUser', res.data.content);
          // 重新发送刷新token期间失败的请求
          failRequests.forEach(cb => cb());
          // 重置失败请求数组
          failRequests = [];
          // 重新请求，然后返回数据
          return request(err.config);
        }).catch(err => {
          // 刷新token失败，需要把当前登录用户状态清除
          store.commit('setUser', null);
          redirectLogin();
          return Promise.reject(err);
        }).finally(() => isRefreshing = false);
      }
      // 刷新状态下，把请求挂起放到failRequests数组中
      return new Promise(resolve => {
        failRequests.push(() => {
          resolve(request(err.config));
        });
      });
    } else if (status === 403) {
      Message.error('没有权限,请联系管理员');
    } else if (status === 404) {
      Message.error('请求资源不存在');
    } else if (status >= 500) {
      Message.error('服务端错误,请联系管理员');
    }
  } else if (err.request) {
    Message.error('请求超时，请刷新重试');
  } else {
    Message.error('请求失败: ' + err.message);
  }
  return Promise.reject(err);
});

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}
function refreshToken () {
  return axios.post('/front/user/refresh_token', qs.stringify({
    refreshtoken: store.state.user.refresh_token
  }));
}
export default request;
