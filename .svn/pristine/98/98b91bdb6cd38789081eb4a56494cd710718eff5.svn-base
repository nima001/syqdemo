
/** 
 * 工资科
*/
import Layout from '../../views/Layout'

// 工资体系维护
export const salaryDefend = {
    path: '/salary/defend',
    component: Layout,
    meta: { title: '工资体系维护' },
    children: [
        {
            path: 'salary-item-defend',
            component: () => import('../../views/salarydefend/SalaryItemDefendd'),
            name: 'salaryItemDefend',
            meta: { path: [ { name: '工资项目维护', path: '/salary/defend/salary-item-defend' }] }
        },
        {
            path: 'salary-standard-defend',
            component: () => import('../../views/salarydefend/SalaryStandardDefendd'),
            name: 'salaryStandardDefend',
            meta: { path: [ { name: '工资标准维护', path: '/salary/defend/salary-standard-defend' }] }
        },
        {
            path: 'history-defendd',
            component: () => import('../../views/salarydefend/historyDefendd'),
            name: 'historyDefendd',
            meta: { path: [ { name: '工资历史维护', path: '/salary/defend/history-defendd' }] }
        },
        {
            path: 'work-reform',
            component: () => import('../../views/salarydefend/Workreform'),
            name: 'workreform',
            meta: { path: [ { name: '工改', path: '/salary/defend/work-reform' }] }
        },
        {
            path: 'workreform-add',
            component: () => import('../../views/salarydefend/WorkreformAdd'),
            name: 'workreformAdd',
            meta: { path: [ { name: '工改', path: '/salary/defend/work-reform' }, { name: '新增工改记录', path: '/salary/defend/workreform-add' }] }

        },
        {
            path: 'history-workreform',
            component: () => import('../../views/salarydefend/HistoryWorkreform'),
            name: 'historyworkreform',
            meta: { path: [ { name: '工改', path: '/salary/defend/work-reform' }, { name: '工改历史详情', path: '/salary/defend/history-workreform' }] }
        },
        {
            path: 'change-standard',
            component: () => import('../../views/salarydefend/ChangeStandardd'),
            name: 'changeStandard',
            meta: { path: [ { name: '调标', path: '/salary/defend/change-standard' }] }
        },
        {
            path: 'add-newrecord',
            component: () => import('../../views/salarydefend/AddNewRecord'),
            name: 'addNewRecord',
            meta: { path: [ { name: '调标', path: '/salary/defend/change-standard' }, { name: '新增调标记录', path: '/salary/defend/add-newrecord' }] }
        },
        {
            path: 'update',
            component: () => import('../../views/salarydefend/Update'),
            name: 'update',
            meta: { path: [ { name: '调标', path: '/salary/defend/change-standard' }, { name: '更新调标记录', path: '/salary/defend/update' }] }
        },
        {
            path: 'historyChangeStandard',
            component: () => import('../../views/salarydefend/HistoryChangeStandard'),
            name: 'historyChangeStandard',
            meta: { path: [ { name: '调标', path: '/salary/defend/change-standard' }, { name: '历史调标', path: '/salary/defend/historyChangeStandard' }] }

        },
    ]
}

