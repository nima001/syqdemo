<template>
  <div class="clockWrap">
    <div class="top">{{time}}</div>
    <div class="bottom">
      <span class="date">{{date}}</span>
      <span class="week">{{week}}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      date: moment().format("YYYY/MM/DD"),
      time: moment().format("HH:mm:ss"),
      week: moment().format("dddd"),
      timer: null
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.setClock();
    }, 1000);
  },
  methods: {
    setClock() {
      this.date = moment().format("YYYY/MM/DD");
      this.time = moment().format("HH:mm:ss");
      this.week = moment().format("dddd");
    }
  }
};
</script>
<style lang='less' scoped>
.clockWrap {
  .top {
    font-family: DINExp;
    height: 40px;
    font-size: 36px;
    font-weight: 400;
    line-height: 40px;
    color: #01d5ed;
    opacity: 1;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .date {
      height: 20px;
      font-size: 14px;
      font-family: DINExp;
      font-weight: 400;
      line-height: 20px;
      color: #02c2d8;
      opacity: 1;
    }
    .week {
      height: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      color: #02c2d8;
      opacity: 1;
    }
  }
}
</style>