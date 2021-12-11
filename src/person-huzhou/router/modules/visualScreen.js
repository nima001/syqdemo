
// import Layout from '@person/views/Layout'

export default [
  {
    path: '/person/screen',
    name: 'VisualScreenIndex',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen'),
  },
]
