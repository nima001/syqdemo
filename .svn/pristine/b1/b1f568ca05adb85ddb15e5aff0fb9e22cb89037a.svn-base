/**
 * 开发文档路由
 */
import Layout from '../../views/Layout'
export const developDoc = {
  path: '/dev',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/dev/views/index'),
      name: 'dev',
      meta: { access: 'login' }
    },
    {
      path: 'developdoc',
      component: () => import('@/dev/views/developDoc'),
      name:'developdoc',
      meta: { access: 'login' }
    }
  ]
}
