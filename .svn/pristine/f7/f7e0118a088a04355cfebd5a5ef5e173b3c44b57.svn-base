<template>
  <div>
    <Title title="职务层次分布"/>
    <div class="container">
      <SwiperChart :nextBtn="{zIndex: 999}">
        <div slot="content">
          <div class="header">
            <div class="title">
              <span></span>
              <span>行政核定</span>
            </div>
            <div class="title">
              <span></span>
              <span>行政实有</span>
            </div>
          </div>
          <div class="pro-content">
            <div class="detail xz">
              <span>厅级局正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmtjjzzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmtjjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmtjjzzsys,xzsysMax)" @click="openInfo('tjjzz', 'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmtjjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>县处级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmxcjzzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmxcjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmxcjzzsys,xzsysMax)" @click="openInfo('xcjzz','local')">
                  <template #format="percent">
                    <span>{{ data.xzbmxcjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>厅级局副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmtjjfzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmtjjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmtjjfzsys,xzsysMax)" @click="openInfo('tjjfz', 'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmtjjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>县处级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmxcjfzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmxcjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmxcjfzsys,xzsysMax)" @click="openInfo('xcjfz' ,'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmxcjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>乡科级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmxkjzzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmxkjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmxkjzzsys,xzsysMax)" @click="openInfo('xkjzz', 'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmxkjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>股级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmgjzzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmgjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmgjzzsys,xzsysMax)" @click="openInfo('gjzz', 'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmgjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>乡科级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmxkjfzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmxkjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmxkjfzsys,xzsysMax)" @click="openInfo('xkjfz','local')">
                  <template #format="percent">
                    <span>{{ data.xzbmxkjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail xz">
              <span>股级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.xzbmgjfzhds,xzhdsMax)">
                  <template #format="percent">
                    <span>{{ data.xzbmgjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.xzbmgjfzsys,xzsysMax)" @click="openInfo('gjfz', 'local')">
                  <template #format="percent">
                    <span>{{ data.xzbmgjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
          </div>
        </div>
        <div slot="content">
          <div class="header">
            <div class="title">
              <span></span>
              <span>事业核定</span>
            </div>
            <div class="title">
              <span></span>
              <span>事业实有</span>
            </div>
          </div>
          <div class="pro-content">
            <div class="detail sy">
              <span>厅级局正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwtjjzzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwtjjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwtjjzzsys,sysysMax)" @click="openInfo('tjjzz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwtjjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>县处级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwxcjzzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwxcjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwxcjzzsys,sysysMax)" @click="openInfo('xcjzz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwxcjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>厅级局副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwtjjfzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwtjjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwtjjfzsys,sysysMax)" @click="openInfo('tjjfz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwtjjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>县处级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwxcjfzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwxcjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwxcjfzsys,sysysMax)" @click="openInfo('xcjfz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwxcjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>乡科级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwxkjzzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwxkjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwxkjzzsys,sysysMax)" @click="openInfo('xkjzz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwxkjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>股级正职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwgjzzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwgjzzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwgjzzsys,sysysMax)" @click="openInfo('gjzz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwgjzzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>乡科级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwxkjfzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwxkjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwxkjfzsys,sysysMax)" @click="openInfo('xkjfz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwxkjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
            <div class="detail sy">
              <span>股级副职</span>
              <div class="progress">
                <a-progress :strokeColor="{'0%': '#9B28FF','100%': '#EF9EF8'}" :percent="getPercent(data.sydwgjfzhds,syhdsMax)">
                  <template #format="percent">
                    <span>{{ data.sydwgjfzhds }}</span>
                  </template>
                </a-progress>
                <a-progress :strokeColor="{'0%': '#F98F60','100%': '#E34C2D'}" :percent="getPercent(data.sydwgjfzsys,sysysMax)" @click="openInfo('gjfz', 'sy')">
                  <template #format="percent">
                    <span>{{ data.sydwgjfzsys }}</span>
                  </template>
                </a-progress>
              </div>
            </div>
          </div>
        </div>
      </SwiperChart>
    </div>
  </div>
</template>

<script>
import Title from './Title'
import SwiperChart from './SwiperChart'
import { Progress } from 'ant-design-vue';
import { includes, forIn, endsWith } from 'lodash';
import { areaStatistics } from '@/person-shaoxing/api/orgStaffReport'
import { openZwccInfo } from './smzUtils';
import { showError } from '../../../../framework/utils';

export default {
  props: {
    districtCode: {
      type: String
    }
  },
  components: {
    Title,
    AProgress: Progress,
    SwiperChart
  },
  data() {
    return {
      data: {},
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
    }
  },
  watch: {
    districtCode(val) {
      this.loadData(val);
      return val;
    },
    districts(val) {
      return val;
    },
    leaderpostlevels(val) {
      return val;
    }
  },
  computed: {
    //行政核定数最大值
    xzhdsMax() {
      let max = this.getMax(['xzbm', 'hds']);
      return max;
    },
    //行政实有数最大值
    xzsysMax() {
      let max = this.getMax(['xzbm', 'sys']);
      return max;
    },
    //事业核定数最大值
    syhdsMax() {
      let max = this.getMax(['sydw', 'hds']);
      return max;
    },
    //事业实有数最大值
    sysysMax() {
      let max = this.getMax(['sydw', 'sys']);
      return max;
    },
    districts() {
      let v = this.$store.getters.dict('usermanage.org.district');
      return v;
    },
    leaderpostlevels() {
      let v = this.$store.getters.dict('usermanage.user.leaderpostlevel');
      return v;
    },
  },
  mounted() {
    if(this.districtCode) {
      this.loadData(this.districtCode);
    }
  },
  methods: {
    getPercent(num,total) {
      return (num/total)*100;
    },
    getMax(conditions) {
      let max = 0;
      forIn(this.data, (value, key)=>{
        if(includes(key, conditions[0])&&includes(key, conditions[1])) {
          if(value>max) {
            max = value;
          }
        }
      });
      return max;
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
    openInfo(zwcc,jgType) {
      let sfsbj = undefined;
      let gecode = undefined;
      if(endsWith(this.districtCode, '01')) {
        gecode = this.getGecode(this.districtCode);
        sfsbj = 1;
      }else{
        let v = this.districtList.filter(item=>item.value==this.districtCode);
        gecode = v[0].value;
        sfsbj = 0;
      }
      let v = this.leaderpostlevels.filter((item)=>item.key == zwcc);
      let zwjb = v[0].value;
      openZwccInfo(gecode,sfsbj,zwjb,jgType);
    },
    loadData(district){
      areaStatistics(district, [
        'xzbmtjjzzhds', 'xzbmtjjzzsys', 
        'xzbmxcjzzhds', 'xzbmxcjzzsys',
        'xzbmxkjzzhds', 'xzbmxkjzzsys',
        'xzbmgjzzhds', 'xzbmgjzzsys',
        'xzbmtjjfzhds', 'xzbmtjjfzsys',
        'xzbmxcjfzhds', 'xzbmxcjfzsys',
        'xzbmxkjfzhds', 'xzbmxkjfzsys',
        'xzbmgjfzhds', 'xzbmgjfzsys',
        'sydwtjjzzhds', 'sydwtjjzzsys',
        'sydwxcjzzhds', 'sydwxcjzzsys',
        'sydwxkjzzhds', 'sydwxkjzzsys',
        'sydwgjzzhds', 'sydwgjzzsys',
        'sydwtjjfzhds', 'sydwtjjfzsys',
        'sydwxcjfzhds', 'sydwxcjfzsys',
        'sydwxkjfzhds', 'sydwxkjfzsys',
        'sydwgjfzhds', 'sydwgjfzsys',
      ]).then(({result}) => {
        this.data = result;
      }).catch(error => {
        showError(error)
      });
    },
  }
}
</script>

<style scoped lang="less">
.container {
  width: 500px;
  height:270px;
  /deep/.ant-carousel {
    display: flex;
    justify-content: center;
    .slick-slider {
      width: 476px;
      padding: 0 @layout-space-base;
      .slick-slide {
        padding: @layout-space-base 0;
        background: fade(#000, 30%);
      }
    }
  }
  z-index: 999;
  .header {
    // width: 456px;
    // margin: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .title {
      display: flex;
      align-items: center;
      color: #707070;
      font-weight: bold;
      &:nth-child(2) {
        span:first-child {
          background: #F88D5F;
        }
      }
      span:first-child {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        margin-right: @padding-xs;
        display: inline-block;
        background: #ED9BF8;
      }
      span {
        &:last-child {
          margin-right: @padding-lg;
        }
      }
    }
  }
  .pro-content {
    // padding: @padding-xs @padding-md;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .detail {
      width: 40%;
      // margin: 0 10px;
      // margin-left: 10px;
      // margin-bottom: @padding-xs/2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-child(2n-1) {
        margin-right: 30px;
      }
      span {
        // flex: 1;
        text-align: left;
        // margin-right: @layout-space-base;
        color: fade(#ffffff, 60%);
      }
      .progress {
        width: 55%;
        /deep/.ant-progress:last-child {
          cursor: pointer;
        }
        /deep/.ant-progress-outer {
          .ant-progress-inner {
            padding: 2.5px @padding-xs/2;  
            // border-radius: @border-radius-base;
            background: fade(#39486A, 94%);
            & .ant-progress-bg {
              height: 5px !important;
              border-radius: 0 !important;
            }
          }
        }
      }
      // &.xz {
      //   /deep/.progress .ant-progress-outer .ant-progress-inner {
      //     background: fade( #83EBFC, 20%);
      //   }
      // }
      // &.sy {
      //   /deep/.progress .ant-progress-outer .ant-progress-inner {
      //     background: fade( #E34C2D, 20%);
      //   }
      // }
    }
  }
}

</style>