/**
 * 管理中心路由
 */
import Layout from '../../views/Layout'
export const manageCenter = {
  path: '/dev/manage',
  component: Layout,
  redirect: '/dev/manage/index',
  children: [
    {
      path: 'index',
      component: () => import('@/dev/views/managecenter/index'),
      meta: { access: 'login' }
    },
    {
      path: 'app',
      component: () => import('@/dev/views/managecenter/ManageApp'),
      name: 'app',
      meta: { access: 'login' }
    },
    {
      path: 'service/apply',
      component: () => import('@/dev/views/managecenter/ServiceApplyStep'),
      name: 'apply',
      meta: { access: 'login' }
    },
    {
      path: 'service/accessInfo',
      component: () => import('@/dev/views/managecenter/ServiceAccessInfo'),
      name: 'accessInfo',
      meta: { access: 'login' }
    },
    
  ]
}
