
/** 
 * 监测模块路由
*/
import Layout from '../../views/Layout'

export const monitorRoutes = {
	path: '/person/monitor',
  component: Layout,
  children: [
    {
			path: '',
			component: () => import('../../views/monitor/businessHandle/index.vue'),
			name: 'monitorIndex',
			redirect: 'businesshandle',
			children: [
				{
          path: 'businesshandle',
          component: () => import('../../views/monitor/businessHandle/Main.vue'),
          name: 'businesshandle',
          meta: { path: [ { name: '业务办理监测', path: '/person/monitor/businesshandle' }] }
        },
			]
    },
    {
      path: 'issuetracking',
			component: () => import('../../views/monitor/issueTracking/index.vue'),
      name: 'issueTracking',
      meta: { path: [ { name: '问题跟踪监测', path: '/person/monitor/issuetracking' }] }
    },
    {
      path: 'dataquality',
			component: () => import('../../views/monitor/dataQuality/index.vue'),
      name: 'dataQuality',
      meta: { path: [ { name: '数据质量监测', path: '/person/monitor/dataquality' }] }
    }
  ]
}
