/**
 * 用户中心路由
 */
import Layout from '../../views/Layout'
export const userCenter = {
  path: '/dev/user',
  component: Layout,
  redirect: '/dev/user/index',
  children: [
    {
      path: 'index',
      component: () => import('@/dev/views/UserCenter'),
      name:'user',
      meta: { access: 'login' }
    }
  ]
}