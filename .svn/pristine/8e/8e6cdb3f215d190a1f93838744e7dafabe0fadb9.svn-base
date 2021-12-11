<template>
  <div v-cloak>
    <div class="content">
      <div class="tab">
        <span @click="get(2)" :class="{red:dbcolor}">待办</span>
        <span @click="get(4)" :class="{red:zbcolor}">在办</span>
        <span @click="get(3)" :class="{red:ybcolor}">办结</span>
        <span @click="get(1)" :class="{red:cgcolor}">草稿箱</span>
      </div>
      <div class="view">
        <waiting-processing v-if="type==2"></waiting-processing>
        <processing v-if="type==4"></processing>
        <already-processed v-if="type==3"></already-processed>
        <draft-process v-if="type==1"></draft-process>
      </div>
    </div>
  </div>
</template>
<script>
import WaitingProcessing from "./components/WaitingProcessing"
import Processing from "./components/Processing"
import AlreadyProcessed from "./components/AlreadyProcessed"
import DraftProcess from "./components/DraftProcess"
export default {
  name: "ThinkBank",
  data() {
    return {
      dbcolor: true,
      zbcolor: false,
      ybcolor: false,
      cgcolor: false,
      type:2
    };
  },
  created() {},
  components: {
    WaitingProcessing,
    Processing,
    AlreadyProcessed,
    DraftProcess
  },
  methods: {
    get(type) {
      this.type=type;
      //tab颜色变化
      if (type == 2) {
        //待办
        this.dbcolor = true;
        this.ybcolor = false;
        this.cgcolor = false;
        this.zbcolor = false;
      } else if (type == 3) {
        // 已办
        this.dbcolor = false;
        this.ybcolor = true;
        this.cgcolor = false;
        this.zbcolor = false;
      } else if (type == 4) {
        //在办
        this.dbcolor = false;
        this.ybcolor = false;
        this.cgcolor = false;
        this.zbcolor = true;
      } else {
        //草稿
        this.dbcolor = false;
        this.ybcolor = false;
        this.cgcolor = true;
        this.zbcolor = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.red {
  color: #d60002;
}
.content {
  margin: 12px;
  background: #fff;
  padding: 24px 24px;
  .tab {
    span {
      cursor: pointer;
      padding: 0 10px;
      border-right: 1px solid #c6c6c6;
    }
    :last-child {
      border: 0;
    }
  }
  .view {
    overflow: hidden;
    justify-content: left;
    margin-top: 15px;
  }
}
</style>