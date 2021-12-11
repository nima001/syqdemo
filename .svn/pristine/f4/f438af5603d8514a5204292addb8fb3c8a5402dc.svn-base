import moment from "moment";
export const mixin = {
  data () {
    return {
      columns1: [
        {
          title: '姓名',
          width: '100px',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: '60px',
          customRender: this.dictRender('usermanage.user.sex')
        },
        {
          title: '出生年月',
          dataIndex: 'birthday',
          width: '100px',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        {
          title: '所在处室',
          dataIndex: 'dept.name'
        },
        {
          title: '职务名称',
          dataIndex: 'resumeposition'
        },
        {
          title: '职务级别',
          dataIndex: 'leaderpostlevel',
          customRender: this.dictRender('usermanage.user.leaderpostlevel')
        },
        {
          title: '职务类别',
          width: '16%',
          dataIndex: 'postkind',
          customRender: this.dictRender('usermanage.user.postkind')
        },
        {
          title: '人员身份',
          dataIndex: 'identitytype',
          customRender: this.dictRender('usermanage.user.identitytype')
        },
        {
          title: '编制类型',
          width: '16%',
          dataIndex: 'complietype',
          customRender: this.dictRender('usermanage.user.complietype')
        }
      ],
      columns2: [
        {
          title: '姓名',
          width: '100px',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: '60px',
          customRender: this.dictRender('usermanage.user.sex')
        },
        {
          title: '出生年月',
          dataIndex: 'birthday',
          width: '100px',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        {
          title: '所在处室',
          dataIndex: 'dept.name'
        },
        {
          title: '岗位分类',
          dataIndex: 'jobsort',
          customRender: this.dictRender('usermanage.user.jobsort')
        },
        {
          title: '具体工作岗位',
          width: '16%',
          dataIndex: 'jobdesc'
        },
        {
          title: '用工方式',
          width: '16%',
          dataIndex: 'yonggong_xs',
          customRender: this.dictRender('usermanage.user.yonggong_xs')
        },
        {
          title: '进入本单位时间',
          dataIndex: 'firstemploytime',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        {
          title: '合同期止',
          dataIndex: 'hetong_end',
          customRender: text => moment(text).format('YYYY-MM-DD')
        }
      ],
      columns3: [
        {
          title: '姓名',
          width: '100px',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: '60px',
          customRender: this.dictRender('usermanage.user.sex')
        },
        {
          title: '出生年月',
          dataIndex: 'birthday',
          width: '100px',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        {
          title: "出编时间",
          dataIndex: 'leavetime',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        {
          title: '职务名称',
          dataIndex: 'resumeposition'
        },
        {
          title: '职务级别',
          dataIndex: 'leaderpostlevel',
          customRender: this.dictRender('usermanage.user.leaderpostlevel')
        },
        {
          title: '职务类别',
          width: '16%',
          dataIndex: 'postkind',
          customRender: this.dictRender('usermanage.user.postkind')
        },
        {
          title: '人员身份',
          dataIndex: 'identitytype',
          customRender: this.dictRender('usermanage.user.identitytype')
        },
        {
          title: '编制类型',
          width: '16%',
          dataIndex: 'complietype',
          customRender: this.dictRender('usermanage.user.complietype')
        }
      ]
    }
  }
}
