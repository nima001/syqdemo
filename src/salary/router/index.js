import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import { salaryDefend, salaryManage } from './modules/salary';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    salaryDefend,
    salaryManage,
  ]
});