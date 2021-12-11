<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <p>参公事业单位</p>
        <LcdFont :length="5" :realNumber="(num.text&&num.text.cgsyjgs)?num.text.cgsyjgs:0" :realStyle="realStyle" :fakeStyle="fakeStyle"/>
      </div>
      <div class="right">
        <p>非参公事业单位</p>
        <LcdFont :length="5" :realNumber="(num.text&&num.text.fcgsyjgs)?num.text.fcgsyjgs:0" :realStyle="realStyle" :fakeStyle="fakeStyle"/>
      </div>
    </div>
    <div class="bottom">
      <div class="ring" v-for="(item, type) in data" :key="type">
        <RingChart
          :data="item.data"
          :settings="{
            canvas: { height: 400 },
            padding: [-90,0,0,-50],
            radius: 0.5,
            innerRadius: 0.8,
            tooltip: {
              visible: true,
            },
            gemo: {
              color: ['#F2A54D','#60B4F5','#F84848','#DF6EA3','#6EDF75','#A66DF5','#C3F1CE','#A0A4F5'],
            },
            infoText: {
              title: item.data.rows[0].k0,
              offsetY: -20,
              style: { fontSize: 18, fill: '#fff', textAlign: 'center' },
            },
            contentStyle: {
              offsetY: 10,
              fontSize: 25, fill: '#fff', textAlign: 'center'
            }
          }"
        >
          <template v-slot:customLegend="props">
            <div class="legend">
              <p class="title">
                {{item.settings.name}}
              </p>
              <ul>
                <li v-for="(row, index) in item.data.rows" :key="index" @click="showOrgList(row, type)">
                  <span class="left">
                    <span :style="{background: props[index]}" class="spot"></span>
                    <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
                      <template slot="title">
                        <span>{{row.k0}}</span>
                      </template>
                        <span>{{row.k0}}</span>
                    </a-tooltip>
                  </span>
                  <span>{{row.v}}</span>
                </li>
              </ul>
            </div>
          </template>
        </RingChart>
      </div>
    </div>
    <dialog-box v-model="showOrgs" :title="dialogTitle">
      <!-- <OrgList :district="districtCode" :unittypes="[3]" :filter="filter" /> -->
      <DistrictDetail
        :title="title"
        :fields="fields"
        :districtCode="districtCode"
        :districts="districts"
        :fundforms="fundforms"
        :unitsort="unitsort"
        :jgtypes="[3]"
        @loadData="loadData"/>
    </dialog-box>
  </div>
</template>
<script>
import { Tooltip } from 'ant-design-vue';
import DialogBox from '../components/DialogBox';
import OrgList from '../components/OrgList';
import LcdFont from './LcdFont';
import DistrictDetail from './DistrictDetail';
import { includes, values } from 'lodash';
import RingChart from "@person/components/chart/RingChart";
import { areaStatistics } from '@/person-shaoxing/api/orgStaffReport'

