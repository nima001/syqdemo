import Layout from '../../views/Layout'

//接口管理
export const sysApiManage = {
  path: '/workflowsystem/sysapimanage',
  component: Layout,
  redirect: '/workflowsystem/sysapimanage/list',
  name: 'apiManage',
  meta: {access: true, title: '接口管理'},
  children: [
    {   
			path: 'list',
			component: () => import('../../views/sysapi/SysApiManage'),
      name: 'SysApiManage',
      meta: {
        access: 'login',
        path: [{name: '接口管理', path: '/workflowsystem/sysapi/sysapimanage/list'}]
      }
    },
  ]
}