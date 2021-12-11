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
      this.chart.scale({
        value: {
          // max: 10000000,
          // min: 0,
          alias: '销量（百万）',
        },
      });
      this.chart.axis('name', {
        title: null,
        tickLine: null,
        line: null,
      });

      this.chart.axis('value', {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 12,
            fontWeight: 300,
          },
        },
      });
      this.chart.legend(false);
      this.chart.coordinate().transpose();
      this.chart
        .interval()
        .position('name*value')
        .size(26)
        .label('value', {
          style: {
            fill: '#8d8d8d',
          },
          offset: 10,
        });
      this.chart.interaction('element-active');
      this.chart.render();
    }
  },
};
</script>
<style lang="less" scoped>
.line_cahrt{}
</style>