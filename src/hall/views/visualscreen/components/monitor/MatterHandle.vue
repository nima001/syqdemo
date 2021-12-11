<template>
  <div class="matters">
    <div class="header">
      <span class="title">事项办理量</span>
      <span class="sub-title">TOP10</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span class="index">{{index+1}}</span>
          <span class="text">{{item.name}}</span>
          <span class="progress">
            <a-progress :percent="item.percenet" :stroke-color="color[index]" :show-info="false" />
          </span>
          <span class="num">{{item.value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Progress } from "ant-design-vue";
export default {
  components: {
    AProgress: Progress
  },
  data() {
    return {
      color: ['#28D4FE','#28D4FE','#28B6FE','#28B6FE','#2897FE','#2897FE','#2879FE','#2879FE','#2879FE','#285AFE'],
      list: [
        { name: "基本医疗保险职工办理事项", percenet: 80, value: 254 },
        { name: "城乡居民基本医疗办理事项", percenet: 76, value: 238 },
        { name: "个人权益记录查看事项办理", percenet: 70, value: 188 },
        { name: "基本医疗保险职工办理事项", percenet: 65, value: 181 },
        { name: "个人权益记录查看事项办理", percenet: 62, value: 163 },
        { name: "基本医疗保险职工办理事项", percenet: 55, value: 162 },
        { name: "参保人员信息查询事项办理", percenet: 50, value: 147 },
        { name: "参保人员信息查询事项办理", percenet: 48, value: 141 },
        { name: "出生一件事办理信息查询", percenet: 45, value: 131 },
        { name: "参保人员信息查询事项办理", percenet: 40, value: 95 }
      ]
    };
  }
};
</script>
<style lang='less' scoped>
.matters {
  width: 100%;
  height: 372px;
  background: url("../../assets/img/left-block.png") no-repeat center center;
  .header {
    width: 100%;
    height: 44px;
    display: flex;
    padding: 0px 16px;
    .title {
      font-size: 18px;
      line-height: 44px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.8;
    }
    .sub-title {
      font-size: 22px;
      line-height: 44px;
      font-family: D-DINExp;
      font-weight: 400;
      color: #2bffff;
      opacity: 1;
      margin-left: 2px;
    }
  }
  .content {
    height: 320px;
    padding-top: 25px;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0px 15px;
      li {
        display: flex;
        justify-content: space-between;
        .index {
          width: 20px;
          font-size: 20px;
          font-family: D-DIN;
          font-weight: normal;
          color: #ffffff;
          opacity: 1;
        }
        .text {
          width: 125px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .progress {
          width: 80px;
          /deep/.ant-progress-inner {
            background: rgba(40, 212, 254, 0.2);
          }
        }
        .num {
          font-size: 20px;
          font-family: D-DIN;
          font-weight: 400;
          color: #3fcece;
          opacity: 1;
        }
      }
    }
  }
}
</style>