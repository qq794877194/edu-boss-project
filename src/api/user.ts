import request from '@/utils/request';
import qs from 'qs';

export const getUserInfo = () => {
  return request.get('/front/user/getInfo');
};

export const getUserPages = (data: any) => {
  return request.post('/boss/user/getUserPages', data);
};
