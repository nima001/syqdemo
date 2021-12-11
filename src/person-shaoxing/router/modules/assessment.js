/** 
 * 分析模块路由
*/
import { has } from 'core-js/fn/dict'
import Layout from '../../views/Layout'

export const assessmentRoutes = {
  path: '/person/assessment',
  component: Layout,
  children: [
    {
      path: 'functional',
      component: () => import('../../views/assessment/functionAlanalysis/index.vue'),
      name: 'functional',
      meta: { path: [{ name: '机构职能配置分析', path: '/person/assessment/functional' }] }
    },
    {
      path: 'detail',
      component: () => import('../../views/assessment/functionAlanalysis/Functional.vue'),
      name: 'detail',
      meta: { path: [{ name: '机构职能配置分析', path: '/person/assessment/functional' }] }
    },
    {
      path: 'reform',
      component: () => import('../../views/assessment/institutionalReform/index.vue'),
      name: 'reform',
      meta: { path: [{ name: '机构改革沿革分析', path: '/person/assessment/reform' }] },
      children: [
        {
          path: 'institutional',
          component: () => import('../../views/assessment/institutionalReform/Institutional'),
          name: 'reformInstitutional',
          meta: {
            path: [
              { name: '机构改革沿革分析', path: '/person/assessment/reform' },
              { name: '详情', path: '/person/assessment/reform/institutional' }]
          }
        },
      ]
    },
    {
      path: 'auxiliaryevaluation',
      component: () => import('../../views/assessment/compileAssist/manage/index.vue'),
      name: 'auxiliaryEvaluation',
      meta: { path: [{ name: '辅助评估内容管理', path: '/person/assessment/auxiliaryevaluation' }] }
    },
    {
      path: 'compileassist',
      component: () => import('../../views/assessment/compileAssist/analysis/index'),
      name: 'compileAssist',
      meta: { path: [{ name: '机构编制辅助评估', path: '/person/assessment/compileassist' }] }
    },
    {
      path: 'compileassist/report',
      component: () => import('../../views/assessment/compileAssist/analysis/CheckReport'),
      name: 'checkReport',
      meta: { 
        path: [
          { name: '机构编制辅助评估', path: '/person/assessment/compileassist' },
          { name: '报告', path: '/person/assessment/compileassist/report' },
        ] }
    },
    {
      path: 'responsibility',
      component: () => import('../../views/assessment/responsibility/index.vue'),
      name: 'responsibility',
      meta: {
        path: [{ name: '机构权责清单分析', path: '/person/assessment/responsibility' }]
      },
    },
    {
      path: 'responsibility/details',
      component: () => import('../../views/assessment/responsibility/details.vue'),
      name: 'details',
      meta: {
        path: [{ name: '机构权责清单分析', path: '/person/assessment/responsibility' }]
      },
    },
    {
      path: 'orgcomp',
      component: () => import('../../views/assessment/orgCompared/index.vue'),
      name: 'OrgCompared',
      meta: {
        path: [{ name: '机构信息对比分析', path: '/person/assessment/orgcomp' }]
      },
    }
  ]
}