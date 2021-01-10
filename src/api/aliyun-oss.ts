import request from '@/utils/request';

export const aliyunImagUploadAddressAdnAuth = () => {
  return request.get('/boss/course/upload/aliyunImagUploadAddressAdnAuth.json');
};

export const aliyunVideoUploadAddressAdnAuth = (fileName: any, imageUrl: any) => {
  return request.get('/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json', { params: { fileName, imageUrl } });
};

export const aliyunTransCode = (data: any) => {
  return request.post('/boss/course/upload/aliyunTransCode.json', data);
};

export const aliyunTransCodePercent = (lessonId: any) => {
  return request.get('/boss/course/upload/aliyunTransCodePercent.json?lessonId=' + lessonId);
};
