<template>
  <div class="container">
    <div class="body">
      <div class="title">省属事业单位机构编制质效评估</div>
      <div class="opaction">
        <!-- <div class="left">
          <a-input placeholder="请输入：单位名称">
            <a-icon slot="suffix" type="search" />
          </a-input>
        </div> -->
        <div class="left">
          <hexagon :total="[46, 41, 0]" />
        </div>
        <div class="right">
          <a-input v-model="search" placeholder="请输入：单位名称">
            <a-icon slot="suffix" type="search" />
          </a-input>
          <div class="result" v-if="search">
            <div class="head">
              <span :class="{'active-head': headActive==0}" @click="headClick(0)">已评估</span>
              <span :class="{'active-head': headActive==1}" @click="headClick(1)">未评估</span>
              <span :class="{'active-head': headActive==2}" @click="headClick(2)">一票否决</span>
            </div>
            <ul class="body" v-if="headActive>=0">
              <li v-for="(item, index) in List" :key="item" :class="{'active-body': bodyActive==index}" @click="bodyClick(index)">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="display">
        <span class="main">主管部门</span>
        <div>
          <cloud-carousel
            class="inner"
            :bringToFront="true"
            :farScale="0.5"
            :yOrigin="180"
            :yRadius="180"
            :xRadius="480"
            :autoPlay="-1"
            :autoPlayDelay="1500"
            frontItemClass="front"
          >
            <div v-for="item in innerData" :key="item" class="item" @click="()=>$router.push('/person/screen/assessment/list')">
              <a-tooltip placement="top" :mouseEnterDelay="0.5">
                <template slot="title">
                  <span>{{item}}</span>
                </template>
                <span>{{item}}</span>
              </a-tooltip>
            </div>
          </cloud-carousel>
        </div>
        <cloud-carousel
          class="out"
          :autoPlay="1"
          :bringToFront="true"
          :farScale="0.5"
          :yOrigin="200"
          :yRadius="280"
          :xRadius="720"
          :speed="1"
          @changed="changed"
          :autoPlayDelay="1000"
          frontItemClass="front"
        >
          <div v-for="item in outerData" :key="item" class="item" @click="()=>$router.push('/person/screen/assessment/list')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>{{item}}</span>
              </template>
              <span>{{item}}</span>
            </a-tooltip>
          </div>
        </cloud-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Icon } from "ant-design-vue";
