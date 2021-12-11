
/** 
 * 台账模块路由
*/
import Layout from '../../views/Layout'
export const orgRecordRoutes = {
	path: '/person/orgrecord',
	component: Layout,
	children: [
		{
			path: 'entry',
			component: () => import('../../views/orgrecord/BookEntry'),
			name: 'bookEntry',
			redirect: 'entry/step1',
			children: [
				{
					path: 'step1',
					component: () => import('../../views/orgrecord/ChooseDoc'),
					name: 'chooseDoc',
					meta: { 
						access: 'login',
						path: [ { name: '台账录入' }] 
					}
				},
				{
					path: 'step2',
					component: () => import('../../views/orgrecord/EditOutline'),
					name: 'editOutline',
					meta: { 
						access: 'login',
						path: [ { name: '台账录入' }] 
					}
				},
				{
					path: 'step3',
					component: () => import('../../views/orgrecord/EditRecord'),
					name: 'editRecord',
					meta: {
						access: 'login',
						path: [ { name: '台账录入' }] 
					}
				},
				{
					path: 'step4',
					component: () => import('../../views/orgrecord/Finish'),
					name: 'finish',
					meta: { 
						access: 'login',
						path: [ { name: '台账录入' }] 
					}
				},
			]
		},
		{
			path: 'history',
			component: () => import('../../views/orgrecord/BookHistory'),
			name: 'bookHistory',
			meta: { 
				access: 'login',
				path: [ { name: '历史台账'}] 
			}
		},
		{
			path: 'edit',
			component: () => import('../../views/orgrecord/BookEdit'),
			name: 'bookEdit',
			meta: { 
				access: 'login',
				path: [ { name: '台账编辑'}] 
			}
		},
		{
			path: 'distrtemp',
			component: () => import('../../views/orgrecord/orgdistr/OrgDistr'),
			name: 'orgDistr',
			meta: { 
				access: 'login',
				path: [ { name: '职数/编制数模板管理'}] 
			}
		},
	]
}