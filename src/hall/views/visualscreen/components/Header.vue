<template>
  <div class="header">
    <ul>
      <li :class="{active:value == item.cmpt}" v-for="(item,index) in list" @click="changeTab(item)" :key="index">
        <div class="text">{{item.name}}</div>
      </li>
    </ul>
    <div class="clock">
      <Clock></Clock>
    </div>
  </div>
</template>
<script>
import Clock from "../components/Clock";
export default {
  props: ['value'],
  data() {
    return {
      list: [
        { cmpt: "BusinessMonitor", name: "业务监测" },
        { cmpt: "EffectiveAnalyse", name: "效能分析" }
      ]
    };
  },
  components: { Clock },
  methods:{
    changeTab(item){
      this.$emit('input',item.cmpt)
    }
  }
};
</script>
<style lang='less' scoped>
.header {
  width: 100%;
  height: 88px;
  background: url("../assets/img/header.png") no-repeat center center;
  position: relative;
  ul {
    width: 476px;
    margin: 0px;
    display: flex;
    margin-left: 365px;
    li {
      width: 238px;
      height: 62px;
      text-align: center;
      line-height: 45px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      padding: 0px 16px;
      cursor: pointer;
      &.active {
        background: linear-gradient(
          90deg,
          rgba(54, 201, 243, 0.3) 0%,
          rgba(54, 198, 238, 0) 50%,
          rgba(53, 194, 233, 0.3) 100%
        );
      }
      .text {
        -webkit-box-reflect: below -20px -webkit-linear-gradient(
            transparent 15%,
            hsla(0, 0%, 100%, 0.8)
          );
      }
      &.active {
        .text {
          color: #2bffff;
        }
      }
    }
  }
  .clock {
    width: 140px;
    height: 60px;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>