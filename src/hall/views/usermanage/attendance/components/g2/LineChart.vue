<template>
  <div class="barChart">
    <a-spin :spinning="loading" v-if="loading"></a-spin>
    <div ref="chart" v-else></div>
  </div>
</template>
<script>
import { Chart } from "@antv/g2";
import { Spin } from "ant-design-vue";
import { rateTrend } from "@/hall/api/attendance";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ASpin: Spin
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      rateTrend()
        .then(({ result: { rate, time } }) => {
          let list = time.map((item, index) => {
            return {
              month: item,
              rate: parseFloat(rate[index].replace("%", ""))
            };
          });
          this.draw(list.reverse());
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    draw(list) {
      const chart = new Chart({
        container: this.$refs.chart,
        autoFit: true
      });
      chart.data(list);
      chart.scale({
        rate: {
          nice: true,
          alias: "比率"
        }
      });

      chart.tooltip({
        showTitle: true,
        itemTpl:'<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}%</li>'
      });
      chart.axis("rate", {
        label: {
          formatter: val => {
            return val + " %";
          }
        }
      });
      chart.line().position("month*rate");
      chart
        .point()
        .position("month*rate")
        .shape("circle");
      chart.render();
    }
  }
};
</script>
<style lang='less' scoped>
.barChart {
  padding: @content-padding-v 0px;
  height: 300px;
  width: 100%;
  margin: 0 auto;
  div {
    height: 100%;
  }
}
</style>