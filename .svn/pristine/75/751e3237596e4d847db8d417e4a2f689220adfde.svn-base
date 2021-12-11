<template>
  <a-spin :spinning="loading" :id="spinid" class="line-chart">
    <div :id="id">
    </div>
  </a-spin>
</template>

<script>
import { Spin } from "ant-design-vue";
import mixinChart from "@/zfw/utils/chart";
export default {
  mixins: [mixinChart],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 数据 => 必选
    data: {
      type: Array,
      default: () => [
      ]
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  components: { ASpin: Spin },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    spinid() {
      return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
    }
  },
  created() {},
  mounted() {},
  methods: {
    setChartConfig(data) {
      this.chart.data(data);

      this.chart.scale('year', {
        type: 'time',
        // tickInterval: 50,
        // range: [0, 1]
      });
      this.chart.scale('value', {
        nice: true,
      });

      this.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      if (this.showName) {
        this.chart
        .area()
        .adjust('stack')
        .position('year*value')
        .color('name');
      } else {
        this.chart
        .area()
        .adjust('stack')
        .position('year*value')
      }

      if (this.showName) {
        this.chart
        .line()
        .adjust('stack')
        .position('year*value')
        .color('name');
      } else {
        this.chart
        .line()
        .adjust('stack')
        .position('year*value') 
      }

      this.chart.interaction('element-highlight');

      this.chart.render();
    }
  },
};
</script>
<style lang="less" scoped>
.line_cahrt{}
</style>