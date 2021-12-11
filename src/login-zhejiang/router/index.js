import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('../views/index'),
      name: 'login',
      meta: { title: '登录'}
    },
    {
      path: '/login/exit',
      component: () => import('@/login/views/Exit'),
      name: 'Exit',
      meta: { title: '登出' }
    },
  ]
});