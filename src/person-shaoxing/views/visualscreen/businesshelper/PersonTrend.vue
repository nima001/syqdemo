<template>
  <div class="wrap">
    <div class="trendChart">
      <line-chart title="人员入编趋势" :type="1"></line-chart>
    </div>
    <div class="trendChart">
      <line-chart title="人员出编趋势" :type="2"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart";
export default {
  components: { LineChart }
};
</script>
<style lang='less' scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  padding: 0px 18px;
  .trendChart {
    width: 330px;
  }
}
</style>