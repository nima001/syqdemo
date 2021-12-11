<template>
  <div class="process-count">
    <div class="top">
      <div class="count running">
        <span class="num">{{runing}}</span>
        <span class="title">运行中</span>
      </div>
    </div>
    <div class="bottom">
      <div class="count">
        <span class="num">{{todayaplly}}</span>
        <span class="title">今日发起</span>
      </div>
      <div class="count">
        <span class="num">{{todaydeal}}</span>
        <span class="title">今日办结</span>
      </div>
      <div class="count">
        <span class="num">{{allapply}}</span>
        <span class="title">累计发起</span>
      </div>
      <div class="count">
        <span class="num">{{alldeal}}</span>
        <span class="title">累计办结</span>
      </div>
    </div>
    <div class="totalTitle">流程总量（实时）</div>
  </div>
</template>

<script>
import { getProcessNum } from "@/workflow/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  data() {
    return {
      runing: 0,     //运行中
      todayaplly: 0, //今日发起
      todaydeal: 0,  //今日办结
      allapply: 0,   //累计发起
      alldeal: 0     //累计办结
    };
  },
  props:["timer"],
  computed:{
    flag(){
      return this.timer;
    }
  },
  watch:{
    flag(newval,oldval){
      this.get();
    }
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      getProcessNum()
        .then(res => {
          this.runing = res.result.runing;
          this.todayaplly = res.result.todayaplly;
          this.todaydeal = res.result.todaydeal;
          this.allapply = res.result.allapply;
          this.alldeal = res.result.alldeal;
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.process-count {
  height: 330px;
  padding-top: 30px;
  position: relative;
  .top {
    text-align: center;
    .running {
      .num {
        font-size: 38px;
      }
    }
  }
  .count {
    text-align: center;
    span {
      display: block;
      &.num {
        font-size: 32px;
        font-weight: bold;
        color: #29d;
      }
      &.title {
        color: gray;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    > div {
      margin: 0 20px;
    }
  }
  .totalTitle {
    position: absolute;
    bottom: 30px;
    font-size: 18px;
    font-weight: bold;
    left: 50%;
    margin-left: -80px;
  }
}
</style>