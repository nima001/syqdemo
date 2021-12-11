<template>
  <div class="kpi-district">
    <div class="corner-adorn top left"></div>
    <div class="corner-adorn top right"></div>
    <div class="corner-adorn bottom left"></div>
    <div class="corner-adorn bottom right"></div>
    <div class="corner-edge h top"></div>
    <div class="corner-edge v right"></div>
    <div class="corner-edge h bottom"></div>
    <div class="corner-edge v left"></div>
    <div class="header">区县质效</div>
    <div class="body">
      <div class="map">
        <Map330500
          @select="onSelected"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          ref="map"
        />
        <div class="legend">
          <div class="legend-title">绩效评分</div>
          <div class="legend-content">
            <ul class="legend-items">
              <li class="level-1"></li>
              <li class="level-2"></li>
              <li class="level-3"></li>
              <li class="level-4"></li>
              <li class="level-5"></li>
            </ul>
            <div class="legend-text">
              <span>高</span>
              <span>低</span>
            </div>
          </div>
          <div class="legend-footer">
            <img src="../../../assets/img/screen/icon-veto.png"><span>一票否优</span>
          </div>
        </div>
        <transition name="slide-fade">
          <KpiOverview v-if="overviewData" :org="overviewData"/>
        </transition>
      </div>
      <div class="chart">
        <ul class="legend">
          <li><span class="icon type-a"></span><span>质效评估总分</span></li> 
          <li><span class="icon type-b"></span><span>地区工作质效</span></li> 
        </ul>
        <ul class="items">
          <li v-for="item in chartData" :key="item.id">
            <div class="element">
              <div class="bar-wrapper">
                <div class="bar type-a" :style="{height: `${Math.min(100, item.total)}%`}">
                  <span class="text" >{{item.total}}</span>
                </div>
                <div class="bar type-b" :style="{height: `${Math.min(100, item.work)}%`}">
                  <span class="text">{{item.work}}</span>
                </div>
              </div>
            </div>
            <div class="label">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <DialogBox v-model="visible" 
      :title="`${selected && selected.name}质效详情`" 
      :destroyOnClose="true"
    >
      <KpiDetail :org="selected" @finish="callback"/>
    </DialogBox>
    <dialog-box v-model="detailModal" :title="selected && selected.name" :destroyOnClose="true">
      <detail-info :columns="columns" :dataSource="dataSource"></detail-info>
    </dialog-box>
  </div>
</template>
<script>
import Map330500 from './Map330500'
import KpiOverview from './KpiOverview'
import DialogBox from './DialogBox'
import KpiDetail from './KpiDetail'
import { sortBy } from 'lodash'
import DetailInfo from './DetailInfo';
import { districtKpi } from '@/person-huzhou/api/kpi'

import counterData from "./count2";
const renderContent = (value, row, index) => {
  console.log(value);
  const obj = {
    children: value instanceof Object ? value["value"] : value,
    attrs: {}
  };
  if (value && !(value instanceof String)) {
    obj.attrs.rowSpan = value["rowspan"];
  } else {
    obj.attrs.rowSpan = 0;
  }
  return obj;
};
const columns = [
  { title: "序号", dataIndex: "index", width: 60 },
  {
    title: "项目",
    dataIndex: "project",
    customRender: renderContent,
    width: 120
  },
  { title: "评分办法", dataIndex: "scoremethods" },
  { title: "核心指标", dataIndex: "indicator", width: 200 },
  { title: "指标数据", dataIndex: "indicatornum", width: 70 },
  { title: "平均值", dataIndex: "averagenum", width: 70 },
  { title: "排名", dataIndex: "rank", width: 70 },
  { title: "得分", dataIndex: "score", width: 70 },
  { title: "同比去年", dataIndex: "compare", width: 70 }
];
/**
 * 地区绩效
 */
