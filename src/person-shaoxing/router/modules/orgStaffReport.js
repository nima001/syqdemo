import Layout from '../../views/Layout'

/**
 * 机构编制统计模块路由（预警预报）
 */
export const orgStaffReportRoutes = {
  path: '/person',
  component: Layout,
  children: [
    {
      path: 'orgstaffreport',
      component: () => import('../../views/orgStaffReport/index'),
      name: 'orgStaffReportIndex',
      meta: {
        access: 'auth',
        path: [{ name: '预警预报', path: '/person/orgstaffreport' }]
      }
    },
  ]
}

/**
 * 可视化大屏
 */
export const visualScreen = [
  {
    path: '/person/screen/index',
    component: () => import('@/person-shaoxing/views/visualscreen/index'),
    meta: {
      access: 'auth'
    }
  },
  {
    path: '/person/screen/detail',
    component: () => import('@/person-shaoxing/views/visualscreen/ScreenDetail'),
    meta: {
      access: 'auth'
    }
  }
]


/** 
 * 入口
*/
export const entry = [
  {
    path: '/person/entry',
    component: () => import('@/person-shaoxing/views/entry/index'),
    meta: {
      access: 'login'
    }
  },
]