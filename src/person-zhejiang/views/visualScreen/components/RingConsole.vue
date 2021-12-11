<template>
  <div>
    <RingChart
      :data="data"
      :settings="setting"
    >
      <template v-slot:customLegend="props">
        <div class="legend">
          <ul v-if="data.rows">
            <li
              v-for="(row, index) in data.rows"
              @click="()=>{$emit('showModal',row, complietype, type)}"
            >
              <span :style="{ background: props[index] }" class="spot"></span>
              <span>{{ row.k0 }}</span>
            </li>
          </ul>
        </div>
      </template>
    </RingChart>
  </div>
</template>

<script>
import RingChart from "@person/components/chart/RingChart";
export default {
  props: {
    complietype: {
        type: String
    },
    type: {
        type: String
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    RingChart,
  },
  data() {
    return {
      setting: {
        legend: {
          visible: false,
        },
        canvas: { height: 135 },
        padding: [0, 0, 0, 0],
        radius: 0.8,
        innerRadius: 0.8,
        tooltip: {
          visible: true,
        },
        gemo: {
          color: [
            '#F2A54D',
            '#60B4F5',
            '#F84848',
            '#DF6EA3',
            '#6EDF75',
            '#A66DF5',
            '#C3F1CE',
            '#A0A4F5',
          ]
        },
        infoText: {
          title: this.data.rows[0].k0,
          offsetY: -10,
          style: { fontSize: 15, fill: '#fff', textAlign: 'center' },
        },
        contentStyle: {
          offsetY: 10,
          fontSize: 13,
          fill: '#fff',
          textAlign: 'center',
        },
      }
    };
  },
};
</script>
<style scoped lang="less">
/deep/.ring-chart {
  height: 100%;
  & .chart {
    width: 50%;
  }
}
.legend {
  width: 48%;
  text-align: left;
  white-space: nowrap;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: fade(#fff, 60%);
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    margin-left: auto;
    li {
      width: 50%;
      display: flex;
      align-items: center;
      font-size: 0.8em;
      cursor: pointer;
      user-select: none;
      .spot {
        width: 10px;
        height: 10px;
        margin-right: @layout-space-base;
        border-radius: @border-radius-base;
        display: inline-block;
      }
      span:last-child {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
