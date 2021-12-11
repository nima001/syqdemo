/**
 * 审核中心路由
 */
import Layout from '../../views/Layout'
export const auditCenter = {
  path: '/dev/audit',
  component: Layout,
  redirect: '/dev/audit/index',
  children: [
    {
      path: 'index',
      component: () => import('@/dev/views/auditcenter/index'),
      name: 'audit',
      meta: { access: 'login' }
    }
  ]
}