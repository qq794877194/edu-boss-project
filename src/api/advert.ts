import request from '@/utils/request';

export const getAllAdvert = () => {
  return request.get('/front/ad/getAdList');
};

export const saveOrUpdateAdvert = (data: any) => {
  return request.post('/front/ad/saveOrUpdate', data);
};

export const getAdById = (id: any) => {
  return request.get('/front/ad/getAdById?id=' + id);
};
