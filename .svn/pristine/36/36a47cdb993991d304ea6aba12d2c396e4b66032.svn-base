import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import { accountRoutes } from './modules/account';
import { indexRoutes } from './modules/index';
import { loginRoutes } from './modules/login';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    accountRoutes,
    indexRoutes,
    loginRoutes
  ]
});