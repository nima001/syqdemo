
/** 
 * 文件中心模块路由
*/
import Layout from '../../views/Layout'
export const docCenter =
{
	path: '/person/doc',
	component: Layout,
	name: 'doc',
	children: [
		{
			path: 'docstay',
			component: () => import('../../views/doccenter/DocStay'),
			name: 'docStay',
			meta: { 
				access: 'login',
				path: [ { name: '待入库', path: '/person/doc/docstay' }] 
			}
		},
		{
			path: 'docsearch',
			component: () => import('../../views/doccenter/DocSearch'),
			name: 'docSearch',
			meta: { 
				access: 'login',
				path: [ { name: '文件查询', path: '/person/doc/docSearch' }] 
			}
		}
	]
}
