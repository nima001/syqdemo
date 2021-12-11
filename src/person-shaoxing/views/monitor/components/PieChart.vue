<template>
  <a-spin :spinning="loading" :id="spinid" class="pie-chart">
    <div v-if="title" class="title">{{title}}</div>
    <div :id="id">
    </div>
  </a-spin>
</template>
<script>
import { Spin } from "ant-design-vue";
import mixinChart from "@/person-shaoxing/views/monitor/mixins/chart";
import { colorGroup } from "@/person-shaoxing/utils/index";
export default {
  name: 'pie-chart',
  mixins: [mixinChart],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return [
          { name: '1', value: 38129 },
          { name: '2', value: 38133 },
          { name: '3', value: 19067 }
        ]
      }
    },
    title: {
      type: String,
      default: undefined
    },
    // 坐标轴名称
    axisName: {
      type: Object
    },
    scaleConfig: {
      type: Object
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    tooltipConfig: {
      type: Object
    },
    // 图例配置
    legendConfig: {
      type: Object
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    labelConfig: {
      type: Object,
      default: () => {
        return {
          show: true,
          offset: 20
        }
      }
    },
    // 图表类型 ring pie nightingale
    type: {
      type: String,
      default: 'ring'
    },
    innerRadius: {
      type: Number,
      default: null
    }
  },
  components: {
    ASpin: Spin
  },
  computed: {
    spinid() {
      return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    setChartConfig(data) {
      //  默认坐标轴第一个值为x轴 第二只为y轴
      let axisArr = Object.keys(this.axisName);

      // 为 chart 装载数据
      this.chart.data(data)

      //  度量配置 坐标轴title => alias别名
      let scaleConfig = (() => {
        let obj = {}
        for (const key in this.axisName) {
          if (this.axisName.hasOwnProperty(key)) {
            obj[key] = {}
            obj[key]['alias'] = this.axisName[key]
            Object.assign(obj[key], this.scaleConfig[key])
          }
        }
        return obj
      })()
      this.chart.scale(scaleConfig)

      let interval = ''
      // 根据图表类型(ring,pie,nightingale)选择不同的坐标系(theta,polar)以及设置内半径
      if (this.type === 'ring') {
        this.chart.coordinate('theta', {
          innerRadius: this.innerRadius === null ? 0.6 : this.innerRadius,
          radius: 0.8,
        })
        interval = this.chart.interval().adjust('stack').position('value')
      } else if (this.type === 'pie') {
        this.chart.coordinate('theta', {
          innerRadius: this.innerRadius === null ? 0 : this.innerRadius,
          radius: 0.8,
        })
        interval = this.chart.interval().adjust('stack').position('value')
      } else if (this.type === 'nightingale') {
        this.chart.coordinate('polar', {
          innerRadius: this.innerRadius === null ? 0.2 : this.innerRadius,
          radius: 0.8,
        })
        interval = this.chart.interval().position(`${axisArr[0]}*${axisArr[1]}`)
      }

      // 关闭坐标轴
      this.chart.axis(false)

      // 配置颜色
      interval.color(axisArr[0], colorGroup)

      //  是否使用tooltip
      if (this.showTooltip) {
        // 配置 tooltip
        this.chart.tooltip(this.tooltipConfig)
        interval.tooltip(`${axisArr[0]}*${axisArr[1]}`)
      } else {
        this.chart.tooltip(false)
      }
      

      // 辅助文本
      this.chart
      .annotation()
      .text({
        position: ['50%', '50%'],
        content: '总计',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: -20,
      })
      .text({
        position: ['50%', '50%'],
        content: () => {
          let total = 0;
          data.forEach(item => {
            total += item.value;
          })
          return total
        },
        style: {
          fontWeight: 'bolder',
          fontSize: 20,
          fill: '#000',
          textAlign: 'center',
        },
        offsetX: 0,
        offsetY: 20,
      })
      // 配置文本
      if (this.showLabel) {
        interval.label(`${axisArr[1]}`, val => {
          return {
            offset: this.labelConfig.offset
          }
        })
      }

      // 配置图例
      if (this.showLegend) {
        this.chart.legend(this.legendConfig)
      } else {
        this.chart.legend(false)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pie-chart{
  .title{
    color: #000;
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
  }
}
</style>