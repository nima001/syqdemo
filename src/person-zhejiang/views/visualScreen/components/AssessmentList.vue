<template>
  <div class="container">
    <div class="body">
      <div class="left">
        <AssessList />
      </div>
      <div class="right">
        <Statistics />
      </div>
    </div>
  </div>
</template>
<script>
import AssessList from "./AssessList";
import Statistics from "./Statistics";
export default {
  components: {
    AssessList,
    Statistics,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .body {
    width: 80%;
    margin-bottom: 10px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    .left {
      width: 68%;
    }
    .right {
      width: 30%;
    }
  }
}
</style>
