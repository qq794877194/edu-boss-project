import request from '@/utils/request';

export const getAllSpaces = () => {
  return request.get('/front/ad/space/getAllSpaces');
};

export const saveOrUpdateSpace = (data: any) => {
  return request.post('/front/ad/space/saveOrUpdate', data);
};

export const getSpaceById = (id: any) => {
  return request.get('/front/ad/space/getSpaceById?id=' + id);
};
