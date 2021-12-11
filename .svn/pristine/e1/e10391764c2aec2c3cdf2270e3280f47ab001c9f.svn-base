import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import { countchart, chartTemplate, chartManage, tempPreview, Fields } from '@/person/router/modules/booklet';
import { integratedQuery } from '@/person/router/modules/query';
import { chartRoutes } from '@/person/router/modules/chart';
import { analysisRoutes } from '@/person/router/modules/analysis';
import { visualScreen } from './modules/visualScreen';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    integratedQuery,
    countchart,
    chartTemplate,
    chartManage,
    chartRoutes,
    analysisRoutes,
    Fields,
    tempPreview,
    ...visualScreen
  ]
});