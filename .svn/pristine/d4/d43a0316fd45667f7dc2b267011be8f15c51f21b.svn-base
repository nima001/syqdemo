import Layout from '../../views/Layout'

//表单模板
export const form = {
  path: '/workflowsystem/model/form',
  component: Layout,
  redirect: '/workflowsystem/model/form/list',
  name: 'form',
  meta: {access: true, title: '表单模板'},
  children: [
    {
			path: 'list',
			component: () => import('../../views/model/Form'),
      name: 'Form',
      meta: {
        access: 'login',
        path: [{name: '表单模板', path: '/workflowsystem/model/form/list'}]
      }
    },
  ]
}