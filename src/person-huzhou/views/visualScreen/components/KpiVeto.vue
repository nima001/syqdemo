<template>
  <card title="一票否优">
    <div class="kpi-veto">
      <div class="content">
        <div class="title">机构数
          <div class="lt"></div>
          <div class="lb"></div>
        </div>
        <div class="value">
          <div class="num">0</div>
          <div class="rt"></div>
          <div class="rb"></div>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import Card from './ScreenCard'
import echarts from 'echarts'
/**
 * 一票否优
 */
export default {
  components: {
    Card,
  },
}
</script>
<style lang="less" scoped>
  .kpi-veto {
    color: #FFFFFF;
    height: 100%;
    display: flex;
    justify-content: center;
    .content {
      height: 100%;
      display: flex;
      align-items: center;
      width: 100%;
      // padding-left: 10px;
      // padding-right: 10px;
      .title{
      flex: 1;
      background-color: rgba(84, 16, 16, 0.7);
      height: 47px;
      line-height: 46px;
      text-align: center;
      margin-left: 16px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      position: relative;
      .lt{
        position: absolute;
        height: 5px;
        width: 5px;
        top: 0px;
        border-top: 1px solid rgba(246, 43, 43, 1);
        border-left: 1px solid rgba(246, 43, 43, 1);
      }
      .lb{
        position: absolute;
        height: 5px;
        width: 5px;
        bottom: 0px;
        border-bottom: 1px solid rgba(246, 43, 43, 1);
        border-left: 1px solid rgba(246, 43, 43, 1);
      }
    }
    .value{
      flex: 2;
      background-color: rgba(84, 16, 16, 0.3);
      height: 47px;
      position: relative;
      margin-right: 16px;
      .rt{
        position: absolute;
        height: 5px;
        width: 5px;
        top: 0px;
        right: 0px;
        border-top: 1px solid rgba(246, 43, 43, 1);
        border-right: 1px solid rgba(246, 43, 43, 1);
      }
      .rb{
        position: absolute;
        height: 5px;
        width: 5px;
        bottom: 0px;
        right: 0px;
        border-bottom: 1px solid rgba(246, 43, 43, 1);
        border-right: 1px solid rgba(246, 43, 43, 1);
      }
      .num{
        position: absolute;
        right: 20px;
        height: 47px;
        line-height: 46px;
        opacity: 0.8;
        font-size: 24px;
        font-family: D-DIN Exp;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    }

  }
</style>