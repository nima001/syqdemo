<template>
  <div class="kpi-detail">
    <div class="info">
      <div class="overview">
        <ul>
          <li class="header inset-shadow">
            <div class="name">质效分</div>
            <div class="content">
              <template v-if="total">
                <span class="score">{{total}}</span>
                <span class="suffix">分</span>
              </template>
            </div>
          </li>
          <li v-for="item in overview" :key="item.id">
            <div class="name">{{item.title}}</div>
            <div class="content">
              <div class="line">
                <span class="label">得分</span>
                <a-progress :percent="item.score"
                  :stroke-color="{'0%': '#00FFEA', '100%': '#6EDF75'}"
                  :format="percent => `${percent}`"
                />
              </div>
              <div class="line">
                <span class="label">平均值</span>
                <a-progress :percent="item.avg"
                  :stroke-color="{'0%': '#00C2FF', '100%': '#6E7DDF'}"
                  :format="percent => `${percent}`"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="error">
        <a class="detail" @click="$emit('finish')"><a-icon type="fullscreen"  />详情</a>
        <div v-for="item in issues" :key="item.title">
          <h1 :class="{warn: item.items && item.items.length > 0}">
            {{item.title}}
            <span v-if="item.items && item.items.length > 0" class="desc">共发现<span class="num">{{item.items.length}}</span>个问题</span>
            <span v-else class="desc">无异常</span>
          </h1>
          <p v-for="(text, index) in item.items" :key="index">{{text}}</p>
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="proportion" ref="proportion"></div>
      <div><div class="trend" ref="trend"></div></div>
    </div>
  </div>
</template>
<script>
import { Progress, Icon } from 'ant-design-vue'
import DialogBox from './DialogBox';
import { Chart } from '@antv/g2';
import { DataView } from '@antv/data-set';
import { districtKpiAvg, orgKpiAvg, getOrgKpiOverview} from '@/person-huzhou/api/kpi'

