
/*** 
 * 综合查询路由
*/
import Layout from '../../views/Layout'
export const integratedQuery = {
	path: '/person/integratedquery',
	component: Layout,
	redirect: 'index',
	children: [
		{
			path: 'index',
			component: () => import('../../views/integratedquery/index'),
			name: 'integratedquery',
			meta: {
				access: 'login',
				path: [ { name: '高级查询', path: '/person/integratedquery/index' }]
			}
		},
		{
			path: 'commonquery',
			component: () => import('../../views/integratedquery/commonquery'),
			name: 'commonquery',
			meta: { 
				access: 'login',
				path: [ { name: '常用查询', path: '/person/integratedquery/commonquery' }] 
			}
		}
	]
}