// 工资管理
export const salaryManage = {
    path: '/salary/manage',
    component: Layout,
    meta: { title: '工资管理' },
    children: [
        {
            path: 'allunit-salary-defendd',
            component: () => import('../../views/salarymanage/AllUnitSalaryDefendd'),
            name: 'allUnitSalaryDefendd',
            meta: { path: [ { name: '全单位本月工资维护', path: '/salary/manage/allunit-salary-defendd' }] }
        },
        {
            path: 'assessmentaward',
            component: () => import('../../views/salarymanage/AssessmentAward'),
            name: 'assessmentAward',
            meta: { path: [ { name: '考核奖', path: '/salary/manage/assessmentaward' }] }
        },
        {
            path: 'fivesocial-onehousingfund',
            component: () => import('../../views/salarymanage/FivesocialOnehousingfund'),
            name: 'FivesocialOnehousingfund',
            meta: { path: [ { name: '全单位五险一金维护', path: '/salary/manage/fivesocial-onehousingfund' }] }
        },
        {
            path: 'salary-detail',
            component: () => import('../../views/salarymanage/SalaryDetail'),
            name: 'salaryDetail',
            meta: { path: [ { name: '全单位本月工资维护', path: '/salary/manage/allunit-salary-defendd' }, { name: '工资详情', path: '/salary/manage/salary-detail' }] }

        },
        {
            path: 'salary-payment-approval',
            component: () => import('../../views/salarymanage/Salarypaymentapproval/SalarypaymentApproval'),
            name: 'salaryPaymentApproval',
            meta: { path: [ { name: '工资发放审批', path: '/salary/manage/Salarypaymentapproval/salary-payment-approval' }] }
        },
        {
            path: 'month-salary',
            component: () => import('../../views/salarymanage/MonthSalary'),
            name: 'monthSalary',
            meta: { path: [ { name: '月工资发放历史记录', path: '/salary/manage/month-salary' }] }

        },
        {
            path: 'salary-payment-approvalunit',
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/SalarypaymentApprovalUnit'),
            name: 'salaryPaymentApprovalunit',
            meta: { path: [ { name: '工资发放审批-单位', path: '/salary/manage/SalarypaymentapprovalUnit/salary-payment-approvalunit' }] }

        },
        {
            path: 'monthsalarydetail',
            component: () => import('../../views/salarymanage/Monthsalarydetail'),
            name: 'monthsalarydetail',
            meta: { path: [ { name: '月工资发放历史记录', path: '/salary/manage/month-salary' }, { name: '月工资发放记录-工资详情', path: '/salary/manage/monthsalarydetail' }] }

        },
        {
            path: 'changeunit',
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/Changeunit'),
            name: 'changeunit',
            meta: { path: [ { name: '工资发放审批-单位', path: '/salary/manage/salary-payment-approvalunit' }, { name: '工资发放审批-工资详情', path: '/salary/manage/SalarypaymentapprovalUnit/changeunit' }] }

        },
        {
            path: 'detailunitForChange',
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/DetailunitForChange'),
            name: 'detailunitForChange',
            meta: { path: [ { name: '工资发放审批-单位', path: '/salary/manage/salary-payment-approvalunit' }, { name: '工资发放审批-工资详情', path: '/salary/manage/changeunit' }, { name: '工资发放审批', path: '/salary/manage/SalarypaymentapprovalUnit/detailunitForChange' }] }

        },
        {
            path: 'detail',
            component: () => import('../../views/salarymanage/Salarypaymentapproval/Detail'),
            name: 'detail',
            meta: { path: [ { name: '工资发放审批', path: '/salary/manage/salary-payment-approval' }, { name: '审批细节', path: '/salary/manage/approval' }, { name: '工资发放审批(工资科)-查看详情', path: '/salary/manage/Salarypaymentapproval/detail' }] }
        },
        {
            path: 'detailunit',
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/DetailUnit'),
            name: 'detailunit',
            meta: { path: [ { name: '工资发放审批-单位', path: '/salary/manage/salary-payment-approvalunit' }, { name: '已办-查看详情', path: '/salary/manage/SalarypaymentapprovalUnit/detailunit' }] }
        },
        {
            path: 'doneDetail',
            component: () => import('../../views/salarymanage/Salarypaymentapproval/DoneDetail'),
            name: 'doneDetail',
            meta: { path: [ { name: '已办-查看内容', path: '/salary/manage/Salarypaymentapproval/doneDetail' }] }
        },
        {
            path: 'doneDetailunit', //已办 查看内容
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/DoneDetailUnit'),
            name: 'doneDetailunit',
            meta: { path: [ { name: '工资发放审批-单位', path: '/salary/manage/salary-payment-approvalunit' }, { name: '工资发放审批-查看内容', path: '/salary/manage/SalarypaymentapprovalUnit/doneDetailunit' }] }
        },
        {
            path: 'approval', //审批细节
            component: () => import('../../views/salarymanage/Salarypaymentapproval/Approval'),
            name: 'approval',
            meta: { path: [ { name: '工资发放审批', path: '/salary/manage/salary-payment-approval' }, { name: '审批细节', path: '/salary/manage/Salarypaymentapproval/approval' }] }


        },
        {
            path: 'approvalunit',
            component: () => import('../../views/salarymanage/SalarypaymentapprovalUnit/ApprovalUnit'),
            name: 'approvalunit',
            meta: { path: [ { name: '工资发放审批-审批细节', path: '/salary/manage/SalarypaymentapprovalUnit/approvalunit' }] }

        },
    ]
}