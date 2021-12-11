<template>
  <div class="issue-tracking">
    <div class="main">
      <div class="main-top">
        <div class="tabs">
          <a 
            v-for="(item, index) in tabs" 
            :key="index"
            :class="{active: active && active.id == item.id}"
            @click="active = item"
          >
            {{item.name}}
          </a>
        </div>
        <div class="org-select">
          <a-input
            style="width: 200px"
            :value="orgValue && orgValue.name"
            :read-only="true"
            placeholder="请选择机构"
            @click="showOrgSelect"
          >
            <a-icon slot="addonAfter" type="select" @click="showOrgSelect"/>
          </a-input>
        </div>
      </div>
      <div class="main-chart">
        <div v-show="showChart" class="g2-chart">
          <div class="g2-chart-top">
            <div class="left">
              <pie-chart
                :data="pieoneData"
                :loading="loading"
                :title="title + '问题总数分类情况'"
                :type="'ring'"
                :axisName="{fieldname:'类别', value:'问题数'}"
                :scaleConfig="scaleLegend"
                style="height: 400px;"
              >
              </pie-chart>
              <pie-chart
                :data="pietwoData"
                :loading="loading"
                :title="title + '现有问题分类情况'"
                :type="'ring'"
                :axisName="{fieldname:'类别', value:'问题数'}"
                :scaleConfig="scaleLegend"
                style="height: 400px;"
              >
              </pie-chart>
            </div>
            <div class="right">
              <column-chart
                :loading="loading"
                :title="title == '绍兴市' ? title + '各区县问题总数': title + '各序列问题总数'"
                :type="'fold'"
                :isRotate="true"
                :data="columnData"
                :axisName="{xname:'年份', value:'GDP(亿美元)', fieldname: '类型'}"
                :tooltipConfig="{showCrosshairs: false, shared: true}"
                :scaleConfig="columnScale"
                style="height: 800px;"
              >
              </column-chart>
            </div>
          </div>
          <div class="g2-chart-bottom">
            <line-chart
              :loading="loading"
              :data="lineData"
              :title="title + '月新增处理问题情况'"
              :isSmooth="false"
              :axisName="{xname:'年份', value:'GDP(亿美元)', fieldname:'国家'}"
              :tooltipConfig="{showCrosshairs: true, shared: true}"
              style="height: 400px;"
              >
            </line-chart>
          </div>
        </div>
        <table-list
          :showChart="showChart"
          :district="district"
          :orgid="orgValue && orgValue._id"
        >
        </table-list>
      </div>  
    </div>
    <!-- 机构选择弹框 -->
    <a-modal
      :footer="null"
      v-model="orgvisible"
      :width="500"
      title="选择单位"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <org-user-select mode="org" 
        @finish="orgOk" 
      />
    </a-modal>
  </div>