export default {
  components: {
    Map330500,
    KpiOverview,
    DialogBox,
    DetailInfo,
    KpiDetail
  },
  data(){
    return {
      detailModal:false,
      list: undefined,
      overviewData: undefined,
      visible: false,
      selected: undefined,
      
      columns,
      dataSource: counterData["市委组织部"],
    }
  },
  computed: {
    chartData(){
      if(this.list){
        return this.list.map(item => {
          let { id, name, district, overview } = item;
          let work = overview[0].score;
          let total = overview.reduce((total, item) => total + item.score, 0);
          item.total = total;
          return {
            id, name, district, total, work
          }
        })
      }
      return [];
    }
  },
  created(){
    this.loadData();
  },
  methods: {
    callback(){
      this.detailModal = true;
    },
    loadData(){
      districtKpi().then(({result}) => {
        this.list = result;
        this.setMapData();
      });
    },
    setMapData(){
      this.$nextTick(() => {
        let map = this.$refs.map.$el;
        let eleMap = {};
        let gs = map.getElementsByTagName('g');
        for(let item of gs){
          let adcode = item.getAttribute('adcode');
          if(adcode){
            eleMap[adcode] = item;
          }
        }
        let orders = sortBy(this.chartData, 'total');
        let postion = 1, total;
        orders.forEach((item, index) => {
          if(total !== item.total){
            postion = index + 1;
          }
          total = item.total;
          let el = eleMap[item.district];
          if(el){
            el.classList.add('level-' + postion)
          }
        });
      })
    },
    onSelected({ adcode }){
      this.selected = this.list.find(item => item.district == adcode);
      this.visible = true;
    },
    onMouseEnter(area){
      let { adcode, title } = area;
      let item = this.list.find(item => item.district == adcode);
      if(item){
        this.overviewData = item; 
      }
    },
    onMouseLeave(area){
      this.overviewData = undefined;
    },
  }
}
</script>
<style lang="less" scoped>
.kpi-district{
  position: relative;
  padding-top: 48px;
  & > .header{
    height: 48px;
    margin-top: -48px;
    line-height: 48px;
    padding-left: 60px;
    font-size: 20px;
    font-weight: bold;
    color: fade(#fff, 75%);
    position: relative;
    &::before{
      content: ' ';
      position: absolute;
      top: 50%;
      left: 0;
      width: 62px;
      height: 62px;
      transform: translateY(-50%);
      display: inline-block;
      vertical-align: text-bottom;
      background: url('../../../assets/img/screen/icon-district.png') no-repeat;
    }
  }
  & > .body{
    height: 100%;
    padding-top: 15px;
    position: relative;
    .map{
      height: 300px;
      padding-top: 24px;
      padding-left: 20px;
      text-align: center;
      svg{
        height: 100%;
        /deep/g{
          &.level-1{
            fill: fade(#00FFEA, 75%);
          }
          &.level-2{
            fill: fade(#00FFEA, 60%);
          }
          &.level-3{
            fill: fade(#00FFEA, 45%);
          }
          &.level-4{
            fill: fade(#00FFEA, 30%);
          }
          &.level-5{
            fill: fade(#00FFEA, 15%);
          }
        }
      }
      .legend{
        position: absolute;
        top: 10px;
        left: 60px;
        color: fade(#fff, 60%);
        text-align: left;
        .legend-title{
          font-size: 12px;
        }
        .legend-content{
          display: flex;
        }
        .legend-items{
          margin: 0;
          li{
            display: block;
            width: 20px;
            height: 6px;
            margin: 12px 0;
            background-color: #00FFEA;
            &.level-1{
              background-color: fade(#00FFEA, 75%);
            }
            &.level-2{
              background-color: fade(#00FFEA, 60%);
            }
            &.level-3{
              background-color: fade(#00FFEA, 45%);
            }
            &.level-4{
              background-color: fade(#00FFEA, 30%);
            }
            &.level-5{
              background-color: fade(#00FFEA, 15%);
            }
          }
        }
        .legend-text{
          font-size: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 15px;
        }
        .legend-footer{
          img{
            width: 14px;
            height: 14px;
          }
          span{
            display: inline-block;
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
      .kpi-overview{
        position: absolute;
        top: 350px;
        left: 55px;
        &.slide-fade-enter-active {
          transition: all .3s ease;
        }
        &.slide-fade-leave-active {
          transition: all .3s ease;
        }
        &.slide-fade-enter, &.slide-fade-leave-to {
          transform: translateY(100px);
          opacity: 0;
        }
      }
      
    }
    .chart{
      margin: 0 60px;
      margin-top: 100px;
      color: fade(#fff, 80%);
      .type-a{
        background: linear-gradient(180deg, #00FFEA 0%, #6EDF75 100%);
      }
      .type-b{
        background: linear-gradient(180deg, #00C2FF 0%, #6E7DDF 100%);
      }
      & > .legend{
        text-align: center;
        li{
          display: inline-block;
          margin-left: 30px;
          &:first-child{
            margin: 0;
          }
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: -0.15em;
            margin-right: 5px;
          }
        }
      }
      & > .items{
        display: flex;
        margin: 0 -5px;
        justify-content: space-between;;
        li{
          padding: 5px;
          .element{
            width: 62px;
            height: 174px;
            padding-top: 24px;
            background-color: fade(#00FFEA, 20%);
            transition: all .3s cubic-bezier(.645, .045, .355, 1);
            cursor: default;
            &:hover{
              background-color: fade(#00FFEA, 30%);
            }
          }
          .bar-wrapper{
            height: 100%;
            position: relative;
          }
          .bar{
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 30px;
            transform: translateX(-50%);
            .text{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              font-weight: bold;
              margin-top: -24px;
              height: 24px;
              font-size: 20px;
              line-height: 24px;
            }
          }
          & > .label{
            margin-top: 20px;
            font-size: 18px;
            line-height: 1.2em;
            text-align: center;
          }
        }
      }
    }
    
  }


  .corner-adorn{
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid #01e4d4;
    pointer-events: none;
    &.top{
      top: 0;
      border-bottom: none;
    }
    &.bottom{
      bottom: 0;
      border-top: none;
    }
    &.left{
      left: 0;
      border-right: none;
    }
    &.right{
      right: 0;
      border-left: none;
    }
  }
  .corner-edge{
    position: absolute;
    pointer-events: none;
    &.h{
      width: 100%;
      height: 100px;
      background: url('../../../assets/img/screen/radiance-large-h.png') no-repeat;
      background-size: 100% 100%;
    }
    &.v{
      width: 40px;
      height: 100%;
      background: url('../../../assets/img/screen/radiance-large-v.png') no-repeat;
      background-size: 100% 100%;
    }
    &.top{
      top: 0;
    }
    &.bottom{
      bottom: 0;
      transform: rotate(180deg);
    }
    &.left{
      left: 0;
    }
    &.right{
      right: 0;
      transform: rotate(180deg);
    }
  }
}
</style>