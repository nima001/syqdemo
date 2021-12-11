<template>
  <div class="wrap">
    <ul class="btnList">
      <li
        v-for="(item,index) in list"
        :class="{active:activeBtn == item.unit}"
        :key="index"
        @click="switchBtn(item)"
      >{{item.unit}}</li>
    </ul>
    <div class="layout">
      <div class="left">
        <average-handle></average-handle>
      </div>
      <div class="middle">
        <satisfied-list></satisfied-list>
        <ul class="list">
          <li>
            <queue-trend></queue-trend>
          </li>
          <li>
            <handle-trend></handle-trend>
          </li>
          <li>
            <satisfied-trend></satisfied-trend>
          </li>
          <li>
            <complain-trend></complain-trend>
          </li>
        </ul>
      </div>
      <div class="right">
        <average-wait></average-wait>
      </div>
    </div>
  </div>
</template>

<script>
import SatisfiedList from "./components/analyse/SatisfiedList";
import AverageHandle from "./components/analyse/AverageHandle";
import AverageWait from "./components/analyse/AverageWait";
import QueueTrend from "./components/analyse/QueueTrend";
import HandleTrend from "./components/analyse/HandleTrend";
import SatisfiedTrend from "./components/analyse/SatisfiedTrend";
import ComplainTrend from "./components/analyse/ComplainTrend";
export default {
  components: {
    SatisfiedList,
    AverageHandle,
    AverageWait,
    QueueTrend,
    HandleTrend,
    SatisfiedTrend,
    ComplainTrend
  },
  data() {
    return {
      activeBtn: "本月",
      list: [
        { unit: "本月", value: 1 },
        { unit: "上月", value: 2 },
        { unit: "本年", value: 3 }
      ]
    };
  },
  methods: {
    switchBtn(item) {
      this.activeBtn = item.unit;
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  margin-top: -5px;
  .btnList {
    width: 550px;
    margin: 0px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    li {
      width: 130px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(54, 201, 243, 0.6) 0%,
        rgba(54, 198, 238, 0) 50%,
        rgba(53, 194, 233, 0.6) 100%
      );
      font-size: 20px;
      font-family: Microsoft YaHei;
      color: #ffffff99;
      border: none;
      border-radius: 5px;
      position: relative;
      border-bottom: 1px solid #2bffff;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
      text-align: center;
      box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      &:active {
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
        top: 1px;
      }
      &.active {
        background: linear-gradient(
          90deg,
          rgba(54, 201, 243, 1) 0%,
          rgba(54, 198, 238, 0) 50%,
          rgba(53, 194, 233, 1) 100%
        );
        color: #2bffff;
      }
    }
  }
  .layout {
    display: flex;
    justify-content: space-between;
    .left {
      width: 300px;
      height: 725px;
      background: url("./assets/img/column.png") no-repeat center center;
      padding: 20px 15px 20px;
    }
    .middle {
      width: 763px;
      .list {
        margin: 20px 0px 0px;
        li {
          width: 371px;
          height: 276px;
          float: left;
          background: url("./assets/img/rect.png") no-repeat center center;
          &:nth-child(2) {
            margin-left: 20px;
          }
          &:nth-child(3) {
            margin-top: 20px;
          }
          &:nth-child(4) {
            margin-top: 20px;
            margin-left: 20px;
          }
        }
      }
    }
    .right {
      width: 300px;
      height: 725px;
      padding: 20px 15px 20px;
      background: url("./assets/img/column.png") no-repeat center center;
    }
  }
}
</style>