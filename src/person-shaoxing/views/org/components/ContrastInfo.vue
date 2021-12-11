<template>
  <div class="org-comp">
    <a-spin :spinning="loading">
      <div class="spin-content">
        <table class="body" v-if="!loading">
          <thead>
            <tr>
              <td class="name tag"></td>
              <td v-for="item in orgs" :key="item.orgid">{{item.orgname}}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in table.header" :key="c.column" :class="{odd: index%2 != 1}">
              <td class="name">{{c.name}}</td>
              <td v-for="item in orgs" :key="item.orgid">{{getOrgByid(item.orgid)[c.column]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { Table, Spin } from "ant-design-vue";
import { showError } from "@framework/utils/index";
import { map } from 'lodash';
import { orglinedetail } from "@/person-shaoxing/api/information";
import { organization } from '@person/api/org';
import { orgpropertyquery } from '@/person-shaoxing/api/orgStaffReport';
export default {
  props: {
    lineid: Number
  },
  components: {
    ASpin: Spin,
    ATable: Table,
  },
  data() {
    return {
      table: [],
      orgs: [],
      loading: false,
    };
  },
  computed: {
    orgMap(){
      let map = {};
      this.table.rows.forEach(item => {
        map[item._id] = item;
      })
      return map;
    }
  },
  created(){
    if(this.lineid){
      this.loadData(this.lineid);
    }
  },
  methods: {
    getOrgByid(id){
      return this.orgMap[id] || {}
    },
    async loadData(lineid){
      try {
        this.loading = true;
        let {result: { orgs }} = await orglinedetail(lineid);
        let orginfo = await organization(orgs[0].orgid);
        let orgids = orgs.map((item) => item.orgid);
        let propertycodes = undefined;
        if(orginfo.result.unittype==1) {
          // this.columns = this.columns_xz;
          propertycodes = [
            // 'name',
            'politicallevel','_deptcount',
            '_id@organization.statistic.dzqjgxzbz', '_id@organization.statistic.dzqjgxzbz_sy', 
            '_id@organization.statistic.gqbz' , '_id@organization.statistic.gqbz_sy',
            '_id@organization.statistic.bmldzz', '_id@organization.statistic.bmldzz_sy', 
            '_id@organization.statistic.bmldfz', '_id@organization.statistic.bmldzz_sy', 
            '_id@organization.statistic.nsjgldzsgps', '_id@organization.statistic.nsjgldzsgps_sy',
            '_id@organization.statistic.bwkzs', '_id@organization.statistic.bwsys',
            '_deptnames', '_id@organization.statistic.tx_two_xz'
          ];
        }else if(orginfo.result.unittype==3) {
          // this.columns = this.columns_sy;
          propertycodes = [
            // 'name',
            'politicallevel','unitsort','fundform','ifcangong',
            '_deptcount','_id@organization.statistic.bzajfxs','_id@organization.statistic.bzajfxs_sy',
            '_id@organization.statistic.bmldzz', '_id@organization.statistic.bmldzz_sy', 
            '_id@organization.statistic.bmldfz', '_id@organization.statistic.bmldzz_sy', 
            '_id@organization.statistic.bwkzs',
            '_id@organization.statistic.bwsys','_id@organization.statistic.tx_two_sy'
          ];
        }
        let { result } = await orgpropertyquery({
          orgids: orgids,
          propertycodes: propertycodes
        });
        this.orgs = orgs;
        this.table = result;
        map(this.table.rows, (item)=> {
          if(item['_deptnames']) {
            item['_deptnames'] = item['_deptnames'].join('，');
          }
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        showError(error);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.org-comp{
  overflow: auto;
  height: 100%;
  padding: @padding-lg;
  /deep/.ant-spin-nested-loading {
    height: 100%;
  }
}
.body{
  width: 100%;
  margin-top: 20px;
  table-layout: fixed;
  font-size: 16px;
  thead{
    background: #fafafa;
    padding-bottom: 10px;
  }
  tbody {
    & tr:hover {
      background: @primary-1;
      cursor: pointer;
    }
  }
  td{
    padding: 9px 9px;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
    line-height: 1.4em;
    min-height: 40px;
    &.name{
      width: 200px;
      text-align: left;
      padding-left: 20px;
    }
  }
  & .odd{
    // background-color: #111c31;
  }
}
</style>
