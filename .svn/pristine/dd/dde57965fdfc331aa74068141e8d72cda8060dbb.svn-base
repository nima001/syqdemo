/***
 * 日志审计模块路由
 */
import Layout from '../../views/Layout'
export const logs = {
  path: '/person/logs',
  component: Layout,
  redirect: 'index',
  children: [
    {
      path: 'index',
      component: () => import('../../views/logs/index'),
      meta: {
        access: 'login'
      }
    }
  ]
}
