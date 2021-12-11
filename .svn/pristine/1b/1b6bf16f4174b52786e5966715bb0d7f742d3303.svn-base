<template>
  <card title="质效变化机构数">
    <div class="kpi-variation">
      <div class="content">
        <div class="top">
          <div class="up">{{datanum[0]}}</div>
          <div class="keep">{{datanum[1]}}</div>
          <div class="down">{{datanum[2]}}</div>
        </div>
        <div class="bottom">
          <div class="upword">上升</div>
          <div class="keepword">持平</div>
          <div class="downword">下降</div>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import Card from './ScreenCard'

/**
 * 绩效变化机构数
 */
export default {
  components: {
    Card,
  },
  data() {
    return{
      datanum:[5, 47, 6]
    }
  }
}
</script>
<style lang="less" scoped>
.kpi-variation{
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  .content{
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    width: 100%;
    .top{
      display: flex;
      justify-content: space-around;
      font-size: 24px;
      font-family: D-DIN;
      .up{
        width: 72px;
        height: 72px;
        background: url("../../../assets/img/screen/variation-up-bg.png") no-repeat center center;
        background-size: 72px 72px;
        line-height: 62px;
        text-align: center;
    }
      .keep{
        width: 72px;
        height: 72px;
        background: url("../../../assets/img/screen/variation-keep-bg.png") no-repeat center center;
        background-size: 72px 72px;
        line-height: 62px;
        text-align: center;
      }
      .down{
        width: 72px;
        height: 72px;
        background: url("../../../assets/img/screen/variation-down-bg.png") no-repeat center center;
        background-size: 72px 72px;
        line-height: 62px;
        text-align: center;
      }
    }
    .bottom{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      height: 21px;
      margin-top: 10px;
      .upword{
        width: 32px;
        height: 21px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 22px;
        color: #FFFFFF;
        opacity: 0.8;
      }
      .keepword{
        width: 32px;
        height: 21px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 22px;
        color: #FFFFFF;
        opacity: 0.8;
      }
      .downword{
        width: 32px;
        height: 21px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 22px;
        color: #FFFFFF;
        opacity: 0.8;
      }
    }
  }
  
}
</style>