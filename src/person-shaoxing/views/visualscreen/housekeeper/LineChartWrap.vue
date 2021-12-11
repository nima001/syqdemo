<template>
  <div class="wrap">
    <!-- 目前是本地数据，请求后端数据时打开注释 -->
    <!-- <loading v-if="loading"/> -->
    <!-- <template v-else> -->
    <p class="title">{{title}}</p>
    <div class="chart">
      <line-chart :table="table"/>
    </div>
    <!-- </template> -->
  </div>
</template>
<script>
import LineChart from "../housekeeper/LineChart";
import { mixins } from "../components/minxin";
import Loading from "../components/Loading";

export default {
  mixins: [mixins],
  components: { LineChart, Loading },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // loading:true,
      education: {
        title: "教育编制发展趋势",
        data: {
          "330600": {
            //市本级
            real: [
              { year: "2016", value: 5236 },
              { year: "2017", value: 5191 },
              { year: "2018", value: 5372 },
              { year: "2019", value: 4580 },
              { year: "2020", value: 4532 }
            ]
          },
          "330602": {
            //越城区
            real: [
              { year: "2016", value: 5347 },
              { year: "2017", value: 5302 },
              { year: "2018", value: 5487 },
              { year: "2019", value: 6341 },
              { year: "2020", value: 6453 }
            ]
          },
          "330604": {
            //上虞区
            real: [
              { year: "2016", value: 6100 },
              { year: "2017", value: 6048 },
              { year: "2018", value: 6259 },
              { year: "2019", value: 7003 },
              { year: "2020", value: 7043 }
            ]
          },
          "330603": {
            //柯桥区
            real: [
              { year: "2016", value: 7046 },
              { year: "2017", value: 6986 },
              { year: "2018", value: 7230 },
              { year: "2019", value: 7236 },
              { year: "2020", value: 8178 }
            ]
          },
          "330681": {
            //诸暨市
            real: [
              { year: "2016", value: 9815 },
              { year: "2017", value: 9732 },
              { year: "2018", value: 10071 },
              { year: "2019", value: 10018 },
              { year: "2020", value: 9807 }
            ]
          },
          "330683": {
            //嵊州市
            real: [
              { year: "2016", value: 6270 },
              { year: "2017", value: 6217 },
              { year: "2018", value: 6434 },
              { year: "2019", value: 6483 },
              { year: "2020", value: 6001 }
            ]
          },
          "330624": {
            //新昌县
            real: [
              { year: "2016", value: 4488 },
              { year: "2017", value: 4484 },
              { year: "2018", value: 3990 },
              { year: "2019", value: 3856 },
              { year: "2020", value: 3888 }
            ]
          }
        }
      },
      health: {
        title: "医疗编制发展趋势",
        data: {
          "330600": {
            //市本级
            real: [
              { year: "2016", value: 4599 },
              { year: "2017", value: 4601 },
              { year: "2018", value: 6986 },
              { year: "2019", value: 9376 },
              { year: "2020", value: 9421 }
            ]
          },
          "330602": {
            real: [
              //越城区
              { year: "2016", value: 1162 },
              { year: "2017", value: 1162 },
              { year: "2018", value: 1765 },
              { year: "2019", value: 3688 },
              { year: "2020", value: 3744 }
            ]
          },
          "330604": {
            real: [
              //上虞区
              { year: "2016", value: 4659 },
              { year: "2017", value: 4660 },
              { year: "2018", value: 7076 },
              { year: "2019", value: 7564 },
              { year: "2020", value: 8299 }
            ]
          },
          "330603": {
            //柯桥区
            real: [
              { year: "2016", value: 4923 },
              { year: "2017", value: 4925 },
              { year: "2018", value: 7478 },
              { year: "2019", value: 7487 },
              { year: "2020", value: 7523 }
            ]
          },
          "330681": {
            //诸暨市
            real: [
              { year: "2016", value: 4891 },
              { year: "2017", value: 4893 },
              { year: "2018", value: 7430 },
              { year: "2019", value: 7740 },
              { year: "2020", value: 7740 }
            ]
          },
          "330683": {
            //嵊州市
            real: [
              { year: "2016", value: 2382 },
              { year: "2017", value: 2384 },
              { year: "2018", value: 3620 },
              { year: "2019", value: 3633 },
              { year: "2020", value: 4812 }
            ]
          },
          "330624": {
            //新昌县
            real: [
              { year: "2016", value: 1561 },
              { year: "2017", value: 1562 },
              { year: "2018", value: 2372 },
              { year: "2019", value: 3484 },
              { year: "2020", value: 4079 }
            ]
          }
        }
      },
      diseaseControl: {
        title: "疾控编制发展趋势",
        data: {
          "330600": {
            real: [
              //市本级
              { year: "2016", value: 87 },
              { year: "2017", value: 87 },
              { year: "2018", value: 87 },
              { year: "2019", value: 87 },
              { year: "2020", value: 127 }
            ]
          },
          "330602": {
            //越城区
            real: [
              { year: "2016", value: 39 },
              { year: "2017", value: 39 },
              { year: "2018", value: 39 },
              { year: "2019", value: 39 },
              { year: "2020", value: 87 }
            ],
            trend: [
              { year: "2016", value: 92.2428 },
              { year: "2017", value: 92.7173 },
              { year: "2018", value: 93.2867 },
              { year: "2019", value: 93.7612 }
            ]
          },
          "330604": {
            //上虞区
            real: [
              { year: "2016", value: 58 },
              { year: "2017", value: 59 },
              { year: "2018", value: 58 },
              { year: "2019", value: 69 },
              { year: "2020", value: 69 }
            ],
            trend: [
              { year: "2016", value: 74.971 },
              { year: "2017", value: 75.3506 },
              { year: "2018", value: 75.6353 },
              { year: "2019", value: 75.8251 }
            ]
          },
          "330603": {
            //柯桥区
            real: [
              { year: "2016", value: 74 },
              { year: "2017", value: 74 },
              { year: "2018", value: 74 },
              { year: "2019", value: 86 },
              { year: "2020", value: 88 }
            ],
            trend: [
              { year: "2016", value: 92.6224 },
              { year: "2017", value: 93.0002 },
              { year: "2018", value: 93.5714 },
              { year: "2019", value: 94.9 }
            ]
          },
          "330681": {
            real: [
              //诸暨市
              { year: "2016", value: 55 },
              { year: "2017", value: 55 },
              { year: "2018", value: 55 },
              { year: "2019", value: 101 },
              { year: "2020", value: 101 }
            ],
            trend: [
              { year: "2016", value: 112.7412 },
              { year: "2017", value: 112.6464 },
              { year: "2018", value: 112.1718 },
              { year: "2019", value: 111.6973 }
            ]
          },
          "330683": {
            real: [
              //嵊州市
              { year: "2016", value: 66 },
              { year: "2017", value: 66 },
              { year: "2018", value: 66 },
              { year: "2019", value: 66 },
              { year: "2020", value: 122 }
            ],
            trend: [
              { year: "2016", value: 65.2912 },
              { year: "2017", value: 65.5759 },
              { year: "2018", value: 65.8606 },
              { year: "2019", value: 65.8606 }
            ]
          },
          "330624": {
            //新昌县
            real: [
              { year: "2016", value: 30 },
              { year: "2017", value: 30 },
              { year: "2018", value: 30 },
              { year: "2019", value: 30 },
              { year: "2020", value: 35 }
            ],
            trend: [
              { year: "2016", value: 36.5365 },
              { year: "2017", value: 36.7263 },
              { year: "2018", value: 36.8212 },
              { year: "2019", value: 36.8212 }
            ]
          }
        }
      }
    };
  },
  computed: {
    config() {
      return (this.type && this[this.type]) || {};
    },
    title() {
      return this.config.title;
    },
    table() {
      if (this.dictId) {
        return this.config.data[this.dictId];
      }
    }
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
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
  }
  .chart {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>