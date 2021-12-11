<template>
  <div class="main-form">
    <user-form :data="data" :form="form" :edit="false"/>
    <form-display :formConfig="form" :formData="data" formLayout="horizontal" :editor="false"/>
  </div>
</template>
<script>
import FormDisplay from "@formdesign/views/FormDisplay";
import { salarysgdetail, salaryexchange } from "@/person/api/salaryManage";
import { showError } from "@/framework/utils/index";

export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    FormDisplay,
  },
  data(){
    return {
      form: undefined,
      data: undefined,
    }
  },
  created(){
    this.form = this.createForm();
    if(this.user){
      let userid = this.user._id;
      Promise.all([
        salarysgdetail(userid), 
        salaryexchange(userid)
      ]).then(([detail, exchange]) => {
        let obj = detail.result || {};
        let {after, before} = exchange.result || {};
        if(after){
          Object.keys(after).forEach(key => {
            obj['ca_' + key] = after[key];
          })
        }
        if(before){
          Object.keys(before).forEach(key => {
            obj['cb_' + key] = before[key];
          })
        }
        this.data = obj;
      }).catch(err => {
        showError(err);
      })
    }
  },
  methods: {
    createForm(){
      return [
        { type: 'titleBar', code: 'cur', name: '目前工资' },
        {
          type: 'colLayout',
          children: [
            { span: 8, components: [
              { name: '套改岗位', code: 'postlevel', type: 'selectDict', dict: 'usermanage.user.postlevel' }
            ]}, 
            { span: 8, components: [
              { name: '套改等级', code: 'exchangelevel', type: 'selectDict', dict: 'usermanage.user.commlevel' }
            ]},
            { span: 8, components: [
              { name: '学历倾斜', code: 'eduinclinelevel', type: 'selectDict', dict: 'usermanage.user.commlevel' }
            ]}, 
            { span: 8, components: [
              { name: '职称倾斜', code: 'postinclinelevel', type: 'selectDict', dict: 'usermanage.user.commlevel' }
            ]}, 
            { span: 8, components: [
              { name: '倾斜等级', code: 'totalincline', type: 'selectDict', dict: 'usermanage.user.commlevel' }
            ]}, 
            { span: 8, components: [
              { name: '累计套改等级', code: 'totalexclevel', type: 'selectDict', dict: 'usermanage.user.commlevel' }
            ]}, 
            { span: 8, components: [
              { name: '基础工资系数', code: 'basicsalaryxs', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '全社会单位就业人员年平均工资', code: 'unitaversalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '区级系数', code: 'qujixs', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '月基础工资', code: 'JCGZ', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '高温津贴发放月份', code: 'hightempmonth', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '高温津贴发放金额', code: 'hightempsalary', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '职称津贴等级', code: 'shgzslevel', type: 'selectDict', dict: 'usermanage.user.shgzslevel' }
            ]}, 
            { span: 8, components: [
              { name: '职称津贴金额', code: 'ZCJT', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '月均工资合计', code: 'allsalary', type: 'inputText' }
            ]},
          ]
        },
        { type: 'titleBar', code: 'after', name: '2018年套改后工资信息' },
        {
          type: 'colLayout',
          children: [
            { span: 8, components: [
              { name: '套改岗位', code: 'ca_postlevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '套改等级', code: 'ca_exchangelevel', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '学历倾斜', code: 'ca_eduinclinelevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '职称倾斜', code: 'ca_postinclinelevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '倾斜等级', code: 'ca_totalincline', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '累计套改等级', code: 'ca_totalexclevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '基础工资系数', code: 'ca_basicoef', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '全社会单位就业人员年平均工资', code: 'ca_avgsalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '区级系数', code: 'ca_qjcoef', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '月基础工资', code: 'ca_JCGZ', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '高温津贴发放月份', code: 'ca_hightempmonth', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '高温津贴发放金额', code: 'ca_GWBT', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '职称津贴等级', code: 'ca_shgzslevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '职称津贴金额', code: 'ca_ZCJT', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '月均工资合计', code: 'ca_aftersalary', type: 'inputText' }
            ]},
          ]
        },
        { type: 'titleBar', code: 'before', name: '2018年套改前工资信息' },
        {
          type: 'colLayout',
          children: [
            { span: 8, components: [
              { name: '基础工资等级', code: 'cb_basiclevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '基础工资金额', code: 'cb_basicsalary', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '工龄补贴年限', code: 'cb_workyear', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '工龄补贴金额', code: 'cb_workyearsalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '月度绩效等级', code: 'cb_mpferflevel', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '月度绩效金额', code: 'cb_mperfsalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '岗位补贴等级', code: 'cb_post', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '岗位补贴金额', code: 'cb_postsalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '职称津贴等级', code: 'cb_title', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '职称津贴金额', code: 'cb_titlesalary', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '长期服务社区津贴年限', code: 'cb_servyear', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '长期服务社区津贴金额', code: 'cb_servyearsalary', type: 'inputText' }
            ]},
            { span: 8, components: [
              { name: '高温津贴发放月份', code: 'cb_highmonth', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '高温津贴金额', code: 'cb_highsalary', type: 'inputText' }
            ]}, 
            { span: 8, components: [
              { name: '月均工资合计', code: 'cb_beforesalary', type: 'inputText' }
            ]},
          ]
        },
      ]
    }
  }
};
</script>
<style lang="less" scoped>
.main-form {
  height: 100%;
  padding-top: 10px;
}
</style>