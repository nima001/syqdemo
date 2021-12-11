
/**
 * 登陆模块路由
 */
export const loginRoutes = {
    path: '/idm/resetpassword',
    component: () => import('../../views/resetpassword/index.vue'),
    name: 'Index',
    //  children: [
    //      {
    //          path: 'index',
    //          component: () => import('../../views/home/index.vue'),
    //          name: 'Index',
    //      }
    //  ]
 }
 