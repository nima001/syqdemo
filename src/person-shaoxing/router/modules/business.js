import Layout from '../../views/Layout'

/**
 * 业务办理
 */
export const businessRoutes = {
  path: '/person',
  component: Layout,
  children: [
    {
      path: 'business',
      component: () => import('../../views/business/index'),
      name: 'businessIndex',
      meta: {
        access: 'auth',
      }
    },
	  {
      path: 'configure/businessmanage',
      component: () => import('../../views/businessmanage/index'),
      name: 'businessmanage',
      meta: { 
        access: 'login',
        path: [{ name: '事项管理', path: '/person/configure/businessmanage' }] 
      }
    },
    {
      path: 'worktask',
      component: () => import('../../views/business/WorkTaskManage'),
      name: 'workTaskManage',
      meta: {
        access: 'login',
      },
			children: [
        {
          path: 'work',
          component: () => import('../../views/business/MyWorkTask'),
          meta: {
            path: [
              { name: '业务办理', path: '/person/business' },
              { name: '我要办的', path: '/person/worktask/work'}
            ]
          },
        },
        {
          path: 'concern',
          component: () => import('../../views/business/ConcernTask'),
          meta: {
            path: [
              { name: '业务办理', path: '/person/business' },
              { name: '我关注的', path: '/person/worktask/concern'}
            ]
          },
        },
        {
          path: 'publish',
          component: () => import('../../views/business/PublishTask'),
          meta: {
            path: [
              { name: '业务办理', path: '/person/business' },
              { name: '发布任务', path: '/person/worktask/publish'}
            ]
          },
        }
      ]
    },
  ]
}
