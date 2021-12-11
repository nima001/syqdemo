import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import { importExport } from '@person/router/modules/importexport';
import { countchart, chartTemplate, chartManage, tempPreview, Fields } from '@person/router/modules/booklet';
import { docCenter } from '@person/router/modules/doccenter';
import { orgRoutes } from './modules/org';
import { integratedQuery } from '@person/router/modules/query';
import { orgRecordRoutes } from '@person/router/modules/orgrecord';
import { chartRoutes } from '@person/router/modules/chart';
import { analysisRoutes } from '@person/router/modules/analysis';

import { examRoutes } from './modules/exam';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    integratedQuery,
    docCenter,
    countchart,
    chartTemplate,
    chartManage,
    Fields,
    tempPreview,
    orgRoutes,
    orgRecordRoutes,
    importExport,
    chartRoutes,
    analysisRoutes,
    examRoutes,
  ]
});