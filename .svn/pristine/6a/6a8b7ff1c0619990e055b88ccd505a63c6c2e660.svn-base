import Vue from 'vue'
import Router from 'vue-router'

/* Router Modules */
import { importExport } from './modules/importexport'
import {
  countchart,
  chartTemplate,
  chartManage,
  tempPreview,
  Fields
} from './modules/booklet'
import { docCenter } from './modules/doccenter'
import { orgRoutes } from './modules/org'
import { examRoutes } from './modules/exam'
import { integratedQuery } from './modules/query'
import { logs } from './modules/logs'
import { orgRecordRoutes } from './modules/orgrecord'
import { chartRoutes } from './modules/chart'
import { analysisRoutes } from './modules/analysis'
import { monitorStrategyManage } from './modules/monitor'
import { kpi } from './modules/kpi'

Vue.use(Router)

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
    examRoutes,
    orgRecordRoutes,
    importExport,
    chartRoutes,
    analysisRoutes,
    monitorStrategyManage,
    logs,
    kpi
  ]
})
