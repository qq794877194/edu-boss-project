import request from '@/utils/request';

export const getRolePages = (query: object) => {
  return request.post('/boss/role/getRolePages', query);
};

export const deleteRole = (id: number) => {
  return request.delete('/boss/role/' + id);
};

export const createOrUpdateRole = (data: any) => {
  return request.post('/boss/role/saveOrUpdate', data);
};

export const getRoleById = (id: number | string) => {
  return request.get('/boss/role/' + id);
};

export const getAllRole = () => {
  return request.get('/boss/role/all');
};

export const allocateUserRoles = (data: any) => {
  return request.post('/boss/role/allocateUserRoles', data);
};

export const getUserRoles = (userId: number | string | null) => {
  return request.get('/boss/role/user/' + userId);
};
