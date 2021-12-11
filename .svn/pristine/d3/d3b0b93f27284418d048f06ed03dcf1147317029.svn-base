<template>
  <div class="circleChat">
    <a-spin :spinning="loading" v-if="loading"></a-spin>
    <div class="chart" ref="chart" v-else></div>
  </div>
</template>
<script>
import { Chart } from "@antv/g2";
import { showError } from "@/framework/utils/index";
import { survey } from "@/hall/api/attendance";
import moment from 'moment';
import {Spin}  from "ant-design-vue";
export default {
  data() {
    return {
      plot:undefined,
      loading:true
    };
  },
  components:{
    ASpin:Spin
  },
  props: {
    date: {
      required: true
    }
  },
  watch: {
    date() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatData(result){
      let latet = Math.floor(result['latetimes']/result['checkingtimes'] * 100);
      let early = Math.floor(result['earlytimes']/result['checkingtimes'] * 100);
      let nocheck = Math.floor(result['nocheckingtimes']/result['checkingtimes'] * 100);
      let regular = 100 - latet - early - nocheck;
      let list = [
        {item:'正常打卡',percent :  regular},
        {item:'未打卡人次',percent :nocheck },
        {item:'早退人次',percent : early  },
        {item:'迟到人次',percent : latet  }
      ]
      return list;
    },  
    getData() {
      this.loading = true;
      survey({
        nodeid: null,
        starttime:moment(this.date).startOf('month').format("YYYY-MM-DD"),
        endtime: moment(this.date).endOf('month').format("YYYY-MM-DD")
      })
        .then(({ result = {} }) => {
          let list = this.formatData(result);
          this.loading = false;
          this.$nextTick(()=>{
            this.draw(list);
          })
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    draw(list) {
      if(!this.$refs.chart){
        return false;
      }
      if(this.plot){
        this.plot.destroy();
      }
      const chart = new Chart({
        container: this.$refs.chart,
        autoFit: true
      });
      chart.data(list);
      chart.scale("percent", {
        formatter: val => {
          val = val  + "%";
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
      chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item")
        .label("percent", percent => {
          return {
            content: data => {
              return `${data.item}: ${percent }%`;
            }
          };
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent  + "%";
          return {
            name: item,
            value: percent
          };
        });
      chart.legend({ position: "right" });
      chart.render();
      this.plot = chart;
    }
  }
};
</script>
<style lang='less' scoped>
.circleChat {
  padding: @content-padding-v 0px;
  height: 285px;
  /deep/.ant-spin {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chart {
    height: 100%;
  }
}
</style>