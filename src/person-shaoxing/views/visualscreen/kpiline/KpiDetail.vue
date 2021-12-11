<template>
  <div class="kpi-detail">
    <div class="header">
      <lcd-font :length="3" :smooth="false" :precision="1" :realNumber="total"/> 分
    </div>
    <split-line/>
    <div class="body">
      <div class="left">
        <div class="chart" ref="chart">
        </div>
        <div v-if="plus" class="plus-item">
          问题整改加分<span class="num">{{plus}}分</span>
        </div>
      </div>
      <div class="right">
        <div v-for="item in issues" :key="item.title">
          <h1 :class="{warn: item.items.length > 0}">
            {{item.title}}
            <span v-if="item.items.length > 0" class="desc">共发现<span class="num">{{item.items.length}}</span>个问题</span>
            <span v-else class="desc">无异常</span>
          </h1>
          <p v-for="(text, index) in item.items" :key="index">{{text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
import { showError } from '../../../../framework/utils';
import LcdFont from "../components/LcdFont";
import { getstatisinfo } from "@/person/api/org";
import { areaStatistics } from '@/person-shaoxing/api/orgStaffReport'
import SplitLine from '../components/SplitLine.vue';

export default {
  components: {
    LcdFont,
    SplitLine,
  },
  props: {
    type: String, //qy 区域绩效  xz 行政机构绩效  sy 事业单位绩效
    id: String, //区域编码  机构/单位ID
  },
  data(){
    return {
      qy: {
        total: 'zhjx',
        chart: [
          { name: '机构', value: 'jgzb'},
          { name: '核编', value: 'hbzb'},
          { name: '用编', value: 'ybzb'},
          { name: '职数', value: 'zszb'},
          { name: '问题', value: 'wtzb'},
          { name: '经济', value: 'jjzb'},
        ],
        plus: 'wtjf',
        issues: [
          {
            title: '机构指标',
            items: [
              (data) => {
                let {dzjgzlsys = 0, dzjgzl_sy = 0, dzhgzl_xe = 0} = data;
                if(dzjgzlsys<0){
                  return `党政机关设置超省定总量${dzjgzlsys}（实有党政机关总量${dzjgzl_sy}，省定党政机关总量${dzhgzl_xe}）`;
                }
              },
              (data) => {
                let {xzjjjgsys = 0, xzjjjg_sy = 0, xzjjjg_xe = 0} = data;
                if(xzjjjgsys<0){
                  return `局级行政机构设置超省定限额${xzjjjgsys}（实有局级行政机构数${xzjjjg_sy}，省定局级行政机构限额${xzjjjg_xe}）`;
                }
              },
              (data) => {
                let {syjgsys = 0, syjg_sy = 0, syjg_xe = 0} = data;
                if(syjgsys<0){
                  return `事业单位设置超省定总量${syjgsys}（实有事业单位总量${syjg_sy}，省定事业单位总量${syjg_xe}）`;
                }
              },
              (data) => {
                let {syjjjgsys = 0, syjjjg_sy = 0, syjjjg_xe = 0} = data;
                if(syjjjgsys<0){
                  return `局级事业单位设置超省定限额${syjjjgsys}（实有局级事业单位数${syjjjg_sy}，省定局级事业单位限额${syjjjg_xe}）`;
                }
              },
            ]
          },
          {
            title: '核编指标',
            items: [
              (data) => {
                let {hdxzbzqygq = 0, zgbzzl = 0} = data;
                let t = hdxzbzqygq-zgbzzl;
                if(t>0){
                  return `实际核定行政编制总量超省定行政编制总量${t}（实际核定行政编制总量${hdxzbzqygq}，省定行政编制总量${zgbzzl}）`;
                }
              },
              (data) => {
                let {hesybzqy = 0, sybzzl = 0} = data;
                let t = hesybzqy-sybzzl;
                if(t>0){
                  return `局级行政机构设置超省定限额${t}（实际核定事业编制总量${hesybzqy}，省定事业编制总量${sybzzl}）`;
                }
              },
            ]
          },
          {
            title: '用编指标',
            items: [
              (data) => {
                let {hdxzbzqy_sy = 0, hdxzbzqy = 0} = data;
                let t = hdxzbzqy_sy-hdxzbzqy;
                if(t>0){
                  return `实有行政人员数超实际核定机关编制总量${t}（实有行政人员数${hdxzbzqy_sy}，实际核定机关编制总量${hdxzbzqy}）`;
                }
              },
              (data) => {
                let {hdsybzqy_sy = 0, hdsybzbbqy = 0} = data;
                let t = hdsybzqy_sy-hdsybzbbqy;
                if(t>0){
                  return `实有事业人员数超实际核定事业编制总量${t}（实有事业人员数${hdsybzqy_sy}，实际核定事业编制总量${hdsybzbbqy}）`;
                }
              },
            ]
          },
          {
            title: '职数指标',
            items: [
              (data) => {
                let {hdldzsqy_sy = 0, hdldzsqy = 0, syhdldzsqy_sy = 0, syhdldzsqy = 0} = data;
                let t = (hdldzsqy_sy-hdldzsqy) + (syhdldzsqy_sy-syhdldzsqy);
                if(t>0){
                  return `实有部门单位领导实有数超实际核定领导职数${t}（实有部门单位领导实有数${hdldzsqy_sy + syhdldzsqy_sy}，实际核定领导职数${hdldzsqy + syhdldzsqy}）`;
                }
              },
              (data) => {
                let {hdzcldzsqy_sy = 0, hdzcldzsqy = 0, syhdzcldzsqy_sy = 0, syhdzcldzsqy = 0} = data;
                let t = (hdzcldzsqy_sy-hdzcldzsqy) + (syhdzcldzsqy_sy-syhdzcldzsqy);
                if(t>0){
                  return `实有中层领导实有数超实际核定中层领导职数${t}（实有中层领导实有数${hdzcldzsqy_sy + syhdzcldzsqy_sy}，实际核定中层领导职数${hdzcldzsqy + syhdzcldzsqy}）`;
                }
              },
            ]
          },
          {
            title: '问题指标',
            items: [
              (data) => {
                let {wzgwt = 0} = data;
                if(wzgwt>0){
                  return `存在${wzgwt}条未整改编制违规问题`;
                }
              },
            ]
          },
          {
            title: '经济指标',
            items: [ ]
          }
        ],
        loadData(id){
          return areaStatistics(id, [
            'zhjx','jgzb', 'hbzb', 'ybzb', 'zszb','wtzb', 'jjzb', 'wtjf','dzjgzlsys', 'dzjgzl_sy','dzhgzl_xe' ,'xzjjjgsys',
            'xzjjjg_sy','xzjjjg_xe','syjgsys','syjg_sy','syjg_xe','syjjjgsys','syjjjg_sy', 'syjjjg_xe','hdxzbzqy', 'hdxzbzqygq',
            'zgbzzl','hesybzqy', 'hdxzbzqy_sy', 'hdsybzbbqy', 'sybzzl','hdsybzqy_sy','hdldzsqy_sy','hdldzsqy','hdzcldzsqy_sy','hdzcldzsqy', 'wzgwt',
            'syhdldzsqy_sy', 'syhdldzsqy', 'syhdzcldzsqy_sy', 'syhdzcldzsqy'
          ]).then(({result}) => result);
        }
      },
      xz: {
        total: 'zgdwjxpg',
        chart: [
          { name: '用编', value: 'ybzbxzjg'},
          { name: '职数', value: 'zszbxzjg'},
          { name: '配比', value: 'sbjpbzbxzjg'},
          { name: '问题', value: 'wtzbxzjg'},
          { name: '人员结构', value: 'ryjgzbxzjg'},
          { name: '考核', value: 'khzb'},
        ],
        issues: [
          {
            title: '用编指标',
            items: [
              (data) => {
                let {jgbzsyzj = 0, jghdbzs = 0} = data;
                if(jgbzsyzj-jghdbzs>0){
                  return `实有行政人员数超实际核定机关编制总量${jgbzsyzj-jghdbzs}（实有行政人员数${jgbzsyzj}，实际核定机关编制总量${jghdbzs}）`;
                }
              },
              (data) => {
                let {xssybzsys = 0, xssyhdbzs = 0} = data;
                let t = xssybzsys-xssyhdbzs;
                if(t>0){
                  return `下属事业单位实有事业人员数超实际核定事业编制总量${t}（实有事业人员数${xssybzsys}，实际核定事业编制总量${xssyhdbzs}）`;
                }
              },
            ]
          },
          {
            title: '职数指标',
            items: [
              (data) => {
                let {ldzs_hd_sy = 0, ldzs_hd = 0} = data;
                let t = ldzs_hd_sy-ldzs_hd;
                if(t>0){
                  return `实有部门领导实有数超实际核定部门领导职数${t}（实有部门单位领导实有数${ldzs_hd_sy}，实际核定领导职数${ldzs_hd}）`;
                }
              },
              (data) => {
                let {zcldzs_sy = 0, zcldzs_hd = 0} = data;
                let t = zcldzs_sy-zcldzs_hd;
                if(t>0){
                  return `实有部门中层领导实有数超实际核定部门中层领导职数${t}（实有中层领导实有数${zcldzs_sy}，实际核定中层领导职数${zcldzs_hd}）`;
                }
              },
              (data) => {
                let {xsldzs_hd_sy = 0, xsldzs_hd = 0} = data;
                let t = xsldzs_hd_sy-xsldzs_hd;
                if(t>0){
                  return `下属事业单位领导实有数超实际核定事业单位领导职数${t}（下属事业单位领导实有数${xsldzs_hd_sy}，实际核定事业单位领导职数${xsldzs_hd}）`;
                }
              },
              (data) => {
                let {xszcldzs_sy = 0, xsldzs_hd = 0} = data;
                let t = xszcldzs_sy-xsldzs_hd;
                if(t>0){
                  return `下属事业单位中层领导实有数超实际核定事业单位中层领导职数${t}（下属事业单位中层领导实有数${xszcldzs_sy}，实际核定事业单位中层领导职数${xsldzs_hd}）`;
                }
              },
            ]
          },
          {
            title: '配比指标',
            items: [
              (data) => {
                let {ldzs_hd = 0, ldzsbz = 0} = data;
                let t = ldzs_hd-ldzsbz;
                if(t>0){
                  return `实际核定部门领导职数超部门领导核定标准值l${t}（实际核定部门领导职数${ldzs_hd}，部门领导核定标准值${ldzsbz}）`;
                }
              },
              (data) => {
                let {zcldzs_hd = 0, zcldzsbz = 0} = data;
                let t = zcldzs_hd-zcldzsbz;
                if(t>0){
                  return `实际核定中层领导职数超中层领导核定标准值${t}(实际核定中层领导职数${zcldzs_hd}，中层领导核定标准值${zcldzsbz})`;
                }
              },
            ]
          },
          {
            title: '问题指标',
            items: [
              (data) => {
                let t = 0;
                if(t>0){
                  return `存在${t}条未整改编制违规问题`;
                }
              },
            ]
          },
          {
            title: '人员结构指标',
            items: [
              (data) => {
                let {syrynl = 0,jgbzsyzj = 0} = data;
                if(syrynl > 0 && jgbzsyzj > 0){
                  let zb = (syrynl*100/jgbzsyzj).toFixed(2) + '%';
                  return `实有27周岁以下及55周岁以上行政人员${syrynl}，实有行政人员数${jgbzsyzj}，占比${zb}`;
                }
              },
              (data) => {
                let {zkjyxzxry = 0,jgbzsyzj = 0} = data;
                if(zkjyxzxry > 0 && jgbzsyzj > 0){
                  let zb = (zkjyxzxry*100/jgbzsyzj).toFixed(2) + '%'; 
                  return `专科及以下学历行政人员${zkjyxzxry}，实有行政人员数${jgbzsyzj}，占比${zb}`;
                }
              },
              (data) => {
                let {syrynlsy = 0,xssybzsys = 0} = data;
                if(syrynlsy > 0 && xssybzsys > 0){
                  let zb = (syrynlsy*100/xssybzsys).toFixed(2) + '%'; 
                  return `实有27周岁以下及55周岁以上下属事业单位人员${syrynlsy}，下属事业单位实有事业人员数${xssybzsys}，占比${zb}`;
                }
              },
              (data) => {
                let {zkjyxsyry = 0,xssybzsys = 0} = data;
                if(zkjyxsyry > 0 && xssybzsys > 0){
                  let zb = (zkjyxsyry*100/xssybzsys).toFixed(2) + '%'; 
                  return `专科及以下学历下属事业单位人员${zkjyxsyry},下属事业单位实有事业人员数${xssybzsys},占比${zb}`;
                }
                
              },
            ]
          },
          {
            title: '考核指标',
            items: [
              (data) => {
                if(data.khzb < 100){
                  return `部门年度考核未获得优秀评级`;
                }
              },
            ]
          },
        ],
        loadData(id){
          return getstatisinfo(id).then(({result}) => result);
        }
      },
      sy: {
        total: 'sydwjxpg',
        chart: [
          { name: '用编', value: 'ybzbsydw'},
          { name: '职数', value: 'zszbsydw'},
          { name: '配比', value: 'sbjpbzbsydw'},
          { name: '问题', value: 'wtzbsydw'},
          { name: '人员结构', value: 'ryjgzbsydw'},
          { name: '考核', value: 'kfzbsydw'},
        ],
        issues: [
          {
            title: '用编指标',
            items: [
              (data) => {
                let {sybzsys = 0, syhdbzs = 0} = data;
                if(sybzsys-syhdbzs>0){
                  return `实有事业人员数超实际核定事业编制总量${sybzsys-syhdbzs}（实有事业人员数${sybzsys}，实际核定事业编制总量${syhdbzs}）`;
                }
              },
            ]
          },
          {
            title: '职数指标',
            items: [
              (data) => {
                let {ldzs_hd_sy = 0, ldzs_hd = 0} = data;
                if(ldzs_hd_sy-ldzs_hd>0){
                  return `事业单位领导实有数超实际核定事业单位领导职数${ldzs_hd_sy-ldzs_hd}（事业单位领导实有数${ldzs_hd_sy}，实际核定事业单位领导职数${ldzs_hd}）`;
                }
              },
              (data) => {
                let {zcldzs_sy = 0, zcldzs_hd = 0} = data;
                if(zcldzs_sy-zcldzs_hd>0){
                  return `事业单位中层领导实有数超实际核定事业单位中层领导职数${zcldzs_sy-zcldzs_hd}（事业单位中层领导实有数${zcldzs_sy}，实际核定事业单位中层领导职数${zcldzs_hd}）`;
                }
              },
            ]
          },
          {
            title: '配比指标',
            items: [
              (data) => {
                let {ldzs_hd = 0, ldzsbz = 0} = data;
                if(ldzs_hd-ldzsbz>0){
                  return `实际核定部门领导职数超部门领导核定标准值${ldzs_hd-ldzsbz}（实际核定部门领导职数${ldzs_hd}，部门领导核定标准值${ldzsbz}）`;
                }
              },
              (data) => {
                let {zcldzs_hd = 0, zcldzsbz = 0} = data;
                if(zcldzs_hd-zcldzsbz>0){
                  return `实际核定中层领导职数超中层领导核定标准值${zcldzs_hd-zcldzsbz}(实际核定中层领导职数${zcldzs_hd}，中层领导核定标准值${zcldzsbz})`;
                }
              },
            ]
          },
          {
            title: '问题指标',
            items: [
              (data) => {
                let t = 0;
                if(t>0){
                  return `存在${t}条未整改编制违规问题`;
                }
              },
            ]
          },
          {
            title: '人员结构指标',
            items: [
              (data) => {
                let {syrynl = 0,sybzsys = 0} = data;
                if(syrynl > 0 && sybzsys > 0){
                  let zb = (syrynl*100/sybzsys).toFixed(2) + '%';
                  return `实有27周岁以下及55周岁以上事业人员${syrynl}，事业单位实有事业人员数${sybzsys}，占比${zb}`;
                }
              },
              (data) => {
                let {zkjyxzxry = 0,sybzsys = 0} = data;
                if(zkjyxzxry > 0 && sybzsys > 0){
                  let zb = (zkjyxzxry*100/sybzsys).toFixed(2) + '%'; 
                  return `专科及以下学历事业人员${zkjyxzxry}，事业单位实有事业人员数${sybzsys}，占比${zb}`;
                }
              },
            ]
          },
          {
            title: '考核指标',
            items: [
              (data) => {
                if(data.kfzbsydw < 100){
                  return `主管部门年度考核未获得优秀评级`;
                }
              },
            ]
          },
        ],
        loadData(id){
          return getstatisinfo(id).then(({result}) => result);
        }
      },
      data: {}
    }
  },
  computed: {
    config(){
      return this.type && this[this.type];
    },
    total(){
      if(this.config){
        return this.data[this.config.total] || 0;
      }
      return 0;
    },
    chartData(){
      if(this.config){
        return this.config.chart.map(item => {
          let value = Number((this.data[item.value] || 0).toFixed(2));
          return {
            item: item.name + '(' + value + ')',
            type: '',
            value,
          }
        })
      }
    },
    plus(){
      if(this.config && this.config.plus){
        return this.data[this.config.plus] || 0;
      }
    },
    issues(){
      if(this.config){
        let arr1 = [], arr2 = [];
        this.config.issues.forEach(item => {
          let issue = {
            title: item.title,
            items: this.checkIssues(item.items, this.data)
          }
          if(issue.items.length > 0){
            arr1.push(issue);
          }else{
            arr2.push(issue);
          }
        })
        return [...arr1, ...arr2];
      }
    }
  },
  watch: {
    chartData(data){
      if(data){
        this.draw(data);
      }
    }
  },
  created(){
    this.loadData();
  },
  methods: {
    loadData(){
      if(this.config){
        this.config.loadData(this.id).then((data) => {
          this.data = data;
        }).catch((error) => {
          showError(error)
        })
      }
    },
    checkIssues(funs, data){
      let arr = [];
      funs.forEach(f => {
        let t = f(data);
        if(t){
          arr.push(t);
        }
      })
      return arr;
    },
    draw(list) {
      const chart = new Chart({ container: this.$refs.chart, autoFit: true });
      chart.data(list);
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
            fontSize: 14,
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
              lineDash: null
            }
          },
          closed: true,
          alternateColor: "#151920"
        },
      });
      chart.point()
        .position("item*value")
        .color("type")
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
        .shape("circle")
        .size(4);
      chart.line().position("item*value").color("type", ['#8fc7ff']).size(2);
      chart.area().position('item*value').color('type');
      chart.tooltip(false);
      chart.legend(false);
      chart.render();
      // this.plot = chart;
    }
  }
}
</script>
<style lang="less" scoped>
.kpi-detail{
  height: 600px;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 16px;
  & > .header{
    margin-top: 20px;
    padding: 10px 40px;
    text-align: center;
  }
  & > .body{
    flex: auto;
    min-height: 1px;
    padding: 20px 40px;
    display: flex;
    & > .left{
      width: 400px;
      .chart{
        height: 350px;
      }
      .plus-item{
        font-size: 14px;
        background-color: #151920;
        border-radius: 5px;
        padding: 5px 10px;
        .num{
          float: right;
          color: #7dc8a3;
        }
      }
    }
    & > .right{
      flex: auto;
      margin-left: 20px;
      overflow: auto;
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
        background-color: #151920;
        border-radius: 5px;
        padding: 5px 15px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>