export default {
  components: {
    AIcon: Icon,
    DialogBox,
    AProgress: Progress,
  },
  props: {
    org: {} //单位信息
  },
  data(){
    return {
      kpiOverview: undefined,
      avgList: undefined,
      districtErrors: {
        3: ['配置效益-民生保障-近三年学生数的增减情况未动态调整', '配置效益-人员素质结构-新进人员中35周岁以下占比低于80%'],
        4: ['机构编制法制化-加强机构编制规范管理和改革创新-自定编制未消化']
      },
      orgErrors: {
        2: ['新进人员中35岁及以下的低于80%', '平均年龄大于市级部门人员平均年龄的'],
        3: ['未按规定进行用编用职审核'],
      }
    }
  },
  computed: {
    total(){
      if(this.kpiOverview){
        return this.kpiOverview.reduce((total, item) => total + item.score, 0).toFixed(2);
      }
    },
    overview(){
      if(this.avgList && this.kpiOverview){
        return (this.kpiOverview || []).map(item => {
          let avg = this.avgList.find((a) => a.id == item.id);
          return {
            ...item,
            avg: avg && avg.num || 0
          }
        })
      }
    },
    issues(){
      if(this.kpiOverview){
        let errors = this.org.orgtype == 3 ? this.districtErrors : this.orgErrors;
        return this.kpiOverview.map(item => {
          return {
            ...item,
            items: errors && errors[item.id]
          }
        })
      }
    }
  },
  created(){
    this.loadData();
  },
  mounted(){
    this.drawProportion([
      { item: '履职效能', score: 90, before: 88 },
      { item: '协同效应', score: 100, before: 90 },
      { item: '年龄结构', score: 70, before: 75 },
      { item: '学历结构', score: 60, before: 60 },
      { item: '人员调配', score: 99, before: 80 },
      { item: '纪律执行', score: 40, before: 60 },
    ], { score: '本年度', before: '上年度' });
    this.drawTrend([
        { year: '2017', value: 3 },
        { year: '2018', value: 4 },
        { year: '2019', value: 3.5 },
        { year: '2020', value: 4.9 },
        { year: '2021', value: 13 },
      ])
  },
  methods: {
    loadData(){
      getOrgKpiOverview(this.org.id).then(({result}) => {
        this.kpiOverview = result;
      });
      let fn = this.org.orgtype == 3 ? districtKpiAvg : orgKpiAvg
      fn().then(({result}) => {
        this.avgList = result;
      })

    },
    drawProportion(list, fold) {
      const dv = new DataView().source(list);
      dv.transform({
        type: 'fold',
        fields: Object.keys(fold), // 展开字段集
        key: 'type', // key字段
        value: 'value', // value字段
      });
      const chart = new Chart({ container: this.$refs.proportion, autoFit: true });
      chart.data(dv.rows.map(item => {
        item.type = fold[item.type];
        return item;
      }));
      chart.scale("value", { max: 100, min: 0 });
      chart.coordinate('polar', {
        radius: 0.75,
      });
      chart.axis("item", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            }
          }
        },
        label: {
          style: {
            fill: '#fff',
            fontSize: 15,
          }
        }
      });
      chart.axis("value", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
              stroke: '#fff'
            }
          },
          closed: false,
          alternateColor: ['#A1A4A9CC', '#90949ACC', '#777C88CC', '#5B616CCC', '#353C49CC']
        },
        label: null
      });
      chart.point().position("item*value").color("type")
        // .label("value", {
        //   labelEmit: true,
        //   offset: -20,
        //   layout: {
        //     type: "overlap"
        //   },
        //   style: {
        //     fontSize: 16,
        //     fill: "#FFF",
        //   },
        // })
        .shape("circle").size(3);
      chart.line().position("item*value").color("type", ['#2BFFFF', '#FFBF2B']).size(1.5);
      // chart.area().position('item*value').color('type');
      chart.tooltip({
        shared: true,
      });
      chart.legend({
        layout: 'vertical',
        position: 'right-top',
        marker: {
          symbol: 'square',
          style: {
            lineWidth: 0,
          }
        },
        itemName: {
          style: {
            fill: "#FFF",
            opacity: .8,
          }
        },
        offsetY: 40,
      });
      chart.render();
      // this.plot = chart;
    },
    drawTrend(data){
      const chart = new Chart({
        container: this.$refs.trend,
        autoFit: true,
        padding: [60, 20, 40, 20]
      });

      chart.data(data);
      chart.scale({
        year: {
          range: [0, 1],
        },
        value: {
          alias: '质效分',
          min: 0,
          nice: true,
        },
      });
      chart.axis('year', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              stroke: 'l(90) 0:#00FFEA33 1:#6EDF7533',
              lineWidth: 42
            }
          },
        },
        label: {
          style: {
            fill: '#fff',
            fontSize: 18,
          }
        }
      })
      chart.axis('value', {
        grid: null,
        label: null
      })

      chart.line().position('year*value').color('#6EDF75');
      chart.point().position('year*value').shape('circle').color('#6EDF75').size(6).style({
        strokeOpacity: 0,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      })
      data.forEach(item => {
        chart.annotation().text({
          position: [item.year, "max"],
          content: item.value,
          style: {
            fill: '#00FFEA',
            textAlign: "center",
            fontSize: 20,
          },
          offsetY: -16,
        });
      })

      chart.render();
    }
  }
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: LESLIEB;
  src: url("./assets/font/LESLIEB_.TTF") format("truetype");
}
.kpi-detail{
  & > .info{
    height: 400px;
    display: flex;
    padding: 10px 40px;
    .overview{
      width: 350px;
      flex: none;
      ul{
        margin-top: 5px;
      }
      li{
        height: 62px;
        margin-top: 16px;
        background-color: fade(#307985, 16%);
        display: flex;
        align-items: center;
        &:first-child{
          margin-top: 0;
        }
        & > .name{
          flex: auto;
          width: 32%;
          line-height: 1.2em;
          padding: 12px;
          color: fade(#fff, 80%);
        }
        & > .content{
          flex: auto;
          width: 68%;
          .line{
            display: flex;
            align-items: center;
            .label{
              flex: none;
              width: 4em;
              text-align: right;
              margin-right: 14px;
              color: fade(#fff, 60%);
              font-size: 0.9em;
            }
            /deep/.ant-progress{
              flex: auto;
              padding-right: 20px;
              .ant-progress-inner{
                background-color: #343434;
                border-radius: 3px;
              }
              .ant-progress-bg{
                height: 10px !important;
              }
              .ant-progress-text{
                color: #fff;
              }
            }
          }
        }
      }
      .header{
        & > .name{
          color: fade(#fff, 95%);
          font-size: 1.2em;
          text-align: center;
        }
        & > .content{
          text-align: center;
          color: #2BFFFF;
          .score{
            font-family: LESLIEB;
            font-size: 48px;
          }
          .suffix{
            padding-left: 5px;
          }
        }
      }
    }
    .error{
      flex: auto;
      margin-left: 30px;
      position: relative;
      .detail{  
        position: absolute;
        right: 0;
        top: 0;
        color: fade(#fff, 80%);
        .anticon{
          color: #4BD3F0;
          margin-right: 4px;
          font-size: 1.2em;
        }
      }
      h1{
        color: #7dc8a3;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0;
        padding: 0 15px;
        .desc{
          font-size: 14px;
          color: fade(#fff, 50%);
          margin-left: 15px;
        }
        .num{
          margin: 5px;
          font-weight: bold;
          color: #ed6b43;
        }
        &.warn{
          color: #ed6b43;
        }
      }
      p{
        font-size: 14px;
        color: fade(#fff, 80%);
        background-color: #151920;
        border-radius: 5px;
        padding: 5px 15px;
        margin-bottom: 2px;
      }
    }
  }

  & > .chart{
    height: 250px;
    background: linear-gradient(0deg, rgba(0, 85, 78, 0) 80%, rgba(0, 85, 78, 0.4) 100%);
    display: flex;
    & > div{
      flex: auto;
      width: 50%;
      min-width: 1px;
      padding: 5px 80px;
    }
    .trend{
      width: 380px;
      height: 100%;
      margin: auto;
    }
  }

  .inset-shadow{
    position: relative;
    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background: url('../../../assets/img/screen/radiance-small.png') no-repeat;
      background-size: 100% auto;
      pointer-events: none;
    }
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background: url('../../../assets/img/screen/radiance-small.png') no-repeat;
       background-size: 100% auto;
      transform: rotate(180deg);
      pointer-events: none;
    }
  }
}
</style>