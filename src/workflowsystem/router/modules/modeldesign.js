
//流程设计
import Layout from '../../views/Layout'
//流程图设计
export const modleDesign = {
  path: '/workflowsystem/model/design',
  component: Layout,
  redirect: '/workflowsystem/model/design/modeldesign',
  name: 'modleDesign ',
  meta: {  title: '流程设计' },
  children: [
    {
      path: 'modeldesign',
      component: () => import('../../views/design/ModelDesign'),
      name: 'ModelDesign',
      // meta: {
      //   access: 'login',
      //   path: [{name: '流程模板应用', path: '/workflowsystem/model/modelapplication/list'}, { name: '流程设计', path: '/workflowsystem/model/design' }]
      // }
    },
    {
      path: 'flowdesign',
      component: () => import('../../views/design/components/FlowDesign'),
      name: 'FlowDesign',
      meta: {
        access: 'login',
        path: [{name: '流程模板应用', path: '/workflowsystem/model/modelapplication/list'}, { name: '流程设计', path: '/workflowsystem/model/design' }]
      }
    }
  ]
}