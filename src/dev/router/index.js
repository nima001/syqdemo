import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '../views/Layout';
import {developDoc} from './modules/developdoc';
import {manageCenter} from './modules/managecenter';
import {auditCenter} from './modules/auditcenter';
import {userCenter} from './modules/usercenter';
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dev',
      component: Layout,
      children: [
        {
          path: 'message',
          component: () => import('@/dev/views/message'),
          name: 'message',
        }
      ]
    },
    developDoc,
    manageCenter,
    auditCenter,
    userCenter
  ]
});