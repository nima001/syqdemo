<template>
  <div class="analyse">
    <div class="top">
      <a-month-picker
        :allowClear="false"
        placeholder="请选择月份"
        :default-value="moment(date, monthFormat)"
        :format="monthFormat"
        @change="dateChange"
        :style="{width:'200px'}"
      ></a-month-picker>
    </div>
    <div class="middle">
      <div class="cell">
        <p class="title">考勤异常概况</p>
        <div class="content">
          <error-gather :date="date"></error-gather>
        </div>
      </div>
      <div class="cell">
        <p class="title">考勤异常比例</p>
        <div class="content">
          <circle-chart :date="date"></circle-chart>
        </div>
      </div>
      <div class="cell">
        <p class="title">近三月异常率趋势</p>
        <div class="content">
          <line-chart></line-chart>
        </div>
      </div>
      <div class="cell">
        <p class="title">异常率排行前十</p>
        <div class="content">
          <bar-chart :date="date"></bar-chart>
        </div>
      </div>
      <div class="cell">
        <p class="title">异常率汇总</p>
        <div class="content">
          <rate-gather :date="date"></rate-gather>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DatePicker } from "ant-design-vue";
import ErrorGather from "./g2/ErrorGather";
import CircleChart from "./g2/CircleChart";
import BarChart from "./g2/BarChart";
import LineChart from "./g2/LineChart";
import RateGather from "./g2/RateGather";
import moment from "moment";
export default {
  components: {
    ErrorGather,
    CircleChart,
    BarChart,
    LineChart,
    RateGather,
    AMonthPicker: DatePicker.MonthPicker
  },
  data() {
    return {
      monthFormat: "YYYY-MM",
      date: moment(new Date().toLocaleDateString()).format('YYYY-MM')
    };
  },
  methods: {
    moment,
    dateChange(v1, v2) {
      this.date = v2;
    }
  }
};
</script>
<style lang='less' scoped>
.analyse {
  width: 100%;
  height: 100%;
  border-radius: @border-radius-base;
  display: flex;
  flex-direction: column;
  .top {
    text-align: right;
    padding: @content-padding-v @content-padding-h;
    background: @white;
    border-radius: @border-radius-base;
  }
  .middle {
    flex: 1;
    min-height: 0px;
    overflow-y: auto;
    margin-top: @layout-space-base;
    .cell {
      margin-top: @layout-space-base;
      border-radius: @border-radius-base;
      padding: @content-padding-v @content-padding-h;
      background: @white;
      display: flex;
      flex-direction: column;
      &:first-child {
        margin-top: 0px;
      }
      .title {
        margin: 0px;
        color: #262626;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
</style>