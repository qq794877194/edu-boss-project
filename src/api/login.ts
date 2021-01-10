import request from '@/utils/request';
import qs from 'qs';

export const login = (data: {}) => {
  return request.post('/front/user/login', qs.stringify(data));
};
