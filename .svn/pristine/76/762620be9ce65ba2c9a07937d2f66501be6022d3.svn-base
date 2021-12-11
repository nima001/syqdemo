<template>
  <div class="list">
    <ul class="toplist">
      <li @click="bookModal = true" :style="{cursor:'pointer'}">
        <span class="text">预约量</span>
        <span class="num">15</span>
      </li>
      <li @click="takeModal = true" :style="{cursor:'pointer'}">
        <span class="text">取号量</span>
        <span class="num">1560</span>
      </li>
      <li>
        <span class="text">办事量</span>
        <span class="num">1485</span>
      </li>
      <li>
        <span class="text">等候人数</span>
        <span class="num">21</span>
      </li>
      <li>
        <span class="text">满意度</span>
        <span class="num">100%</span>
      </li>
      <li>
        <span class="text">投诉量</span>
        <span class="num">8</span>
      </li>
    </ul>
    <ul class="bottomList">
      <li>
        <span class="title">平均等候时长</span>
        <span class="num">00:80:15</span>
      </li>
      <li>
        <span class="title">平均办理时长</span>
        <span class="num">00:15:43</span>
      </li>
    </ul>
    <dialog-box v-model="bookModal" title="预约量">
      <book-number></book-number>
    </dialog-box>
    <dialog-box v-model="takeModal" title="取号量">
      <take-number></take-number>
    </dialog-box>
  </div>
</template>

<script>
import DialogBox from "../DialogBox";
import BookNumber from "./BookNumber";
import TakeNumber from "./TakeNumber";
export default {
  components: { DialogBox, BookNumber, TakeNumber },
  data() {
    return {
      bookModal: false,
      takeModal: false
    };
  }
};
</script>
<style lang='less' scoped>
.list {
  .toplist {
    width: 687px;
    height: 133px;
    margin: 0px auto;
    display: flex;
    padding: 25px 0px;
    justify-content: space-between;
    background: url("../../assets/img/list.png") no-repeat center center;
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      flex: 1;
      min-width: 0px;
      position: relative;
      &::after {
        content: "";
        width: 1px;
        height: 32px;
        background: #2bffff;
        opacity: 0.6;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
      }
      &:last-child {
        &::after {
          width: 0px;
        }
      }
      .text {
        font-family: Alibaba;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #ffffff;
        text-shadow: 0px 0px 16px rgba(28, 28, 30, 0.95);
        opacity: 0.8;
      }
      .num {
        font-family: D-DINExp;
        font-size: 36px;
        font-weight: 400;
        line-height: 39px;
        color: #2bffff;
        opacity: 1;
        margin-top: 5px;
      }
    }
  }
  .bottomList {
    display: flex;
    justify-content: space-between;
    width: 560px;
    margin: 0 auto;
    margin-top: -12px;
    li {
      width: 276px;
      height: 75px;
      text-align: center;
      background: url("../../assets/img/item.png") no-repeat center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        height: 22px;
        font-size: 16px;
        font-family: Alibaba;
        font-weight: 400;
        line-height: 22px;
        color: #ffffff;
        text-shadow: 0px 0px 16px rgba(28, 28, 30, 0.95);
        opacity: 0.8;
      }
      .num {
        font-family: DINExp;
        height: 39px;
        font-size: 36px;
        font-weight: 400;
        line-height: 39px;
        color: #2bffff;
        opacity: 1;
      }
    }
  }
}
</style>