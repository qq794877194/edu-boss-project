import request from '@/utils/request';

export const getQueryCourses = (query: object) => {
  return request.post('/boss/course/getQueryCourses', query);
};

export const changeCourseState = (query: object) => {
  return request.get('/boss/course/changeState', { params: query });
};

export const saveOrUpdateCourse = (data: object) => {
  return request.post('/boss/course/saveOrUpdateCourse', data);
};

export const uploadCourseImage = (data: object, onUploadProgress?: any) => {
  // 该接口要求的数据类型是 multipart/form-data
  return request.post('/boss/course/upload', data, { onUploadProgress });
};

export const getCourseById = (id: string | number) => {
  return request.get('/boss/course/getCourseById?courseId=' + id);
};

export const getSectionAndLesson = (id: string | number) => {
  return request.get('/boss/course/section/getSectionAndLesson?courseId=' + id);
};

export const saveOrUpdateSection = (data: any) => {
  return request.post('/boss/course/section/saveOrUpdateSection', data);
};

export const saveOrUpdateLesson = (data: any) => {
  return request.post('/boss/course/lesson/saveOrUpdate', data);
};

export const getLessonById = (id: string | number) => {
  return request.get('/boss/course/lesson/getById?lessonId=' + id);
};