export default {
  components: {
    DialogBox,
    RingChart,
    LcdFont,
    OrgList,
    DistrictDetail,
    ATooltip: Tooltip
  },
  props: {
    districtCode: String,
    num: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    data: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data(){
    return {
      showOrgs: false,
      show: false,
      fields: undefined,
      fundforms: undefined,
      unitsort: undefined,
      realStyle: {
        color: "#FF7C28",
        textStroke: "1 #ECA066",
        opacity: 0.95,
        fontSize: '3em',
      },
      fakeStyle: {
        fontSize: '3em',
      },
      dialogTitle: undefined,
      title: undefined,
      filter: undefined
    }
  },
  created(){
    // console.log(this.data)
  },
  watch: {
    fundform(val) {
      return val;
    },
    unitsort(val) {
      return val;
    },
    districts(val) {
      return val;
    }
  },
  computed: {
    districts() {
      let v = this.$store.getters.dict('usermanage.org.district');
      return v;
    },
    fundform() {
      let v = this.$store.getters.dict('usermanage.org.fundform');
      return v || [];
    },
    unitsorts() {
      let v = this.$store.getters.dict('usermanage.org.unitsort');
      return v || [];
    },
  },
  methods: {
    showOrgList(item, type) {
      if(type === 0){
        let v = this.fundform.filter((type)=>type.text==item.k0);
        this.fundforms = v[0].value;
        this.unitsort = undefined;
        if(v[0].key=='qebk') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.qebksydwjgs", showname: "全额拨款事业单位机构数" }
          ];
          this.title = '全额拨款事业单位机构列表';
          this.dialogTitle = '全额拨款事业单位机构数';
        }else if(v[0].key=='cebt') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.cebtsydwjgs", showname: "差额补贴事业单位机构数" }
          ];
          this.title = '差额补贴事业单位机构列表';
          this.dialogTitle = '差额补贴事业单位机构数';
        }else if(v[0].key=='jfzl') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.zszzsydwjgs", showname: "自收自支事业单位机构数" }
          ];
          this.title = '自收自支事业单位机构列表';
          this.dialogTitle = '自收自支事业单位机构数';
        }
        // this.filter = [
        //   { 
        //     field: { key: "fundform", showname: "经费形式" },
        //     op: "eq",
        //     value: this.fundforms && this.fundforms.value
        //   }
        // ];
      }else{
        let v = this.unitsorts.filter((type)=>includes(type.text,item.k0));
        this.unitsort = v[0].value;
        this.fundforms = undefined;
        if(v[0].key=='ybsydw') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.ybsydwjgs", showname: "一般事业单位机构数" }
          ];
          this.title = '一般事业单位机构列表';
          this.dialogTitle = '一般事业单位机构数';
        }else if(v[0].key=='xx（bhsg）') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.xxjgs", showname: "学校机构数" }
          ];
          this.title = '学校机构列表';
          this.dialogTitle = '学校机构数';
        }else if(v[0].key=='yy（bhsg）') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.yyjgs", showname: "医院机构数" }
          ];
          this.title = '医院机构列表';
          this.dialogTitle = '医院机构数';
        }else if(v[0].key=='sysybzdqtdw') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.sysybzdqtdwjgs", showname: "使用事业编制的其他单位机构数" }
          ];
          this.title = '使用事业编制的其他单位机构列表';
          this.dialogTitle = '使用事业编制的其他单位机构数';
        }else if(v[0].key=='ggdcxsydw') {
          this.fields = [
            { key: "name", showname: "机构名称" },
            { key: "_id@organization.statistic.ggdcxsydwjgs", showname: "改革待撤销事业单位机构数" }
          ];
          this.title = '改革待撤销事业单位机构列表';
          this.dialogTitle = '改革待撤销事业单位机构数';
        }
        // this.filter = [
        //   { 
        //     field: { key: "unitsort", showname: "单位分类" },
        //     op: "eq",
        //     value: unitsorts && unitsorts.value
        //   }
        // ];
      }
      this.showOrgs = true;
    },
    loadData() {
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    .left, .right {
      width: 20%;
      text-align: center;
      p {
        margin-bottom: 10px;
        color: #fff;
        font-size: 1.3em;
      }
    }
  }
  .bottom {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-around;
    .ring {
      flex: 1;
      display: flex;
      align-items: center;
      /deep/.ring-chart {
        .chart {
          width: 60%;
          position: relative;
          &::before {
            content: '';
            background: #242B5B;
            position: absolute;
            width: 210px;
            height: 210px;
            left: 11.5%;
            top: 10.5%;
            border-radius: 50%;
          }
        }
      }
      .title {
        margin-bottom: 20px;
        font-size: 1.4em;
        font-weight: 600;
      }
      .legend {
        width: 50%;
        height: 500px;
        padding: @padding-lg;
        text-align: left;
        position: absolute;
        top: 50%;
        left: 45%;
        transform: translateY(-50%);
        color: fade(#fff, 80%);
        display: flex;
        flex-direction: column;
        .title {
          text-align: center;
          position: relative;
          left: -50%;
        }
        ul {
          width: 265px;
          height: 240px;
          border-radius: 10px;
          padding: @padding-md @padding-md @padding-md 50px;
          margin: 0;
          margin-left: auto;
          background: url('../../../assets/img/screen/age-education-bg.png') no-repeat;
          background-size: cover;
          overflow-y: auto;
          li {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 1.2em;
            cursor: pointer;
            user-select: none;
            .left {
              width: 70%;
              margin-right: 10px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              .spot {
                width: 10px;
                height: 10px;
                margin-right: 10px;
                border-radius: @border-radius-base;
                display: inline-block;
              }
            }
            &:hover {
              color:#fff;
            }
            & > span:last-child {
              color: #02E7EF;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>