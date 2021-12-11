<template>
  <div class="view">
    <ul class="left">
      <li
        v-for="(item,index) in project"
        :key="index"
        @click="select(item)"
        :class="{active:activeItem.name == item.name}"
      >
        <span class="name">{{item.name}}</span>
        <span class="num">{{item.num}}</span>
      </li>
    </ul>
    <div class="right">
      <div class="header">
        <div class="title">{{activeItem.name}}</div>
        <div class="h1">未来七天预约情况</div>
      </div>
      <div class="content" ref="chart"></div>
    </div>
  </div>
</template>
<script>
import { Chart } from "@antv/g2";
export default {
  data() {
    return {
      activeItem: { name: "医保综合", num: 655 },
      project: [
        { name: "医保综合", num: 655 },
        { name: "社保综合", num: 1257 },
        { name: "公积金综合", num: 567 },
        { name: "综合业务", num: 124 },
        { name: "查询", num: 1257 },
        { name: "公安户籍", num: 123 },
        { name: "一手房", num: 127 },
        { name: "天然气", num: 397 },
        { name: "供电", num: 554 },
        { name: "供水", num: 253 },
        { name: "其他业务", num: 645 }
      ],
      plot: undefined,
      list: [
        { year: "8:00", value: 3 },
        { year: "9:00", value: 4 },
        { year: "10:00", value: 3.5 },
        { year: "11:00", value: 5 },
        { year: "12:00", value: 4.9 },
        { year: "13:00", value: 6 },
        { year: "14:00", value: 7 },
        { year: "15:00", value: 9 },
        { year: "16:00", value: 13 },
        { year: "17:00", value: 6 }
      ]
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    select(item) {
      this.activeItem = item;
    },
    draw() {
      if (!this.$refs.chart) {
        return false;
      }
      if (this.plot) {
        this.plot.destroy();
      }
      const chart = new Chart({
        container: this.$refs.chart,
        padding: [20, 20, 35, 35], // 上，右，下，左
        autoFit: true
      });
      chart.data(this.list);
      chart.scale({
        year: {
          range: [0, 1]
        },
        value: {
          min: 0,
          nice: true,
          alias: "取号量"
        }
      });
      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      });
      chart
        .line()
        .position("year*value")
        .label("value");
      chart.point().position("year*value");

      chart.render();
      this.plot = chart;
    }
  }
};
</script>
<style lang='less' scoped>
.view {
  display: flex;
  padding-top: 30px;
  .left {
    width: 194px;
    height: 534px;
    margin: 0px;
    padding: 16px 8px;
    background: url("../../assets/img/book-list.png") no-repeat center center;
    li {
      height: 33px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(110, 255, 253, 0.1);
      margin-top: 8px;
      padding: 0px 22px 0px 12px;
      cursor: pointer;
      &:first-child {
        margin-top: 0px;
      }
      &.active {
        .name,
        .num {
          color: #2bffff;
          opacity: 1;
        }
      }
      .name {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.6;
      }
      .num {
        font-size: 20px;
        font-family: D-DIN;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.6;
      }
    }
  }
  .right {
    margin-left: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      .title {
        height: 24px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 24px;
        color: #2bffff;
        opacity: 0.8;
        position: relative;
        padding-left: 12px;
        &::before {
          content: "";
          width: 4px;
          height: 18px;
          background: #22d2d1;
          opacity: 1;
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .h1 {
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 24px;
        color: #ffffff;
        opacity: 0.8;
        padding: 15px 0px;
      }
    }
    .content {
      flex: 1;
    }
  }
}
</style>