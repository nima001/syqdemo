<template>
  <div class="running-status">
    <div id="echartStatus"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getPercent } from "@/workflow/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  mounted() {
    this.get().then(data => {
      this.init(data);
    });
  },
  props: ["timer"],
  computed: {
    flag() {
      return this.timer;
    }
  },
  watch: {
    flag(newval, oldval) {
      this.get().then(data => {
        this.init(data);
      });
    }
  },
  methods: {
    init(res) {
      let exception, normal;
      if (res) {
        exception = res.exception;
        normal = parseInt(res.alltotal - res.exception);
      } else {
        exception = 0;
        normal = 100;
      }
      let status = echarts.init(document.getElementById("echartStatus"));
      let option = {
        title: {
          text: "运行状态（实时）",
          left: "center",
          bottom: "30"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          right: "30",
          top: "30",
          data: ["异常", "正常"]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "40%"],
            data: [
              {
                value: exception,
                name: "异常",
                itemStyle: { color: "#C2DDF6" }
              },
              { value: normal, name: "正常", itemStyle: { color: "#97C5F0" } }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      status.setOption(option);
      window.addEventListener("resize", function() {
        status.resize();
      });
    },
    get() {
      let p = new Promise((resolve, reject) => {
        getPercent()
          .then(res => {
            resolve(res.result);
          })
          .catch(err => {
            showError(err);
          });
      });
      return p;
    }
  }
};
</script>
<style lang="less" scoped>
.running-status {
  #echartStatus {
    height: 330px;
  }
}
</style>