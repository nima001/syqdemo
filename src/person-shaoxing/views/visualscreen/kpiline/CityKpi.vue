<template>
  <div class="view">
    <div class="top">
      <ul class="tree">
        <li
          v-for="(item,index) in districtList"
          :key="index"
          :class="{active: dictId == item.value}"
          @click="switchTab(item)"
        >
          <span class="icon"><icon/></span>
          <span class="name">{{item.text}}</span>
        </li>
      </ul>
      <div class="content">
        <div class="borderBar left"></div>
        <div class="borderBar right"></div>
        <div class="kpiWrap">
          <div class="kpi_diamond"></div>
          <div class="kpiCount kpiOrg">
            <span class="name">机构</span>
            <span class="num">{{kpiResult.jgzb | numbers}}</span>
          </div>
          <div class="kpiCount kpiQuestion">
            <span class="name">问题</span>
            <span class="num">{{kpiResult.wtzb | numbers}}</span>
          </div>
          <div class="kpiCount ybQuestion">
            <span class="name">用编</span>
            <span class="num">{{kpiResult.ybzb | numbers}}</span>
          </div>
          <div class="kpiCount bzQuestion">
            <span class="name">核编</span>
            <span class="num">{{kpiResult.hbzb | numbers}}</span>
          </div>
          <div class="kpiCount zsQuestion">
            <span class="name">职数</span>
            <span class="num">{{kpiResult.zszb | numbers}}</span>
          </div>
          <div class="kpiCount jjQuestion">
            <span class="name">经济</span>
            <span class="num">{{kpiResult.jjzb | numbers}}</span>
          </div>
          <div class="kpiCount multipleKpi">
            <span class="name">综合绩效</span>
            <div class="yjChar" @click="detail.show = true">
              <lcd-font :length="3" :realNumber="kpiResult.zhjx | numbers" :precision="1"></lcd-font>
            </div>
          </div>
        </div>
        <div class="salver-wrapper">
          <div class="salver"></div>
        </div>
        <org-swiper></org-swiper>
      </div>
    </div>
    <split-line/>
    <div class="welfare">
      <div class="schoolWelfare">
        <school-welfare></school-welfare>
      </div>
      <div class="hospitalWelfare">
        <hospital-welfare></hospital-welfare>
      </div>
    </div>
    <dialog-box v-model="detail.show" :title="districtName + '机构绩效评估详情'" :destroyOnClose="true">
      <kpi-detail :id="dictId" type="qy" />
    </dialog-box>
  </div>
</template>
<script>
import Icon from "./Icon";
import LcdFont from "../components/LcdFont";
import HospitalWelfare from "./HospitalWelfare";
import SchoolWelfare from "./SchoolWelfare";
import SplitLine from '../components/SplitLine.vue';
import DialogBox from "../components/DialogBox";
import KpiDetail from "./KpiDetail";
import { mixins } from "../components/minxin";
import { areaStatistics } from "@/person-shaoxing/api/orgStaffReport";
import OrgSwiper from "./OrgSwiper";
import { showError } from "@/framework/utils/index";

export default {
  mixins: [mixins],
  components: {
    Icon,
    LcdFont,
    HospitalWelfare,
    SchoolWelfare,
    DialogBox,
    KpiDetail,
    DialogBox,
    OrgSwiper,
    SplitLine
  },
  data() {
    return {
      detail: {
        show: false
      },
      kpiResult: {}
    };
  },
  computed:{
    districtList(){
      return this.$store.getters.dict('usermanage.org.district')
    },
  },
  filters: {
    numbers(value) {
      if (!value) {
        return 0;
      } else {
        return Number(value.toFixed(1));
      }
    }
  },
  mounted() {
    this.getCityInfo(this.dictId);
  },
  methods: {
    switchTab(item) {
      this.dictCode.dictId = item.value;
    },
    getCityInfo(dictId) {
      areaStatistics(dictId, [
        "zhjx",
        "jgzb",
        "hbzb",
        "zszb",
        "ybzb",
        "wtzb",
        "jjzb"
      ])
        .then(res => {
          this.kpiResult = res.result;
        })
        .catch(err => {
          showError(err);
        });
    }
  },
  watch: {
    dictId(v) {
      this.getCityInfo(v);
    }
  }
};
</script>

<style lang='less' scoped>
@keyframes salverRotate{
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.view {
  .top {
    padding: 0px 30px 10px;
    display: flex;
    align-items: center;
    .tree {
      width: 156px;
      margin: 0px;
      li {
        width: 100%;
        height: 40px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 8px 16px;
        position: relative;
        cursor: pointer;
        &.active{
          .name{
            color: darken(#00f7fa, 0%);
          }
          .icon /deep/ path {
            fill: #00f7fa;
          }
        }
        &:hover{
          background-color: #333333b0;
        }
        &::before {
          content: "";
          width: 4px;
          height: 20px;
          background: #323440;
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
        &:first-child {
          margin-top: 0px;
        }
        .icon {
          width: 24px;
          height: 24px;
        }
        .name {
          height: 34px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          margin-left: 12px;
          color: #ffffff;
          text-shadow: 0px 3px 6px rgba(74, 171, 255, 0.16);
          opacity: 0.5;
          letter-spacing: 2px;
        }
      }
    }
    .content {
      flex: 1;
      height: 441px;
      position: relative;
      margin-left: 10px;
      position: relative;
      overflow: hidden;
      .borderBar {
        width: 109px;
        height: 100%;
        position: absolute;
        top: 0px;
        &.left {
          left: 0px;
          background: url("../img/left-border.png") center center no-repeat;
        }
        &.right {
          right: 0px;
          background: url("../img/right-border.png") center center no-repeat;
        }
      }
      .salver-wrapper{
        position: absolute;
        width: 620px;
        height: 620px;
        top: -32px;
        left: 129px;
        transform: perspective(500px) rotateX(78deg) scale(0.9);
        .salver{
          height: 100%;
          background: url("../img/kpi-circle.png") center center no-repeat; 
          animation: salverRotate 15s infinite linear;
        }
      }
      .kpiWrap {
        width: 648px;
        height: 315px;
        position: absolute;
        left: 105px;
        bottom: 50px;
        .kpi_diamond {
          width: 100%;
          height: 100%;
          background: url("../img/kpi-diamond.png") center center no-repeat;
        }
        .kpiCount {
          display: inline-flex;
          flex-direction: column;
          position: absolute;
          .name {
            height: 19px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 19px;
            color: #fff;
            opacity: 0.6;
            text-align: center;
          }
          .num {
            height: 27px;
            font-size: 24px;
            font-family: Arial;
            font-weight: bold;
            line-height: 28px;
            color: #8fc7ff;
            opacity: 1;
            margin-top: 12px;
            text-align: center;
          }
          &.kpiOrg {
            left: 140px;
            top: 20px;
          }
          &.kpiQuestion {
            left: 85px;
            top: 130px;
          }
          &.ybQuestion {
            left: 151px;
            top: 238px;
          }
          &.bzQuestion {
            left: 526px;
            top: 21px;
          }
          &.zsQuestion {
            left: 578px;
            top: 128px;
          }
          &.jjQuestion {
            left: 511px;
            top: 237px;
          }
          &.multipleKpi {
            left: 294px;
            top: 0px;
            .yjChar {
              position: relative;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .welfare {
    padding: 0px 36px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .schoolWelfare,
    .hospitalWelfare {
      width: 625px;
    }
  }
}
</style>