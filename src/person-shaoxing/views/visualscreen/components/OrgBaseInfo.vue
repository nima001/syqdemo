<template>
  <table class="org-info">
    <tr>
      <td class="name">机构名称：</td>
      <td>{{info.name}}</td>
      <td class="name">合署机构：</td>
      <td>{{info.unionname}}</td>
    </tr>
    <tr>
      <td class="name">挂牌机构：</td>
      <td>{{info.attachname}}</td>
      <td class="name">机构级别</td>
      <td>{{dictText('usermanage.org.politicallevel', info.politicallevel)}}</td>
    </tr>
    <tr>
      <td class="name">机构类别：</td>
      <td>{{dictText('usermanage.org.syssort', info.syssort)}}</td>
      <td class="name">系统类别：</td>
      <td>{{dictText('usermanage.org.systype', info.systype)}}</td>
    </tr>
    <tr>
      <td class="name">统一社会代码：</td>
      <td>{{info.usccode}}</td>
      <td class="name">法人代表：</td>
      <td>{{info.corporate}}</td>
    </tr>
    <tr>
      <td class="name">隶属（举办单位）：</td>
      <td>{{info.dependent}}</td>
      <td class="name">机构标签：</td>
      <td>{{info.label}}</td>
    </tr>
    <tr>
      <td class="name">规范简称：</td>
      <td>{{info.shortname}}</td>
      <td class="name">是否开发区机构</td>
      <td>{{info.development ? '是' : '否'}}</td>
    </tr>
    <tr>
      <td class="name">单位地址：</td>
      <td>{{info.address}}</td>
      <td class="name">备注：</td>
      <td>{{info.remark}}</td>
    </tr>
  </table>
</template>
<script>
import { organization } from '@person/api/org'
import { showError } from '@framework/utils';

export default {
  props: {
    orgid: String
  },
  data(){
    return {
      info: {}
    }
  },
  created(){
    if(this.orgid){
      this.getOrg(this.orgid);
    }
  },
  methods: {
    getOrg(orgid){
      organization(orgid).then(({result}) => {
        this.info = result;
      }).catch(error => {
        showError(error);
      })
    },
    dictText(dict, value){
      let d = this.$store.getters.dictKey(dict, value);
      return d ? d.text : value;
    }
  }
}
</script>
<style lang="less" scoped>
.org-info{
  font-size: 16px;
  color: #fff;
  width: 100%;
  margin-top: 20px;
  table-layout: fixed;
  .name{
    padding: 10px 5px;
    width: 10em;
  }
}
</style>