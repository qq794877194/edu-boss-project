import request from '@/utils/request';

export const getResourcePages = (data: any) => {
  return request.post('/boss/resource/getResourcePages', data);
};

export const getResourceTags = () => {
  return request.get('/boss/resource/category/getAll');
};

export const getAllResource = () => {
  return request.get('/boss/resource/getAll');
};

export const getRoleResources = (roleId: any) => {
  return request.get('/boss/resource/getRoleResources?roleId=' + roleId);
};

export const allocateRoleResources = (data: any) => {
  return request.post('/boss/resource/allocateRoleResources', data);
};

export const saveOrUpdateResources = (data: any) => {
  return request.post('/boss/resource/saveOrUpdate', data);
};

export const deleteResource = (id: any) => {
  return request.delete('/boss/resource/' + id);
};

export const saveOrUpdateCategory = (data: any) => {
  return request.post('/boss/resource/category/saveOrderUpdate', data);
};

export const deleteCategory = (id: any) => {
  return request.delete('/boss/resource/category/' + id);
};
