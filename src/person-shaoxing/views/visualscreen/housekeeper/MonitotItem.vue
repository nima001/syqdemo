<template>
  <div class="cell">
    <div class="cellItem" v-for="(lg,index) in list" :key="index">
      <p>{{lg.name}}</p>
      <template v-if="index% 2!= 0">
        <lcd-font :length="4" :realNumber="lg.number" :realStyle="realStyle"></lcd-font>
      </template>
      <template v-else>
        <lcd-font :length="4" :realNumber="lg.number"></lcd-font>
      </template>
    </div>
  </div>
</template>

<script>
import LcdFont from "../components/LcdFont";
export default {
  name: "monitorItem",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      realStyle: {
        color: "#FFD3A3",
        textStroke: "1 #ECA066"
      }
    };
  },
  components: {
    LcdFont
  }
};
</script>
<style lang='less' scoped>
.cell {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: initial;
  height: 100%;
  padding: 0px 16px;
  .cellItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      height: 22px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: #ffffff;
      opacity: 0.8;
      margin-bottom: 10px;
    }
  }
}
</style>