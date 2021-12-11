import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import { modleDesign } from './modules/modeldesign';
import { modelApplication } from './modules/modelapplication';
import { form } from './modules/form';
import { sysApiManage } from './modules/sysapimanage';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    modleDesign,
    modelApplication,
    form,
    sysApiManage,
    {
      path: '*',
      component: () => import('@framework/views/error/404'),
      meta: { title: '404' }
    }
  ]
});