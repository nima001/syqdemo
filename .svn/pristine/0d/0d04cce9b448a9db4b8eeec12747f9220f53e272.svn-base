/** 
 * 工作流模块路由
*/
import Layout from '../../views/Layout'

export const workflowRoutes = {
	path: '/workflow',
	component: Layout,
	redirect: 'creatprocess',
	children: [
		{
			path: 'creatprocess',
			component: () => import('../../views/process/processTemplate/v1/ProcessV1'),
			name: 'creatprocess',
			meta: { path: [ { name: '在线办理', path: '/workflow/creatprocess' }] }
		},
		{
				path: 'businessapproval',
				component: () => import('../../views/business/BusinessApproval'),
				name: 'businessapproval',
				meta: { path: [ { name: '流程查询', path: '/workflow/businessapproval' }] }
		},
		{
				path: 'thingbank',
				component: () => import('../../views/business/ThingBank'),
				name: 'thingbank',
				meta: { path: [ { name: '流程查询', path: '/workflow/businessapproval' }, { name: '办件库', path: '/workflow/thingbank' }] }
		},
		{
				path: 'workflowform',
				component: () => import('../../views/workflow/form/index'),
				name: 'workflowform'
		},
		{
				path: 'flowchartofcompletionpage',
				component: () => import('../../views/workflow/form/FlowChartOfCompletionPage'),
				name: 'flowchartofcompletionpage'
		},
		{
				path: 'processguide',
				component: () => import('../../views/process/processTemplate/v1/ProcessGuideV1'),
				name: 'processguide'
		},
		{
				path: 'processdirectorymanagement',
				component: () => import('../../views/process/processTemplate/v1/ProcessDirectoryManagementV1'),
				name: 'processdirectorymanagement',
				meta: { path: [ { name: '流程目录管理', path: '/workflow/processdirectorymanagement' }] }
		},
		{
				path: 'processmodel',
				component: () => import('../../views/process/processModel/ModelList'),
				name: 'processmodel',
				meta: { path: [ { name: '所有模板管理', path: '/workflow/processmodel' }] }
		},
		{
				path: 'newprocesstemplate',
				component: () => import('../../views/process/newProcessTemplate/NewProcessTemplate'),
				name: 'newprocesstemplate',
				meta: { path: [ { name: '所有模板管理', path: '/workflow/processmodel' }, { name: '设计流程模板', path: '/workflow/newprocesstemplate' }] }
		},
		{
				path: 'processmodelgroup',
				component: () => import('../../views/process/processModel/ModelGroup'),
				name: 'processmodelgroup',
				meta: { path: [ { name: '所有模板组管理', path: '/workflow/processmodelgroup' }] }
		},
		{
				path: 'signature',
				component: () => import('../../views/process/signatureTemplate/Signature'),
				name: 'signature',
				meta: { path: [ { name: '签章管理', path: '/workflow/signature' }] }
		},
		{
				path: 'signatureList',
				component: () => import('../../views/process/signatureTemplate/SignatureList'),
				name: 'signatureList',
				meta: { path: [ { name: '签章管理', path: '/workflow/signature' }, { name: '签章列表', path: '/workflow/signatureList' }] }
		},
		{
				path: 'signatureEdit',
				component: () => import('../../views/process/signatureTemplate/SignatureEdit'),
				name: 'signatureEdit',
				meta: { path: [ { name: '签章管理', path: '/workflow/signature' }, { name: '签章列表', path: '/workflow/signatureList' }, { name: '签章编辑', path: '/workflow/signatureEdit' }] }
		},
		{
				path: 'signatureRole',
				component: () => import('../../views/process/signatureTemplate/SignatureRole'),
				name: 'signatureRole',
				meta: { path: [ { name: '签章管理', path: '/workflow/signature' }, { name: '签章列表', path: '/workflow/signatureList' }, { name: '查看授权角色', path: '/workflow/signatureRole' }] }
		},
		{
				path: 'messagemanagement',
				component: () => import('../../views/process/messageTemplate/MessageManagement'),
				name: 'messagemanagement',
				meta: { path: [ { name: '消息模板管理', path: '/workflow/messagemanagement' }] }
		},
		{
				path: 'summarymanagement',
				component: () => import('../../views/process/summaryTemplate/SummaryManagement'),
				name: 'summarymanagement',
				meta: { path: [ { name: '汇总表管理', path: '/workflow/summarymanagement' }] }
		},
		{
				path: 'summarymanagement/tablesetting',
				component: () => import('../../views/process/summaryTemplate/components/TableSetting'),
				name: 'tablesetting',
				meta: { path: [ { name: '汇总表管理', path: '/workflow/summarymanagement' }, { name: '表格设置', path: '/workflow/summarymanagement/tablesetting' }] }
		},
		{
				path: 'summarymanagement/tablesetting/bindcontrol',
				component: () => import('../../views/process/summaryTemplate/components/BindControl'),
				name: 'bindcontrol',
				meta: { path: [ { name: '汇总表管理', path: '/workflow/summarymanagement' }, { name: '表格设置', path: '/workflow/summarymanagement/tablesetting' }] }
		},
		{
				path: 'summarymanagement/exportsetting',
				component: () => import('../../views/process/summaryTemplate/components/ExportSetting'),
				name: 'exportsetting',
				meta: { path: [ { name: '汇总表管理', path: '/workflow/summarymanagement' }, { name: '导出设置', path: '/workflow/summarymanagement/exportsetting' }] }
		},
		{
				path: 'strategymanagement',
				component: () => import('../../views/process/strategyTemplate/StrategyManagement'),
				name: 'strategymanagement',
				meta: { path: [ { name: '策略管理', path: '/workflow/strategymanagement' }] }
		},
		{
				path: 'processinterfacemanagement',
				component: () => import('../../views/process/processInterfaceTemplate/ProcessInterfaceManagement'),
				name: 'processinterfacemanagement',
				meta: { path: [ { name: '流程接口管理', path: '/workflow/processinterfacemanagement' }] }
		},
		{
				path: 'processmonitormanager',
				component: () => import('../../views/process/processMonitor/ProcessMonitorTemplate'),
				name: 'processmonitormanager',
				meta: { path: [ { name: '流程监管' }] }
		},
		{
				path: 'processmonitormanager/processmonitor',
				component: () => import('../../views/process/processMonitor/ProcessMonitor'),
				name: 'processmonitor',
				meta: { path: [ { name: '流程监控', path: '/workflow/processmonitormanager/processmonitor' }] }
		},
		{
				path: 'processmonitormanager/statisticanalysis',
				component: () => import('../../views/process/processMonitor/StatisticAnalysis'),
				name: 'statisticanalysis',
				meta: { path: [ { name: '统计分析', path: '/workflow/processmonitormanager/statisticanalysis' }] }
		},
		{
				path: 'selectorg',
				component: () => import('../../views/process/processTemplate/v1/SelectOrg'),
				name: 'selectorg'
		},
		{
				path: 'selectuser',
				component: () => import('../../views/process/processTemplate/v1/SelectUser'),
				name: 'selectuser'
		},
		{
				path: 'selectpostprocess',
				component: () => import('../../views/process/processTemplate/v1/SelectPostProcess'),
				name: 'selectpostprocess'
		},
		{
				path: 'formurl',
				component: () => import('../../views/workflow/form/FormUrl'),
				name: 'formurl'
		},
		// 暂时写在这里 TODO mhz
		{
				path: 'personneltransference',
				component: () => import('../../views/workflow/PersonnelTransference'),
				name: 'personneltransference',
				// meta: { path: [ { name: '事业单位人员划转', path: '/workflow/personneltransference' }] }
		},
		{
				path: 'personneltransference2',
				component: () => import('../../views/workflow/PersonnelTransference'),
				name: 'personneltransference2',
				// meta: { path: [ { name: '事业单位人员划转', path: '/workflow/personneltransference' }] }
		},
	]
}