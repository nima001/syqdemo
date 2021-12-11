<template>
  <div class="form-panel">
    <div class="top_card">
      <div class="card" v-for="(item, index) in list" :key="index" @click="showDetail(item)">
        <div class="title">{{item.title}}</div>
        <proportion 
          :totalText="item.totalText" 
          :total="data[item.total]" 
          :numText="item.numText" 
          :num="data[item.num]" 
          :surplusText="item.surplusText" 
          class="content"
        />
      </div>
      <div class="total">
        <ul>
          <li v-for="(item, index) in totalList" :key="index" @click="showOrgList({
            title: item.name.substr(0, item.name.length - 1),
            unittypes: item.unittypes,
            fieldGroup: item.fieldGroup,
            code: item.code
          })">
            <div class="name">{{item.name}}</div>
            <div class="num" :class="{error: orgCount[item.name]>0}">{{orgCount[item.name]}}</div>
          </li>
        </ul>
      </div>
    </div>
    <a-modal v-model="detail.show" :title="detail.title" 
      width="700px" :footer="null" :bodyStyle="{padding: 0}"
    >
      <div class="detail-table-wrapper">
        <chart-table :table="detail.table" :warnCols="detail.warnCols" @click="showOrgList({
          title: $event.k0,
          unittypes: detail.unittypes,
          systype: $event.k0,
          fieldGroup: detail.fieldGroup
        })"/>
      </div>
    </a-modal>
    <a-modal v-model="orgList.show" :title="orgList.title"
      :width="orgList.width" :footer="null" :bodyStyle="{padding: 0, height: '580px'}"
    >
      <OrgList v-bind="orgList.props"/>
    </a-modal>
  </div>
</template>
<script>
import { Table, Modal } from "ant-design-vue";
import Proportion from './Proportion'
import ChartTable from './ChartTable'
import OrgList from './OrgList'
import { areaStatistics, chartBySystype } from '@/person-shaoxing/api/orgStaffReport'
import { showError } from '@framework/utils'

/**
 * 职数监测
 */
