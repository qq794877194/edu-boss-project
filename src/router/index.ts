import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '../layout/index.vue';
import store from '@/store';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/login.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        name: 'home',
        path: '',
        // 默认就是一个空对象
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/home.vue')
      },
      {
        name: 'advert',
        path: '/advert',
        meta: {
          routes: [
            { path: '/advert', name: '广告列表' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/advert.vue')
      },
      {
        name: 'advert-add',
        path: '/advert-add',
        meta: {
          routes: [
            { path: '/advert', name: '广告列表' },
            { name: '添加广告' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert-add' */ '@/views/advert/advert-add.vue')
      },
      {
        name: 'advert-edit',
        path: '/advert-edit/:advertId',
        meta: {
          routes: [
            { path: '/advert', name: '广告列表' },
            { name: '编辑广告' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert-edit' */ '@/views/advert/advert-edit.vue'),
        props: true
      },
      {
        name: 'advert-space',
        path: '/advert-space',
        meta: {
          routes: [
            { path: '/advert-space', name: '广告位列表' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/advert-space.vue')
      },
      {
        name: 'advert-space-add',
        path: '/advert-space-add',
        meta: {
          routes: [
            { path: '/advert-space', name: '广告位列表' },
            { name: '添加广告位' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert-space-add' */ '@/views/advert-space/advert-space-add.vue')
      },
      {
        name: 'advert-space-edit',
        path: '/advert-space-edit/:spaceId',
        meta: {
          routes: [
            { path: '/advert-space', name: '广告位列表' },
            { name: '编辑广告位' }
          ]
        },
        component: () => import(/* webpackChunkName: 'advert-space-edit' */ '@/views/advert-space/advert-space-edit.vue'),
        props: true
      },
      {
        name: 'course',
        path: '/course',
        meta: {
          routes: [
            { path: '/course', name: '课程管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/course.vue')
      },
      {
        name: 'course-new',
        path: '/course/new',
        meta: {
          routes: [
            { path: '/course', name: '课程管理' },
            { name: '添加课程' }
          ]
        },
        component: () => import(/* webpackChunkName: 'course-new' */ '@/views/course/new.vue')
      },
      {
        name: 'course-edit',
        path: '/course/:courseId/edit',
        meta: {
          routes: [
            { path: '/course', name: '课程管理' },
            { name: '编辑课程' }
          ]
        },
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        props: true
      },
      {
        name: 'course-section',
        path: '/course/:courseId/section',
        meta: {
          routes: [
            { path: '/course', name: '课程管理' },
            { name: '课程内容管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true
      },
      {
        name: 'course-video',
        path: '/course/:courseId/video',
        meta: {
          routes: [
            { path: '/course', name: '课程管理' },
            { name: '上传视频' }
          ]
        },
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
        props: true
      },
      {
        name: 'menu',
        path: '/menu',
        meta: {
          routes: [
            { path: '/menu', name: '菜单管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/menu.vue')
      },
      {
        name: 'menu-create',
        path: '/menu/create',
        meta: {
          routes: [
            { path: '/menu', name: '菜单管理' },
            { name: '添加菜单' }
          ]
        },
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
      },
      {
        name: 'menu-edit',
        path: '/menu/:id/edit',
        meta: {
          routes: [
            { path: '/menu', name: '菜单管理' },
            { name: '编辑菜单' }
          ]
        },
        component: () => import(/* webpackChunkName: 'menu-edit-edit' */ '@/views/menu/edit.vue')
      },
      {
        name: 'resource',
        path: '/resource',
        meta: {
          routes: [
            { path: '/resource', name: '资源管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/resource.vue')
      },
      {
        name: 'resource-category',
        path: '/resource-category',
        meta: {
          routes: [
            { path: '/resource-category', name: '资源分类' }
          ]
        },
        component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/category.vue')
      },
      {
        name: 'role',
        path: '/role',
        meta: {
          routes: [
            { path: '/role', name: '角色管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/role.vue')
      },
      {
        name: 'allocation-menu',
        path: '/role/:roleId/allocation-menu',
        meta: {
          routes: [
            { path: '/role', name: '角色管理' },
            { name: '分配菜单' }
          ]
        },
        component: () => import(/* webpackChunkName: 'allocation-menu' */ '@/views/role/allocation-menu.vue'),
        props: true // 将路由路径参数映射到组件的props中
      },
      {
        name: 'allocation-source',
        path: '/role/:roleId/allocation-source',
        meta: {
          routes: [
            { path: '/role', name: '角色管理' },
            { name: '分配资源' }
          ]
        },
        component: () => import(/* webpackChunkName: 'allocation-source' */ '@/views/role/allocation-source.vue'),
        props: true
      },
      {
        name: 'user',
        path: '/user',
        meta: {
          routes: [
            { path: '/user', name: '用户管理' }
          ]
        },
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/user.vue')
      }
    ]
  },

  {
    name: '404',
    path: '*',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
];

const router = new VueRouter({
  routes
});

// 全局前置守卫，任何页面的访问都要经过这里
router.beforeEach((to, from, next) => {
  next();
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