</template>
<script>
import { Input, Icon, Table, Modal } from "ant-design-vue";
import { problemmonitorChart } from "@/person-shaoxing/api/monitor";
import { listDistrict } from '@/person-shaoxing/api/orgStaffReport'
import OrgUserSelect from "@/person/components/OrgUserSelect";
import PieChart from '@/person-shaoxing/views/monitor/components/PieChart';
import ColumnChart from '@/person-shaoxing/views/monitor/components/ColumnChart';
import LineChart from '@/person-shaoxing/views/monitor/components/LineChart';
import TableList from "./TableList";
import { showError } from '../../../../framework/utils';
export default {
  name: '',
  components: {
    AInput: Input,
    AIcon: Icon,
    ATable: Table,
    AModal: Modal,
    OrgUserSelect,
    PieChart,
    ColumnChart,
    LineChart,
    TableList
  },
  data() {
    return {
      tabs: [],
      district: undefined,
      active: undefined,
      orgValue: undefined,
      orgvisible: false,
      title: '绍兴市',
      showChart: true,
      loading: false,
      pieoneData: [],
      pietwoData: [],
      columnData: [],
      lineData: [],
      scaleLegend: {
        fieldname: {
          formatter:(v)=>{
            return this.systype(v);
          }
        },
      },
      columnScale: {
        xname: {
          nice: true,
          formatter:(v)=>{
            if(this.district) {
              return this.area(v);
            }else{
              return this.areaCity(v);
            }
          }
        },
        value: {
          nice: true
        }
      }
    }
  },
  watch: {
    active: {
      handler(val) {
        this.district = val.district;
        this.orgValue = undefined;
        this.title = val.name;
        if(!this.showChart) {
          this.showChart = true;
        }
        if(this.tabs && this.tabs.length > 0) {
          this.getData(val.district);
        }
      },
    }
  },
  created() {
    this.listDistrict();
  },
  methods: {
    listDistrict() {
      listDistrict().then(({result}) => {
        this.tabs = (result || []);
        this.active = this.tabs[0];
      }).catch(error => {
        showError(error);
      })
    },
    getData(district) {
      this.loading = true;
      let charttype = district ? 3 : 4;
      Promise.all([
        problemmonitorChart({ district, charttype: 1 })
          .then(({result}) => result).catch((err) => Promise.resolve([])),
        problemmonitorChart({ district, handlestatus: 0, charttype: 1 })
          .then(({result}) => result).catch((err) => Promise.resolve([])),
        problemmonitorChart({ district, charttype: charttype })
          .then(({result}) => result).catch((err) => Promise.resolve([])),
        problemmonitorChart({ district, charttype: 5 })
          .then(({result}) => result).catch((err) => Promise.resolve([])),
      ])
      .then(([pieoneData, pietwoData, columnData, lineData]) => {
        let pieoneRows = (pieoneData && pieoneData.rows) || [];
        let pietowRows = (pietwoData && pietwoData.rows) || [];
        let columnRows = (columnData && columnData.rows) || [];
        let lineRows = (lineData && lineData.rows) || [];

        this.loading = false;
        this.pieoneData = [];
        this.pietwoData = [];
        this.columnData = [];
        this.lineData = [];

        pieoneRows.forEach(item => {
          this.pieoneData.push({fieldname: item.k0 + '',value: item.v0});
        });
        pietowRows.forEach(item => {
          this.pietwoData.push({fieldname: item.k0 + '', value: item.v0});
        });
        columnRows.forEach(item => {
          this.columnData.push({fieldname: '未处理', value: item.v0, xname: item.k0 + ''});
          this.columnData.push({fieldname: '已处理', value: item.v1, xname: item.k0 + ''});
        });
        lineRows.forEach(item => {
          this.lineData.push({fieldname: '新增', value: item.v0, xname: item.k0 + ''});
          this.lineData.push({fieldname: '处理', value: item.v1, xname: item.k0 + ''});
        });
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    systype(key){
      let d = this.$store.getters.dictKey("person.shaoxing.monitor.businesstype", key);
      return (d && d.text) || '';
    },
    areaCity(key){
      let d = this.$store.getters.dictKey("usermanage.org.district", key);
      return (d && d.text) || '';
    },
    area(key){
      let d = this.$store.getters.dictKey("usermanage.org.systype", key);
      return (d && d.text) || '';
    },
    showOrgSelect() {
      this.orgvisible = true;
    },
    orgOk(type, list) {
      this.orgvisible = false;
      if(type == "ok" && list.length > 0) {
        this.showChart = false;
        this.orgValue = list[0];
      } 
    }
  }
}
</script>
<style lang="less" scoped>
.issue-tracking{
  padding: 10px;
  height: 100%;
  .main{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    background: @white;
    height: 100%;
    .main-top{
      margin-top: 10px;
      padding: 0 @content-padding-h;
        .tabs{
          padding: @content-padding-v 0;
          a{
            display: inline-block;
            height: 26px;
            line-height: 26px;
            padding: 0 12px;
            margin-left: 6px;
            border-radius: @border-radius-base;
            &:first-child{
              margin-left: 0;
            }
            &:hover{
              background: @primary-1;
            }
          }
          a.active{
            background-color: @primary-color;
            color: white;
            &:hover{
              background: lighten(@primary-color, 5%);
            }
          }
        }
    }
    .main-chart{
      flex-shrink: 1;
      overflow-y: auto;
      .g2-chart{
        .g2-chart-top{
          display: flex;
          > div{
            width: 50%;
          }
        }
      }
    }
  }
}
</style>