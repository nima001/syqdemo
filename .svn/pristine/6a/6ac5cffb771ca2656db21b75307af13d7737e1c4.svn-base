<template>
  <div class="line">
    <a-spin :spinning="loading">
      <div class="bar" ref="chart"></div>
    </a-spin>
  </div>
</template>
<script>
import { transferChart } from "@/hall/api/personcount";
import { showError } from "@/framework/utils/index";
import { Chart } from "@antv/g2";
import { Spin } from "ant-design-vue";
export default {
  data() {
    return {
      loading: false,
      list: []
    };
  },
  components: {
    ASpin: Spin
  },
  mounted() {
    this.getData();
  },
  methods: {
    draw() {
      const chart = new Chart({
        container: this.$refs.chart,
        padding: [20, 0, 30, 0],
        autoFit: true
      });
      chart.data(this.list);
      chart.scale({
        count: {
          nice: true,
          min: 0,
          alias: "统计"
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      chart.axis("count", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      chart
        .line()
        .position("name*count")
        .shape("smooth")
        .label("count");

      chart
        .point()
        .position("name*count")
        .shape("circle");

      chart.render();
    },
    getData() {
      this.loading = true;
      transferChart()
        .then(({ result }) => {
          this.list = result;
          this.draw();
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang='less' scoped>
.line {
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .ant-spin-nested-loading {
    width: 100%;
    height: 100%;
    .ant-spin-container {
      width: 100%;
      height: 100%;
      .bar {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>