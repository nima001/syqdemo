<template>
  <div class="content">
    <horn />
    <div class="title">统计</div>
    <div class="detail">
      <div class="total">
        <span>总数</span>
        <span>19个</span>
      </div>
      <div class="average">
        <span>平均分</span>
        <span>85分</span>
      </div>
    </div>
    <div class="list">
      <div class="first">
        <div class="title">
          <span>优先考虑:</span>
          <span class="num">0</span>
          <span>个</span>
        </div>
        <div class="meter">
          <MeterChart :bgColor="'#0F9328'" :settings="{ color: ['#7be16e'], padding: [0,0,40,0] }" :value="[{ value: 0 }]" :max="20"/>
        </div>
      </div>
      <div class="discretion">
        <div class="title">
          <span>酌情考虑:</span>
          <span class="num">18</span>
          <span>个</span>
        </div>
        <div class="meter">
          <MeterChart :bgColor="'#B56B03'" :settings="{ color: ['#f0e203'], padding: [0,0,40,0] }" :value="[{ value: 18 }]" :max="20"/>
        </div>
      </div>
      <div class="deny">
        <div class="title">
          <span>不考虑:</span>
          <span class="num">1</span>
          <span>个</span>
        </div>
        <div class="meter">
          <MeterChart :bgColor="'#810000'" :settings="{ color: ['#cc0000'], padding: [0,0,40,0] }" :value="[{ value: 1 }]" :max="20"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeterChart from "@person/components/chart/MeterChart";
import horn from "./horn";
export default {
  components: {
    horn,
    MeterChart,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  padding: 0 @padding-md;
  border: 1px solid #0c336d;
  background: fade(#0245a1, 10%);
  display: flex;
  flex-direction: column;
  position: relative;
  background: url('../../../assets/img/screen/assess-halo-bg.png') no-repeat;
  background-position: top;
  & > .title {
    text-align: center;
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 5px;
    color: #fff;
    background: url('../../../assets/img/screen/assess-title-bottom.png') no-repeat;
    background-position: bottom;
  }
  .detail {
    display: flex;
    .total {
      margin-right: 20px;
      font-size: 18px;
      span:first-child {
        color: #fff;
      }
      span:last-child {
        font-size: 25px;
        color: #07dbff;
      }
    }
    .average {
      font-size: 18px;
      span:first-child {
        color: #fff;
      }
      span:last-child {
        font-size: 25px;
        color: #f0e203;
      }
    }
  }
  .list {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      font-weight: 500;
      font-size: 18px;
      letter-spacing: 3px;
      color: #fff;
    }
    .num {
      font-size: 25px;
    }
    /deep/.wrap {
      height: 100%;
    }
    & > div {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      &.first {
        span:first-child {
          padding-left: 10px;
          position: relative;
          &::before {
            width: 4px;
            height: 60%;
            border-radius: 5px;
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            background: #7be16e;
          }
        }
        span:not(:first-child) {
          color: #7be16e;
        }
        .meter {
          flex: 1;
        }
      }
      &.discretion {
        span:first-child {
          padding-left: 10px;
          position: relative;
          &::before {
            width: 4px;
            height: 60%;
            border-radius: 5px;
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            background: #f0e203;
          }
        }
        span:not(:first-child) {
          color: #f0e203;
        }
        .meter {
          flex: 1;
        }
      }
      &.deny {
        span:first-child {
          padding-left: 10px;
          position: relative;
          &::before {
            width: 4px;
            height: 60%;
            border-radius: 5px;
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            background: #cc0000;
          }
        }
        span:not(:first-child) {
          color: #cc0000;
        }
        .meter {
          flex: 1;
        }
      }
    }
  }
}
</style>
