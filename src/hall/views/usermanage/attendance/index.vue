<template>
  <div class="attendance">
    <div class="main">
      <div class="switch">
        <a-tabs default-active-key="AttendanceRecord" @change="callback">
          <a-tab-pane :key="item.cmpt" :tab="item.name" v-for="item in cmptList"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <component :is="activeCmpt"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
import AttendanceRecord from "./components/AttendanceRecord";
import AttendanceError from "./components/AttendanceError";
import AppealRecord from "./components/AppealRecord";
import AttendanceAnalyse from "./components/AttendanceAnalyse";
import AttendanceSet from "./components/AttendanceSet";
export default {
  components: {
    AttendanceRecord,
    AttendanceError,
    AttendanceAnalyse,
    AttendanceSet,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AppealRecord
  },
  data() {
    return {
      activeCmpt: undefined
    };
  },
  watch:{
    cmptList:{
      handler(v){
        if(v.length > 0){
          this.activeCmpt = v[0].cmpt
        }
      },
      deep:true,
      immediate:true
    }
  },
  computed:{
    cmptList(){
      let permit = this.hasPermit('/access/leader');
      let list = [        
        { name: "考勤异常统计", cmpt: "AttendanceError",index:2 },
        { name: "考勤分析", cmpt: "AttendanceAnalyse",index:4 },
      ]
      if(!permit){
        list = [...list,{ name: "考勤记录", cmpt: "AttendanceRecord" ,index:1},{ name: "考勤申诉",cmpt:"AppealRecord",index:3}]
      }
      if(!permit && !this.hasPermit('/access/orgleader')){
        list = [...list,{ name: "考勤设置", cmpt: "AttendanceSet",index:5 }]
      }
      list.sort((a,b)=>{
        return a.index - b.index
      })
      return list;
    }
  },
  methods: {
    callback(key) {
      this.activeCmpt = key;
    }
  }
};
</script>
<style lang='less' scoped>
.attendance {
  width: 100%;
  height: 100%;
  padding: @layout-space-base;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .switch {
      background: @white;
      padding: @content-padding-v @content-padding-h;
      border-radius: @border-radius-base;
      /deep/ .ant-tabs-tab {
        color: #262626;
        font-size: 14px;
        font-weight: bold;
        margin-right: 36px;
        padding: @padding-sm @padding-xs;
      }
    }
    .content {
      margin-top: @layout-space-base;
      border-radius: @border-radius-base;
      flex: 1;
      min-height: 0px;
    }
  }
}
</style>