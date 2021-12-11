<template>
  <div class="work-chart">
    <div class="toggle">
      <span v-for="(tab, index) in toggleList" :key="index">{{tab.name}}</span>
    </div>
    <div class="main">
      <div class="total">
        <div class="total-list" v-for="(total, index) in totalList" :key="index">
          <div class="name">{{total.name}}</div>
          <div class="num">{{total.num}}</div>
          <div class="side"></div>
        </div>
      </div>
      <div class="chart">
        <div id="work" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  props: {},
  components: {},
  data() {
    return {
      toggleList: [{ name: "大厅运行情况" }],
      totalList: [
        { name: "取号量", num: 723 },
        { name: "预约量", num: 24 },
        { name: "等候人数", num: 25 },
        { name: "办件量", num: 645 },
        { name: "当日满意率", num: "100%" }
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const data = [
        { year: "8:00", value: 0 },
        { year: "9:00", value: 11 },
        { year: "10:00", value: 35 },
        { year: "11:00", value: 50 },
        { year: "12:00", value: 40 },
        { year: "13:00", value: 45 },
        { year: "14:00", value: 50 },
        { year: "15:00", value: 35 },
        { year: "16:00", value: 24 },
        { year: "17:00", value: 5 }
      ];
      const chart = new Chart({
        container: "work",
        autoFit: true
        // height: 50,
        // padding:['20', '20', '20', '20',]
      });

      chart.data(data);
      // chart.scale({
      //   value: {
      //     min: 10000,
      //     nice: true,
      //   },
      //   year: {
      //     range: [0, 1],
      //   },
      // });
      chart.scale("year", {
        alias: "时间"
      });
      chart.axis("year", {
        title: {}
      });
      chart.scale("value", {
        min: 0,
        nice: true,
        alias: "人数"
      });
      chart.axis("value", {
        title: {}
      });
      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      // chart.axis('value', {
      //   label: {
      //     formatter: (val) => {
      //       return val + 'k';
      //     },
      //   },
      // });

      chart
        .area()
        .position("year*value")
        .shape("smooth");
      chart
        .point()
        .position("year*value")
        .shape("circle");
      chart
        .line()
        .position("year*value")
        .shape("smooth");

      chart.render();
    }
  }
};
</script>
<style lang="less" scoped>
.work-chart {
  height: 100%;
  .toggle {
    padding: 10px @padding-lg;
    span {
      width: 128px;
      height: 35px;
      border: 1px solid #1b5293;
      opacity: 1;
      border-radius: 3px 3px 0px 3px;
      display: block;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      line-height: 35px;
      color: #1b5293;
      text-align: center;
    }
  }
  .main {
    height: calc(~"100% - 59px");
    .total {
      padding: @padding-xs @padding-lg;
      display: flex;
      .total-list {
        width: 16.66%;
        text-align: center;
        position: relative;
        &:nth-child(1) {
          .side {
            display: none;
          }
        }
        .num {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #5488d1;
          opacity: 1;
        }
        .name {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          opacity: 1;
        }
        .side {
          position: absolute;
          left: 0;
          top: 10px;
          width: 1px;
          height: 30px;
          background-color: #bbb;
        }
      }
    }
    .chart {
      // height: calc(~'100% - 67px');
      // min-height: 300px;
      padding: 0 @padding-lg;
      .chart-container {
        min-height: 300px;
        padding: @padding-xs 0;
      }
    }
  }
}
</style>