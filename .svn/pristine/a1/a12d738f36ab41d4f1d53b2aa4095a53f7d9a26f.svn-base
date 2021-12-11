<template>
  <div class="detail_info">
    <div class="top">
      <div class="left">
        <div class="proportion" ref="proportion"></div>
      </div>
      <div class="right">
        <div class="title_bar">
          <div class="title_cell active">
            <span class="title">今年总分</span>
            <span class="num">77.38</span>
            <span class="unit">分</span>
          </div>
          <div class="title_cell">
            <span class="title">去年总分</span>
            <span class="num">77.38</span>
            <span class="unit">分</span>
          </div>
        </div>
        <div class="info_cell">
          <div class="cell" v-for="(item,index) in trend" :key="index">
            <p class="title">{{item.name}}</p>
            <div class="trend" :class="item.trend">
              <span class="name">{{item.num}}项</span>
              <span class="icon" v-if="item.trend"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="table">
        <a-table
          rowKey="index"
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          :scroll="{ y: 480 }"
        ></a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Table } from "ant-design-vue";
import counterData from "./count";
import { Chart } from '@antv/g2';
import { DataView } from '@antv/data-set';
export default {
  components: {
    ATable: Table
  },
  props:{
    dataSource:{
      type:Array
    },
    columns:{
      type:Array
    }
  },
  data() {
    return {
      trend: [
        { name: "单项指标相比往年上升", num: "1", trend: "up" },
        { name: "单项指标相比往年持平", num: "5" },
        { name: "单项指标相比往年下降", num: "1", trend: "down" }
      ]
    };
  },
  mounted(){
    this.drawProportion([
      { item: '履职效能', score: 90, before: 88 },
      { item: '协同效应', score: 100, before: 90 },
      { item: '年龄结构', score: 70, before: 75 },
      { item: '学历结构', score: 60, before: 60 },
      { item: '人员调配', score: 99, before: 80 },
      { item: '纪律执行', score: 40, before: 60 },
    ], { score: '本年度', before: '上年度' });
  },
  methods: {
    drawProportion(list, fold) {
      const dv = new DataView().source(list);
      dv.transform({
        type: 'fold',
        fields: Object.keys(fold), // 展开字段集
        key: 'type', // key字段
        value: 'value', // value字段
      });
      const chart = new Chart({ container: this.$refs.proportion,padding:[10], autoFit: true });
      chart.data(dv.rows.map(item => {
        item.type = fold[item.type];
        return item;
      }));
      chart.scale("value", { max: 100, min: 0 });
      chart.coordinate('polar', {
        radius: 0.75,
      });
      chart.axis("item", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            }
          }
        },
        label: {
          style: {
            fill: '#fff',
            fontSize: 15,
          }
        }
      });
      chart.axis("value", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
              stroke: '#fff'
            }
          },
          closed: false,
          alternateColor: ['#A1A4A9CC', '#90949ACC', '#777C88CC', '#5B616CCC', '#353C49CC']
        },
        label: null
      });
      chart.point().position("item*value").color("type")
        // .label("value", {
        //   labelEmit: true,
        //   offset: -20,
        //   layout: {
        //     type: "overlap"
        //   },
        //   style: {
        //     fontSize: 16,
        //     fill: "#FFF",
        //   },
        // })
        .shape("circle").size(3);
      chart.line().position("item*value").color("type", ['#2BFFFF', '#FFBF2B']).size(1.5);
      // chart.area().position('item*value').color('type');
      chart.tooltip({
        shared: true,
      });
      chart.legend({
        layout: 'vertical',
        position: 'right-top',
        marker: {
          symbol: 'square',
          style: {
            lineWidth: 0,
          }
        },
        itemName: {
          style: {
            fill: "#FFF",
            opacity: .8,
          }
        },
        offsetY: 40,
      });
      chart.render();
      // this.plot = chart;
    },
  }
};
</script>
<style lang='less' scoped>
@font-face {
  font-family: LESLIE;
  src: url("../components/assets/font/LESLIEB_.TTF") format("truetype");
}
.detail_info {
  .top {
    display: flex;
    .left {
      width: 390px;
      height: 160px;
      .proportion{
        width: 100%;
        height: 100%;
      }
    }
    .right {
      padding-top: 20px;
      .title_bar {
        width: 754px;
        height: 58px;
        padding: 0px 114px;
        line-height: 58px;
        background: url("../../../assets/img/screen/title-bj.png") no-repeat
          center center;
        display: flex;
        justify-content: space-between;
        .title_cell {
          display: inline-flex;
          &.active {
            .num,
            .unit {
              color: #2bffff;
              opacity: 1;
            }
          }
          .title {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: @white;
            opacity: 1;
          }
          .num {
            font-size: 48px;
            font-family: LESLIE;
            font-weight: 400;
            color: @white;
            opacity: 0.6;
            margin: 0px 8px 0px 12px;
          }
          .unit {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 21px;
            line-height: 80px;
            color: @white;
            opacity: 0.6;
          }
        }
      }
      .info_cell {
        width: 100%;
        height: 64px;
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        .cell {
          width: 220px;
          height: 64px;
          background: #34343499;
          border-radius: 4px;
          padding-top: 8px;
          .title {
            margin: 0px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 21px;
            color: #ffffff;
            opacity: 0.6;
            text-align: center;
          }
          .trend {
            margin-top: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            .name {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 21px;
              color: #ffffff;
              opacity: 1;
            }
            .icon {
              width: 13px;
              height: 7px;
              margin-left: 16px;
            }
            &.up {
              .name {
                color: #57ff79;
              }
              .icon {
                background: url("../../../assets/img/screen/icon-up.png")
                  no-repeat center center;
              }
            }
            &.down {
              .name {
                color: #ff7457;
              }
              .icon {
                background: url("../../../assets/img/screen/icon-down.png")
                  no-repeat center center;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    background: linear-gradient(
      0deg,
      rgba(0, 85, 78, 0) 80%,
      rgba(0, 85, 78, 0.4) 100%
    );
    opacity: 1;
    padding: 0px 20px;
    margin-top: 12px;
    .table {
      padding-bottom: 12px;
      /deep/ th {
        background: none;
        border-bottom: 1px solid #30555b;
        color: #fff;
        opacity: 0.6;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
      }
      /deep/tr {
        td {
          border-right: 1px solid #30555b;
          border-bottom: 1px solid #30555b;
          padding: 8px;
          color: #fff;
          opacity: 0.6;
          &:first-child {
            border-left: 1px solid #30555b;
          }
        }
      }
      /deep/ table {
        text-align: center;
        font-size: 14px;
      }
      /deep/ .ant-table-header {
        background: none;
        margin-bottom: 0px !important;
        overflow: hidden !important;
      }
      /deep/.ant-table-body{
        background: none;
      }
    }
  }
}
</style>