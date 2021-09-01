import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('@/views/search/')
  // },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat/')
  },
  { // 用户关注/粉丝
    path: '/user/:userId/follow',
    component: () => import('@/views/user-follow'),
    props: true,
    meta: { requiresAuth: true }
  },
  // { // 我的作品、收藏、历史
  //   name: 'my-article',
  //   path: '/my-article/:type?',
  //   component: () => import('@/views/my-article'),
  //   props: true,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true //将动态路由参数映射到组件props中。维护和访问都方便
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', //默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/')
      },
      { // 我的作品、收藏、历史
        name: 'my-article',
        path: '/my-article/:type?',
        component: () => import('@/views/my-article'),
        props: true,
        meta: { requiresAuth: true }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      },

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
