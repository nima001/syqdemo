
import Layout from '../../views/Layout'

//  导入导出
export const importExport = {
	path: '/person/importexport',
	component: Layout,
	redirect: 'createindex',
	children: [
		{
			path: 'createindex',
			component: () => import('../../views/importexport/createindex'),
			name: 'createindex',
			meta: { 
				access: 'login',
				path: [ { name: '信息维护', path: '/person/importexport/createindex' }] 
			}
		},
	]
}
