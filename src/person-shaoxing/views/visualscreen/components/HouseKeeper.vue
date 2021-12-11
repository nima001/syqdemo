<template>
  <div class="main">
    <div class="left">
      <div class="monitor">
        <org-monitor></org-monitor>
      </div>
      <split-line/>
      <div class="retired">
        <retire-chart></retire-chart>
      </div>
      <split-line/>
      <div class="question">
        <org-question></org-question>
      </div>
    </div>
    <div class="middle">
      <div class="loop">
        <loop-city></loop-city>
      </div>
      <div class="LiquidSwiper">
        <liquid-swiper></liquid-swiper>
      </div>
      <split-line/>
      <div class="warn">
        <warn-info></warn-info>
      </div>
    </div>
    <div class="right">
      <div class="lineChart">
        <line-chart-wrap type="education"/>
      </div>
      <split-line/>
      <div class="lineChart">
        <line-chart-wrap type="health"/>
      </div>
      <split-line/>
      <div class="lineChart">
        <line-chart-wrap type="diseaseControl"/>
      </div>
    </div>
  </div>
</template>

<script>
import OrgMonitor from "../housekeeper/OrgMonitot";
import RetireChart from "../housekeeper/RetireChart";
import OrgQuestion from "../housekeeper/OrgQuestion";
import LoopCity from "../housekeeper/LoopCity";
import LiquidSwiper from "../housekeeper/LiquidSwiper";
import WarnInfo from "../housekeeper/WarnInfo";
import LineChartWrap from "../housekeeper/LineChartWrap";
import {mixins} from './minxin'
import SplitLine from './SplitLine.vue';

export default {
  components: {
    OrgMonitor,
    RetireChart,
    OrgQuestion,
    LoopCity,
    LiquidSwiper,
    WarnInfo,
    LineChartWrap,
    SplitLine
  },
  mixins:[mixins],
  created(){
    if(!this.dictCode.dictId){
      this.dictCode.dictId = "330600"
    }
  }
};
</script>
<style lang='less' scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding: 0px 12px;
  .left {
    width: 340px;
  }
  .middle {
    width: 695px;
  }
  .right {
    width: 330px;
    display: flex;
    flex-direction: column;
    .lineChart {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>