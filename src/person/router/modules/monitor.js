

/** 
 * 监测模块路由
*/
import Layout from '../../views/Layout'


//监控策略管理
export const monitorStrategyManage = {
	path: '/person/manage/monitorstrategy',
  component: Layout,
  redirect: 'list',
  name: 'monitorStrategyManage',
  meta: {access: true, title: '监控策略管理'},
  children: [
    {
			path: 'list',
			component: () => import('../../views/monitor/manage/MonitorStrategy'),
      name: 'MonitorStrategy',
      meta: {
        access: 'login',
        path: [{name: '监控策略管理', path: '/person/manage/monitorstrategy/list'}]
      }
    },
    {
			path: 'info',
			component: () => import('../../views/monitor/manage/MonitorStrategyInfo'),
      name: 'MonitorStrategyInfo',
      meta: {
        access: 'login',
        path: [{name: '监控策略管理', path: '/person/manage/monitorstrategy/list'},{name: '策略编辑',path: '/person/manage/monitorstrategy/info'}]
      }
		}
  ]
}