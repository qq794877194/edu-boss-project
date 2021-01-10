import request from '@/utils/request';

export const createOrUpdateMenu = (data: {}) => {
  return request.post('/boss/menu/saveOrUpdate', data);
};

export const getEditMenuInfo = (id: string | number = -1) => {
  return request.get('/boss/menu/getEditMenuInfo', { params: { id } });
};

export const getAllMenu = () => {
  return request.get('/boss/menu/getAll');
};

export const deleteMenu = (id: number) => {
  return request.delete('/boss/menu/' + id);
};

export const genMenuNodeList = () => {
  return request.get('/boss/menu/getMenuNodeList');
};

export const allocateRoleMenus = (data: any) => {
  return request.post('/boss/menu/allocateRoleMenus', data);
};

export const getRoleMenus = (roleId: number | string) => {
  return request.get('/boss/menu/getRoleMenus?roleId=' + roleId);
};
