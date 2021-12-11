/**
 * 实名制模块路由
 */
import Layout from '../../views/Layout'

export const orgRoutes = {
  path: '/person/org',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('../../views/org/index'),
      name: 'orgIndex',
      children: [
        {
          path: 'index',
          component: () => import('../../views/org/Main'),
          name: 'orgMain',
          meta: {
            access: 'login',
            path: [{ name: '实名制', path: '/person/org' }]
          }
        },
        {
          path: 'report',
          component: () => import('../../views/org/Report'),
          name: 'orgReport',
          meta: {
            access: 'login',
            path: [{ name: '实名制', path: '/person/org' }]
          }
        },
        {
          path: 'userinfo',
          component: () => import('../../views/org/UserInfo'),
          name: 'UserInfo',
          meta: {
            access: 'login',
            path: [{ name: '实名制', path: '/person/org' }]
          }
        },        
      ]
    }
  ]
}