export default {
  name: 'PostReport',
  components: {
    ATable: Table,
    AModal: Modal,
    Proportion,
    ChartTable,
    OrgList
  },
  props: {
    district: {
      type: Object,
      default: () => ({})
    },
    orgCount: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      data: {},
      fieldGroup: [
        [
          { code: "ldzs_hd", name: "核定数", sort: '领导职数' },
          { code: "ldzs_hd_sy", name: "实配数", sort: '领导职数' },
          { code: "ldzsck", name: "超(-)空(+)数", warn: true, sort: '领导职数' },
        ],[
          { code: "zcldzs_hd", name: "核定数", sort: '中层领导职数(不含机关专职副书记)' },
          { code: "zcldzs_sy", name: "实配数", sort: '中层领导职数(不含机关专职副书记)' },
          { code: "xzzcldzscks", name: "超(-)空(+)数", sort: '中层领导职数(不含机关专职副书记)', warn: true },
          { code: "zzjgdwfsj_sy", name: "专职副书记" },
        ]
      ],
      list: [
        { 
          title: '行政领导职数', 
          total: 'hdldzsqy', totalText: '核定', 
          num: 'hdldzsqy_sy', numText: '实有', 
          surplusText: '空职数',
          unittypes: [1,5,7],
          fieldGroup: 0
        },
        { 
          title: '行政中层职数', 
          total: 'hdzcldzsqy', totalText: '核定', 
          num: 'hdzcldzsqy_sy', numText: '实有', 
          surplusText: '空职数',
          unittypes: [1, 5, 7],
          fieldGroup: 1
        },
        { 
          title: '事业领导职数', 
          total: 'syhdldzsqy', totalText: '核定', 
          num: 'syhdldzsqy_sy', numText: '实有', 
          surplusText: '空职数',
          unittypes: [2,3,11],
          fieldGroup: 0
        },
        { 
          title: '事业中层职数', 
          total: 'syhdzcldzsqy', totalText: '核定', 
          num: 'syhdzcldzsqy_sy', numText: '实有', 
          surplusText: '空职数',
          unittypes: [2,3,11],
          fieldGroup: 1
        },
      ],
      totalList: [
        { name: '行政领导超职机构数', code: 'ldzsck', unittypes: [1,5,7], fieldGroup: 0 },
        { name: '行政中层领导超职机构数', code: 'xzzcldzscks', unittypes: [1,5,7], fieldGroup: 1 },
        { name: '事业领导超职机构数', code: 'ldzsck', unittypes: [2,3,11], fieldGroup: 0 },
        { name: '事业中层领导超职机构数', code: 'xzzcldzscks', unittypes: [2,3,11], fieldGroup: 1 },
        { name: '行政领导配置异常机构数', code: 'xzzszzcks', unittypes: [1,5,7] },
        { name: '行政中层领导配置异常机构数', code: 'xzzczszzcks', unittypes: [1,5,7] },
        { name: '事业领导配置异常机构数', code: 'xzzszzcks', unittypes: [2,3,11] },
        { name: '事业中层领导配置异常机构数', code: 'xzzczszzcks', unittypes: [2,3,11] }
      ],
      detail: {
        show: false,
        title: undefined,
        table: undefined,
        warnCols: [],
        unittypes: undefined,
        fieldGroup: undefined,
      },
      orgList: {
        show: false,
        title: undefined,
        width: undefined,
        props: {
          district: undefined,
          unittypes: undefined,
          systype: undefined,
          filters: undefined,
          fields: undefined
        }
      }
    }
  },
  watch: {
    district(district){
      this.loadData(district.district);
    }
  },
  created(){
    this.loadData(this.district.district);
  },
  methods: {
    loadData(district){
      areaStatistics(district, [
        'hdldzsqy', 'hdldzsqy_sy', 
        'hdzcldzsqy', 'hdzcldzsqy_sy',
        'syhdldzsqy', 'syhdldzsqy_sy',
        'syhdzcldzsqy', 'syhdzcldzsqy_sy',
      ]).then(({result}) => {
        this.data = result;
      }).catch(error => {
        showError(error);
      });
    },
    showDetail(item){
      let fields = this.fieldGroup[item.fieldGroup];
      let d = { 
        show: true, 
        title: item.title, 
        unittypes: item.unittypes,
        fieldGroup: item.fieldGroup,
        warnCols: fields.filter(item => item.warn).map(item => {
          return '_id@organization.statistic.' + item.code;
        }),
        table: undefined,
      }
      chartBySystype(
        this.district.district, item.unittypes, fields
      ).then(({result}) => {
        d.table = result.data;
      }).catch(err => {
        showError(err)
      });
      this.detail = d;
    },
    showOrgList({title, unittypes, systype, fieldGroup, code}){
      let fields = [], filters, width = '700px';
      if(fieldGroup >= 0){
        fields = this.fieldGroup[fieldGroup]
      }else{
        fields = fields.concat.apply(fields, this.fieldGroup);
        width = "1000px";
      }
      if(code){
        filters = [{ field: '_id@organization.statistic.' + code, op: 'lt', value: 0}]
      }
      this.orgList = {
        show: true, title, width,
        props: {
          district: this.district.district,
          unittypes,
          systype,
          filters,
          fields: fields.map((item) => {
            return {
              key: '_id@organization.statistic.' + item.code,
              showname: item.name, 
              sort: item.sort,
              warn: item.warn
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.form-panel{
  width: 100%;
  > div{
    display: flex;
    justify-content: space-between;
  }
  .top_card{
    .card{
      width: 200px;
      border: 1px solid @border-color-split;
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        border-color: @primary-3;
        background-color: @primary-1;
        .title{
          border-color: @primary-3;
        }
      }
      .title{
        white-space: nowrap;
        overflow: hidden;
        line-height: 50px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid @border-color-split;
      }
      .content{
        margin-top: 10px;
        padding: 10px 0;
      }
    }
    .total{
      width: 430px;
      ul{
        margin: 0;
        li{
          width: 50%;
          text-align: center;
          border-bottom: 1px solid #e8e8e8;
          float: left;
          cursor: pointer;
          &:hover{
            background-color: @primary-1;
          }
          .name{
            line-height: 24px;
          }
          .num{
            font-weight: bold;
            height: 44px;
            line-height: 44px;
            color: #fec400;
          }
          .num.error{
            color: #e76043;
          }
        }
      }
    }
  }
}
.detail-table-wrapper{
  padding: @content-padding-v @content-padding-h;
  height: 550px;
  overflow: auto;
}
</style>