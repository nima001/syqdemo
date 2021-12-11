
// import Layout from '@person/views/Layout'

export const visualScreen = [
  {
    path: '/person/screen',
    name: 'VisualScreenIndex',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen'),
  },
  {
    path: '/person/screen/problems',
    name: 'VisualScreenProblems',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen/Problems'),
  },
  {
    path: '/person/screen/staffing',
    name: 'VisualScreenStaffing',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen/Staffing'),
  },
  {
    path: '/person/screen/assessment',
    redirect: '/person/screen/assessment/index',
    name: 'Assessment',
    meta: {
      access: 'login',
    },
    component: ()=>import('../../views/visualScreen/Assessment'),
    children: [
      {
        path: 'index',
        name: 'AssessmentIndex',
        meta: {
          access: 'login',
        },
        component: ()=>import('../../views/visualScreen/components/AssessmentIndex'),
      },
      {
        path: 'chargedepart',
        name: 'ChargeDepart',
        meta: {
          access: 'login',
        },
        component: ()=>import('../../views/visualScreen/components/ChargeDepart')
      },
      {
        path: 'list',
        name: 'AssessmentList',
        meta: {
          assess: 'login',
        },
        component: ()=>import('../../views/visualScreen/components/AssessmentList')
      },
      {
        path: 'detail',
        name: 'AssessDetail',
        meta: {
          assess: 'login',
        },
        component: ()=>import('../../views/visualScreen/components/AssessDetail')
      }
    ]
  },
  {
    path: '/person/screen/jobdetail',
    name: 'jobdetail',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen/JobDetail'),
  },
  {
    path: '/person/screen/leadposition',
    name: 'LeadPositionNum',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen/LeadPositionNum'),
  },
  {
    path: '/person/screen/analysis',
    name: 'PersonStructAnalysis',
    meta: {
      access: 'login'
    },
    component: () => import('../../views/visualScreen/PersonStructAnalysis'),
  }
]
