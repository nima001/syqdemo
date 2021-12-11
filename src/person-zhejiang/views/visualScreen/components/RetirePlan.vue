<template>
  <div>
    <div style="height: 305px" class="container">
      <div class="title">
        <p>近五年共计退休人数</p>
        <lcd-font
          :length="6"
          :smooth="false"
          :realNumber="realNumber"
          :realStyle="realStyle"
          :fakeStyle="fakeStyle"
        />
      </div>
      <div>
        <!-- <BarChart
          v-if="data"
          :data="data"
          :settings="dataSetting"
        /> -->
        <div class="detail-info">
          <div class="body">
            <ul class="bar-chart">
              <li v-for="(item,index) in data" :key="index" @click="onclick(index+1)">
                <div class="num">{{Math.max(item.value || 0, 0)}}</div>
                <div class="bar">
                  <div :style="{
                    height: getBarPercent(item.value)
                  }"></div>
                </div>
                <div class="label">第{{index+1}}年</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import LcdFont from "../components/LcdFont";
import BarChart from "@person/components/chart/BarChart";
import { values, isNumber, forIn, concat, endsWith } from 'lodash';
import { retireAnalyze } from "../../../api/analyze";
import { showError } from "../../../../framework/utils";
import { openRetireInfo } from './smzUtils';
import { areaStatistics } from '@/person-shaoxing/api/orgStaffReport';
export default {
  props: {
    districtCode: {
      type: String,
    },
    type: String,
  },
  components: {
    Title,
    BarChart,
    LcdFont
  },
  data() {
    return {
      realStyle: {
        color: "#01E3FC",
        textStroke: "1 #ECA066",
        opacity: 0.95,
        fontSize: '25px',
      },
      realNumber: 0,
      fakeStyle: {
        fontSize: '25px',
      },
      jgType: undefined,
      data: undefined,
      districtList: [
        {value:330000, text:'浙江省'},
        {value:330100, text:'杭州市'},
        {value:330102, text:'上城区'},
        {value:330103, text:'下城区'},
        {value:330104, text:'江干区'},
        {value:330105, text:'拱墅区'},
        {value:330106, text:'西湖区'},
        {value:330108, text:'滨江区'},
        {value:330109, text:'萧山区'},
        {value:330110, text:'余杭区'},
        {value:330111, text:'富阳区'},
        {value:330112, text:'临安区'},
        {value:330122, text:'桐庐县'},
        {value:330127, text:'淳安县'},
        {value:330182, text:'建德市'},
        {value:330200, text:'宁波市'},
        {value:330203, text:'海曙区'},
        {value:330205, text:'江北区'},
        {value:330206, text:'北仑区'},
        {value:330211, text:'镇海区'},
        {value:330212, text:'鄞州区'},
        {value:330213, text:'奉化区'},
        {value:330225, text:'象山县'},
        {value:330226, text:'宁海县'},
        {value:330281, text:'余姚市'},
        {value:330282, text:'慈溪市'},
        {value:330300, text:'温州市'},
        {value:330302, text:'鹿城区'},
        {value:330303, text:'龙湾区'},
        {value:330304, text:'瓯海区'},
        {value:330305, text:'洞头区'},
        {value:330324, text:'永嘉县'},
        {value:330326, text:'平阳县'},
        {value:330327, text:'苍南县'},
        {value:330328, text:'文成县'},
        {value:330329, text:'泰顺县'},
        {value:330381, text:'瑞安市'},
        {value:330382, text:'乐清市'},
        {value:330383, text:'龙港市'},
        {value:330400, text:'嘉兴市'},
        {value:330402, text:'南湖区'},
        {value:330411, text:'秀洲区'},
        {value:330421, text:'嘉善县'},
        {value:330424, text:'海盐县'},
        {value:330481, text:'海宁市'},
        {value:330482, text:'平湖市'},
        {value:330483, text:'桐乡市'},
        {value:330500, text:'湖州市'},
        {value:330501, text:'吴兴区'},
        {value:330502, text:'南浔区'},
        {value:330521, text:'德清县'},
        {value:330522, text:'长兴县'},
        {value:330523, text:'安吉县'},
        {value:330600, text:'绍兴市'},
        {value:330602, text:'越城区'},
        {value:330603, text:'柯桥区'},
        {value:330604, text:'上虞区'},
        {value:330624, text:'新昌县'},
        {value:330681, text:'诸暨市'},
        {value:330683, text:'嵊州市'},
        {value:330700, text:'金华市'},
        {value:330702, text:'婺城区'},
        {value:330703, text:'金东区'},
        {value:330723, text:'武义县'},
        {value:330726, text:'浦江县'},
        {value:330727, text:'磐安县'},
        {value:330781, text:'兰溪市'},
        {value:330782, text:'义乌市'},
        {value:330783, text:'东阳市'},
        {value:330784, text:'永康市'},
        {value:330800, text:'衢州市'},
        {value:330802, text:'柯城区'},
        {value:330803, text:'衢江区'},
        {value:330822, text:'常山县'},
        {value:330824, text:'开化县'},
        {value:330825, text:'龙游县'},
        {value:330881, text:'江山市'},
        {value:330900, text:'舟山市'},
        {value:330902, text:'定海区'},
        {value:330903, text:'普陀区'},
        {value:330921, text:'岱山县'},
        {value:330922, text:'嵊泗县'},
        {value:331000, text:'台州市'},
        {value:331002, text:'椒江区'},
        {value:331003, text:'黄岩区'},
        {value:331004, text:'路桥区'},
        {value:331022, text:'三门县'},
        {value:331023, text:'天台县'},
        {value:331024, text:'仙居县'},
        {value:331081, text:'温岭市'},
        {value:331082, text:'临海市'},
        {value:331083, text:'玉环市'},
        {value:331100, text:'丽水市'},
        {value:331101, text:'莲都区'},
        {value:331122, text:'青田县'},
        {value:331123, text:'云和县'},
        {value:331125, text:'庆元县'},
        {value:331126, text:'缙云县'},
        {value:331127, text:'遂昌县'},
        {value:331128, text:'松阳县'},
        {value:331129, text:'景宁畲族自治县'},
        {value:331181, text:'龙泉市'},
      ]
    };
  },
  watch: {
    districtCode(val) {
      this.loadData(val);
      return val;
    },
    districts(val) {
      return val;
    },
  },
  computed: {
    dataSetting() {
      return {
        canvas: {width: 350, height: 250},
        padding: [20, 10, 0, -15],
        legend: true,
        color: ['#FF7C28', '#8FC7FF'],
        slider: {
          visible: true,
          style: { textStyle: { fill: '#fff' }, padding: [0, 0, 10, -20] },
        },
        legend: { visible: true, position: 'top' },
        yAxis: { grid: true ,title: {visible: true, content: '人数'}},
      }
    },
    maxNum(){
      let num = 0;
      if(this.data&&this.data.length){
        this.data.forEach((item) => {
          if(item.value > 0 && num < item.value){
            num = item.value;
          }
        });
      }
      return num
    },
    districts() {
      let v = this.$store.getters.dict('usermanage.org.district');
      return v;
    },
  },
  mounted() {
    if(this.districtCode) {
      this.loadData(this.districtCode);
    }
  },
  methods: {
    getBarPercent(num){
      if(this.maxNum > 0){
        num = Math.max(num || 0, 0);
        return `${100 - (num * 100/this.maxNum).toFixed(2)}%`
      }
      return "100%"
    },
    getGecode(value) {
      let v = this.districts.filter((item)=>item.value == value);
      let geArray = undefined;
       if(v[0].text=='省本级') {
        geArray = this.districtList.filter(item=>item.text=='浙江省');
      }else{
        geArray = this.districtList.filter(item=>item.text==(v[0].text).replace('市本级',''));
      }
      return geArray[0].value;
    },
    onclick(val) {
      let gecode,sfsbj,jgType = undefined;
      if(endsWith(this.districtCode, '01')) {
        gecode = this.getGecode(this.districtCode);
        sfsbj = 1;
      }else{
        let v = this.districtList.filter(item=>item.value==this.districtCode);
        gecode = v[0].value;
        sfsbj = 0;
      }
      openRetireInfo(gecode, sfsbj, this.jgType, val);
    },
    getData(val) {
      let array = [];
      forIn(val,(value, key)=>{
        array = concat(array, {name: key.match(/\d+/g)[0], value: value});
      });
      return array;
    },
    loadData(val) {
      // retireAnalyze(val)
      //   .then(({ result }) => {
      //     this.data = result;
      //   })
      //   .catch((error) => {
      //     showError(error);
      //   });
      let array = undefined;
      if(this.type=='dz') {
        array = [
          'dzqjwntxzrs', 'dzq2021txrs',
          'dzq2022txrs', 'dzq2023txrs',
          'dzq2024txrs', 'dzq2025txrs',
        ];
        this.jgType = 'local';
      }else if(this.type=='zf') {
        array = [
          'zfjwntxzrs', 'zf2021txrs',
          'zf2022txrs', 'zf2023txrs',
          'zf2024txrs', 'zf2025txrs',
        ];
        this.jgType = 'zf';
      }else if(this.type=='sy') {
        array = [
          'syjwntxzrs', 'sy2021txrs',
          'sy2022txrs', 'sy2023txrs',
          'sy2024txrs', 'sy2025txrs',
        ];
        this.jgType = 'sy';
      }
      areaStatistics(val,array).then(({result}) => {
        if(this.type=='dz') {
          this.realNumber = result.dzqjwntxzrs;
          this.$delete(result,"dzqjwntxzrs");
        }else if(this.type=='zf') {
          this.realNumber = result.zfjwntxzrs;
          this.$delete(result,"zfjwntxzrs");
        }else if(this.type=='sy') {
          this.realNumber = result.syjwntxzrs;
          this.$delete(result,"syjwntxzrs");
        }
        this.$delete(result,"name");
        // console.log(this.getData(result))
        this.data = this.getData(result);
        this.showAge = true;
      }).catch(error => {
        showError(error)
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  margin: 0 20px;
  .title {
    font-size: 18px;
    line-height: 26px;
    color: #01E3FC;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      margin: 0;
    }
  }
  .detail-info{
    & > .body{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .bar-chart{
        display: flex;
        justify-content: center;
        li{
          min-width: 30px;
          padding: 4px;
          margin: 0 @padding-xs;
          text-align: center;
          .num{
            margin-bottom: @padding-md;
            color: fade(#fff, 80%);
            font-size: 18px;
          }
          .bar{
            width: 18px;
            height: 130px;
            background: linear-gradient(to top, #373FCB, #8672DD);
            margin: auto;
            position: relative;
            cursor: pointer;
            & > div{
              background-color: #343434;
            }
            &::before {
              content: '';
              position: absolute;
              top: -10px;
              left: -10px;
              right: -10px;
              bottom: 0;
              background: linear-gradient(to top, fade(#383FCC, 20%), fade(#8773DD, 20%));
            }
          }
          .label{
            margin-top: 10px;
            color: fade(#fff, 80%);
            font-size: 16px;
            white-space: nowrap;
          }
        }
      }
    }
  }
  // .wrap {
  //   height: 100%;
  // }
  // /deep/.chart {
  //   flex: 1;
  //   & > div {
  //     height: 100%;
  //   }
  // }
}
</style>
