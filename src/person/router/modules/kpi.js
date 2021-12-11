/***
 * 质效评估模块路由
 */
import Layout from '../../views/Layout'
export const kpi = {
  path: '/person/kpi',
  component: Layout,
  redirect: 'assess/index',
  children: [
    {
      path: 'assess/index',
      component: () => import('../../views/kpi/assess/index'),
      meta: {
        access: 'login',
        path: [{ name: '质效评估', path: '/person/kpi/assess/index' }]
      }
    },
    {
      path: 'administration/assessmanage',
			component: () => import('../../views/kpi/administration/assessManage/index'),
			name: 'AssessMange',
			meta: {
				access: 'login',
				path: [ { name: '评估指标体系管理', path: '/person/kpi/administration/assessManage' }]
			}
    },
    {
      path: 'administration/AssessPreview',
			component: () => import('../../views/kpi/administration/AssessPreview'),
			name: 'AssessPreview',
			meta: {
				access: 'login',
				path: [ { name: '质效评估', path: '/person/kpi/administration/assessmanage/AssessPreview' }]
			}
    },
    {
      path: 'administration/ruleMange',
			component: () => import('../../views/kpi/administration/ruleManage'),
			name: 'RuleMange',
			meta: {
				access: 'login',
				path: [ { name: 'xx规则表', path: '/person/kpi/administration/assessmanage/ruleManage' }]
			}
    },
    {
      path: 'administration/assessEdit',
			component: () => import('../../views/kpi/administration/assessEdit'),
			name: 'assessEdit',
			meta: {
				access: 'login',
				path: [ { name: '评估表模板编辑', path: '/person/kpi/administration/assessmanage/assessEdit' }]
			}
    }
    

  ]
}
 