import CloudCarousel from "@framework/components/CloudCarousel";
import { Tooltip } from 'ant-design-vue';
import hexagon from "./hexagon";
export default {
  components: {
    hexagon,
    CloudCarousel,
    AIcon: Icon,
    AInput: Input,
    ATooltip: Tooltip,
  },
  data() {
    return {
      search: undefined,
      headActive: undefined,
      bodyActive: undefined,
      List: [
        '省工商联',
        '省社科联',
        '省档案联',
        '省委党校',
        '省委党史和文献研究室',
        "省地方金融监管局",
        "省广电局",
      ],
      innerData: [
        "中共浙江省纪律检查委员会机关",
        "中共浙江省委办公厅",
        "中共浙江省委组织部",
        "中共浙江省委宣传部",
        "中共浙江省委统一战线工作部",
        "中共浙江省委政法委员会",
        "中共浙江省委政策研究室",
        "中共浙江省委全面深化改革委员会办公室",
        "中共浙江省委网络安全和信息化委员会办公室",
        "中共浙江省委机构编制委员会办公室",
        "中共浙江省委军民融合发展委员会办公室",
        "中共浙江省委台湾工作办公室",
        "中共浙江省委直属机关工作委员会",
        "中共浙江省委巡视工作领导小组办公室",
        "中共浙江省委、浙江省人民政府信访局",
        "中共浙江省委老干部局",
        "中共浙江省委机要局",
        "中共浙江省委保密委员会办公室",
        "浙江省人民代表大会常务委员会办公厅",
        "中国人民政治协商会议浙江省委员会办公厅",
        "浙江省总工会",
        "中国共产主义青年团浙江省委员会",
        "浙江省妇女联合会",
        "浙江省科学技术协会",
        "浙江省文学艺术界联合会",
        "浙江省归国华侨联合会",
        "浙江省工商业联合会",
        "浙江省社会科学界联合会",
        "浙江省作家协会",
        "浙江省残疾人联合会",
        "浙江省红十字会",
        "中国国际贸易促进委员会浙江省委员会",
        "浙江省供销合作社联合社",
        "浙江省高级人民法院",
        "浙江省人民检察院",
      ],
      outerData: [
        "省政府办公厅",
        "省发展改革委",
        "省经信厅",
        "省教育厅",
        "省科技厅",
        "省民宗委",
        "省公安厅",
        "省民政厅",
        "省司法厅",
        "省财政厅",
        "省人力社保厅",
        "省自然资源厅",
        "省生态环境厅",
        "省建设厅",
        "省交通运输厅",
        "省水利厅",
        "省农业农村厅",
        "省商务厅",
        "省文化和旅游厅",
        "省卫生健康委",
        "省退役军人事务厅",
        "省应急管理厅",
        "省审计厅",
        "省外事办",
        "省国资委",
        "省市场监管局",
        "省地方金融监管局",
        "省广电局",
        "省体育局",
        "省统计局",
        "省粮食物资局",
        "省医保局",
        "省机关事务局",
        "省人防办（省民防局）",
        "省政府研究室",
        "省大数据局",
        "省能源局",
        "省监狱管理局",
        "省综合指导办",
        "省林业局",
        "省文物局",
        "省药监局",
        "省驻京办",
        "省政府驻沪办",
      ],
    };
  },
  methods: {
    headClick(index) {
      this.headActive = index;
    },
    bodyClick(index) {
      this.bodyActive = index;
    },
    changed(e) {
      // console.log(e,'sd',new Date().getTime())
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .body {
    flex: 1;
    width: 90%;
    display: flex;
    flex-direction: column;
    .title {
      height: 10%;
      font-size: 40px;
      font-weight: bold;
      font-family: cursive;
      color: #fff;
      text-shadow: 0 0 8px #1169a2;
      text-align: center;
      background: url('../../../assets/img/screen/assess-title-bg.png') no-repeat;
      background-position: 50% 65%;
    }
    .opaction {
      display: flex;
      align-items: center;
      .left {
        padding: 0 80px;
        flex: 1;
        .content {
          justify-content: flex-end;
        }
      }
      /deep/.right {
        width: 24%;
        height: 100%;
        .ant-input-affix-wrapper {
          width: 100%;
          margin-top: 50px;
          & input.ant-input {
            width: 100%;
            height: 40px;
            display: inline-block;
            border-color: #0079fe;
            color: fade(#fff, 80%);
            background: transparent;
          }
          & .ant-input-suffix .anticon.anticon-search {
            font-size: 20px;
            color: #1cedf1;
          }
        }
        .result {
          width: 100%;
          margin-top: 2px;
          position: relative;
          .head {
            display: flex;
            span {
              padding: @padding-xs;
              color: #fff;
              text-align: center;
              flex: 1;
              border: 1px #0079fe solid;
              cursor: pointer;
              transition: all .1s;
              &.active-head {
                color: #00FBDB;
                background: #072B66;
              }
            }
          }
          .body {
            width: 100%;
            max-height: 260px;
            overflow-y: auto;
            color: #fff;
            border: 1px #0079fe solid;
            border-top: 0;
            position: absolute;
            background: #091840;
            z-index: 1999;
            li {
              padding: @padding-xs;
              cursor: pointer;
              transition: all .1s;
              &:hover {
                background: #174471;
              }
              &.active-body {
                background: #174471;
              }
            }
          }
        }
      }
    }
    .display {
      flex: 1;
      position: relative;
      .main {
        font-size: 33px;
        font-weight: 400;
        color: #fff;
        letter-spacing: 11px;
        position: absolute;
        left: 50%;
        top: 33%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
      .out {
        color: #fff;
        width: 100%;
        height: 100%;
        max-height: 589px;
        background: url('../../../assets/img/screen/jg-list-bg.png') no-repeat;
        background-size: 100% 100%;
        .item {
          width: 87px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          padding: 2px 3px;
          color: #0FC0CD;
          background: url('../../../assets/img/screen/depart-outerlist-bg.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          user-select: none;
          z-index: 999;
        }
        /deep/.front {
          color: #fff;
          // background: @accent-color;
          // transition: background 1s linear, color 1s linear;
        }
      }
      .inner {
        width: 0;
        height: 0;
        z-index: 999;
        position: absolute;
        top: -20px;
        left: 653px;
        color: #fff;
        overflow: visible;
        transform: translateX(-50%);
        .item {
          width: 87px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          padding: 2px 3px;
          color: #A8B47A;
          background: url('../../../assets/img/screen/depart-innerlist-bg.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          user-select: none;
        }
        /deep/.front {
          color: #fff;
          // background: @accent-color;
          // transition: background 1s linear, color 1s linear;
        }
      }
    }
  }
}
</style>
