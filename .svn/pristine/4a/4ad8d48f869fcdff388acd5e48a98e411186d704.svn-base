
<template>
  <div class="content">
    <p class="title">绍兴市行政服务中心</p>
    <div class="layout">
      <div class="left">
        <matter-handle></matter-handle>
        <hall-people></hall-people>
      </div>
      <div class="middle">
        <center-list></center-list>
        <Map></Map>
      </div>
      <div class="right">
        <hall-info></hall-info>
        <BusinessInfo></BusinessInfo>
      </div>
    </div>
  </div>
</template>
<script>
import CenterList from "./components/monitor/CenterList";
import MatterHandle from './components/monitor/MatterHandle';
import HallPeople from './components/monitor/HallPeople';
import HallInfo from './components/monitor/HallInfo';
import BusinessInfo from './components/monitor/BusinessInfo';
import Map from "./components/monitor/Map";
export default {
  components: { CenterList ,Map,MatterHandle,HallPeople,HallInfo,BusinessInfo},
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.content {
  margin-top: -10px;
  .title {
    text-align: center;
    margin: 0px;
    font-family: Alibaba;
    font-size: 24px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    line-height: 33px;
    color: #ffffff;
    text-shadow: 0px 3px 4px rgba(43, 255, 255, 0.4);
    letter-spacing: 5px;
    opacity: 1;
  }
  .layout {
    display: flex;
    margin-top: 20px;
    .left {
      width: 342px;
    }
    .middle {
      flex: 1;
      min-width: 0px;
      margin: 0px 15px;
    }
    .right {
      width: 342px;
    }
  }
}
</style>