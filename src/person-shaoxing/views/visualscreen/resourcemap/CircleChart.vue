<template>
  <div class="wrap" >
    <loading v-if="loading"/>
    <template v-else>
    <p class="title">{{title}}</p>
    <div class="view">
      <div class="chart" :class="{'yellow': type==1}">
        <div class="bg outer"></div>
        <div class="bg inner"></div>
        <div class="container" :id="id"></div>
      </div>
      <ul class="list">
        <li class="item" v-for="(item,index) in dataList" :key="index" @click="queryItem(index)">
          <span class="spot" :style="{background:item.color}"></span>
          <span class="text">{{item.item}}</span>
          <span class="num">{{item.count}}</span>
        </li>
      </ul>
    </div>
    <org-list v-model="query.show" 
      :title="(districtName || '') + query.title" 
      :systype="true"
      :group="!type"
      :loadPage="query.loader"
    />
    </template>
  </div>
</template>
<script>
import { Chart } from "@antv/g2";
import OrgList from '../components/OrgList'
import { mixins } from "../components/minxin";
import { getChart } from "@/person-shaoxing/api/orgStaffReport";
import { deriveQuery } from "@/person/api/chart";
import { showError } from "@/framework/utils/index";
import Loading from "../components/Loading";
export default {
  components: {
    OrgList,
    Loading
  },
  props: {
    // type 0:行政编制  1:事业编制
    type: {
      type: Number,
      required: true
    },
    queryId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      id: Math.random()
        .toString(32)
        .substr(2),
      title: undefined,
      dataTable: undefined,
      plot: undefined,
      loading:true,
      // 蓝色主题
      color_xz: ["#8FC7FF", "#63A8F7", "#3886EB", "#2565C4", "#1A48A2", "#16348A", "#071D52" ],
      // 黄色主题
      color_sx: [ "#FFD3A3", "#FFBA7A", "#F49A4E", "#CF7738", "#A85725", "#823C16", "#5C270F"],
      query: {
        show: false,
        title: '',
        loader: undefined,
      }
    };
  },
  mixins: [mixins],
  computed: {
    colorList() {
      return this.type == 0 ? this.color_xz : this.color_sx;
    },
    dataList() {
      if(this.dataTable){
        let { keyCols, rows, valueCols } = this.dataTable;
        return rows.map((item, index) => {
          return {
            item: item[keyCols[0]["column"]],
            count: item[valueCols[0]["column"]],
            color: this.colorList[index]
          };
        })
      }
    }
  },
  mounted() {
    this.chartData();
  },
  watch: {
    dictId(v) {
      this.loading = true;
      this.chartData();
    }
  },
  methods: {
    chartData() {
      getChart(this.dictId, this.queryId)
        .then(({result: {data, settings = {}}}) => {
          this.loading = false
          this.title = settings.title;
          this.dataTable = data;
          if(!this.loading){
            this.$nextTick(() => {           
              this.draw();
            })
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    queryItem(index){
      let item = this.dataList[index], row = this.dataTable.rows[index];
      this.query = {
        show: true,
        title: item.item,
        loader: (page) => {
          let criteria = [];
          if(page.searchkey){
            criteria.push({ field: {key:"name"}, op: "regex", value: page.searchkey })
          }
          if(page.systype){
            criteria.push({ field: {key:"systype"}, op: "eq", value: page.systype })
          }
          return deriveQuery(this.queryId, {
            row, valIndex: 0,
            context: {
              district: this.dictId
            },
            extFilter: { op: 'and', criteria },
            orders: [{orderby: "index", ordertype: "ASC"}],
            ...page
          })
        },
      }
    },
    draw() {
      let total = 0;
      (this.dataList || []).forEach(item => {
        total += item.count;
      })
      const chart = new Chart({
        container: this.id,
        autoFit: true
      });
      chart.data(this.dataList);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.75
      });
      // 辅助文本
      chart
        .annotation()
        .text({
          position: ["50%", "50%"],
          content: "总量",
          style: {
            fontSize: 18,
            textAlign: "center",
            stroke: 0,
            fill: "#FFF",
            opacity: 0.75,
          },
          offsetY: -20
        })
        .text({
          position: ["50%", "50%"],
          content: total,
          style: {
            fontSize: 36,
            fill: this.type == 0 ? "#8FC7FF" : "#FFD3A3",
            textAlign: "center",
            fontFamily: "LESLIEB",
            stroke: 0,
          },
          offsetY: 15
        });
      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart
        .interval()
        .adjust("stack")
        .position("count")
        .color("item", this.colorList);
      chart.render();
      if (this.plot) {
        this.plot.destroy();
      }
      this.plot = chart;
    }
  }
};
</script>
<style lang='less' scoped>
@keyframes outerRotate{
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes innerRotate{
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .title {
    height: 26px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: #ffffff;
    opacity: 0.8;
    margin: 0px;
    text-align: center;
  }
  .view {
    display: flex;
    align-items: center;
    margin-top: 8px;
    .chart {
      width: 280px;
      height: 280px;
      position: relative;
      .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        &.outer{
          background: url("../img/bg_chart_outer.png");
          animation: outerRotate 10s infinite linear;
        }
        &.inner{
          background: url("../img/bg_chart_inner.png");
          animation: innerRotate 15s infinite linear;
        }
      }
      &.yellow .bg{
        &.outer{
          background: url("../img/bg_chart_outer_yellow.png");
        }
        &.inner{
          background: url("../img/bg_chart_inner_yellow.png");
        }
      }

      .container {
        width: 210px;
        height: 210px;
        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
      }
    }
    .list {
      width: 180px;
      height: 198px;
      margin-left: 8px;
      background-color: rgba(52, 52, 52, .4);
      border-radius: 4px;
      padding: 6px;
      .item {
        display: flex;
        align-items: center;
        margin-top: 3px;
        padding: 0 10px;
        border-radius: 3px;
        cursor: pointer;
        &:first-child {
          margin-top: 0px;
        }
        &:hover{
          background-color: #343434;
        }
        .spot {
          width: 8px;
          height: 8px;
          border-radius: 8px;
        }
        .text {
          flex: 1;
          height: 24px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 24px;
          color: #ffffff;
          opacity: 0.6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0px 6px;
        }
        .num {
          height: 24px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 24px;
          color: #ffffff;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>