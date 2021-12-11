<template>
  <div class="wrap">
    <div class="cell">
      <p class="title">人员政治面貌概况</p>
      <a-spin :spinning="loading" v-if="loading"></a-spin>
      <ul class="list" v-else>
        <li class="item" v-for="(item,index) in list" :key="index">
          <span class="icon" :style="{background:bjColor[index]}">
            <custom-icon type="person"  :color='chartColor[index]'></custom-icon>
          </span>
          <span class="num">{{item.count}}</span>
          <span class="desc">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="cell">
      <p class="title">人员政治面貌占比</p>
      <a-spin :spinning="loading" v-if="loading"></a-spin>
      <div class="chart" ref="chart" v-else></div>
    </div>
  </div>
</template>
<script>
import CustomIcon from "@/framework/components/CustomIcon";
import { Chart } from "@antv/g2";
import { politics } from "@/hall/api/usermanage";
import { mixins } from "@/hall/mixin/index";
import { showError } from "@/framework/utils/index";
import {Spin} from "ant-design-vue"
export default {
  components: {ASpin:Spin, CustomIcon },
  data() {
    return {
      list: [],
      total: 0,
      chart: undefined,
      loading:false
    };
  },
  mixins: [mixins],
  mounted() {
    this.getData(this.nodeData);
  },
  methods: {
    getData(nodeData) {
      if (nodeData && nodeData.id) {
        this.loading = true;
        politics(nodeData.id)
          .then(res => {
            this.list = res.result;
            this.total = this.countTotal(this.list);
            this.loading = false;
            this.$nextTick(()=>{
              this.draw(this.dataFormate(this.list));
            })
          })
          .catch(err => {
            showError(err);
          }).finally(()=>{
            this.loading = false;
          });
      }
    },
    draw(list) {
      if (this.chart) {
        this.chart.destroy();
      }
      if(!this.$refs.chart){
        return false
      }
      const chart = new Chart({
        container: this.$refs.chart,
        autoFit: true
      });
      chart.data(list);
      chart.scale("percent", {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      });
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });

      // 辅助文本
      chart
        .annotation()
        .text({
          position: ["50%", "50%"],
          content: "总职工数",
          style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetY: -20
        })
        .text({
          position: ["50%", "50%"],
          content: this.total,
          style: {
            fontSize: 20,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetX: -10,
          offsetY: 20
        })
        .text({
          position: ["50%", "50%"],
          content: "位",
          style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetY: 20,
          offsetX: 20
        });
      chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item",this.chartColor)
        .label("percent", percent => {
          return {
            content: data => {
              return `${data.item}: ${percent}%`;
            }
          };
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent + "%";
          return {
            name: item,
            value: percent
          };
        });
      chart.legend({
        position: "right"
      });
      chart.render();
      this.chart = chart;
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 100%;
  .cell {
    padding: @content-padding-v @content-padding-h;
    background: @white;
    margin-top: @layout-space-base;
    border-radius: @border-radius-base;
    min-height:300px;
    display: flex;
    flex-direction: column;
    &:first-child {
      margin-top: 0px;
    }
    &:last-child{
      flex: 1;
    }
    .title {
      margin: 0px;
      color: #262626;
      font-size: 16px;
      font-weight: 400;
    }
    .ant-spin{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list {
      margin: 0px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        &::after {
          content: "";
          width: 1px;
          height: 40px;
          background: #1B5293;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.2;
        }
        &:last-child {
          &::after {
            width: 0px;
          }
        }
        .icon {
          width: 48px;
          height: 48px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          /deep/svg {
            width: 25px;
            height: 25px;
            border-radius: 0px;
          }
        }
       .num {
          padding: 24px 0px 16px;
          font-size: 36px;
          font-weight: 400;
          color: #000;
        }
        .desc {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .chart {
      flex: 1;
    }
  }
}
</style>