<template>
  <div>
    <Title title="问题类型分析" />
    <div style="height: 210px">
      <div class="ring-chart">
        <RingChart
          :data="data"
          :settings="{
            canvas: { width: 400, height: 200 },
            padding: [20,0,0,-82],
            gemo: {
              color: ['#F2A54D','#60B4F5','#F84848','#DF6EA3','#6EDF75','#A66DF5','#C3F1CE','#A0A4F5'],
            },
            legend: {
              visible: true,
              layout: 'horizontal',
              position: 'right',
              marker: 'square',
              flipPage: false,
              offsetX: -90,
              style: {
                fill: '#CFD4E0'
              }
            },
            infoText: {
              title: '违规设置机构',
              offsetY: -10,
              style: { fontSize: 15, fill: '#fff', textAlign: 'center' },
            },
            contentStyle: {
              offsetY: 10,
              fontSize: 13, fill: '#fff', textAlign: 'center'
            },
            radius: 0.8,
            innerRadius: 0.8,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import RingChart from "@person/components/chart/RingChart";

export default {
  components: {
    Title,
    RingChart,
  },
  data() {
    return {
      data: {
        keyCols: [{ column: "k0", key: "district", showname: "所在地区" }],
        rows: [
          { k0: "违规设置机构", v0: 247 },
          { k0: "违规核定、配备领导职数", v0: 247 },
          { k0: "违规使用编制", v0: 352 },
          { k0: "其它问题", v0: 361 },
        ],
        valueCols: [{ column: "v0", showname: "记录数" }],
      },
    };
  },
};
</script>

<style scoped lang="less">
.ring-chart {
  height: 100%;
  position: relative;
  /deep/.ring-chart {
    height: 100%;
    .chart {
      flex: 1;
    }
  }
  // &::before {
  //   width: 161px;
  //   height: 161px;
  //   border-radius: 50%;
  //   content: "";
  //   position: absolute;
  //   left: 10%;
  //   top: 15%;
  //   background: fade(#a27ae4, 20%);
  // }
}
</style>
