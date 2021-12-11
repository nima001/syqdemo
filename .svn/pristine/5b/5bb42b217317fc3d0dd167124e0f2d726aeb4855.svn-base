<template>
  <div class="title">
    <div class="body">{{title}}</div>
    <div class="line">
      <div class="facula"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  }
}
</script>
<style lang="less" scoped>
.title{
  .body{
    padding: 12px 0;
    font-size: 20px;
    font-weight: bold;
    line-height: 26px;
    color: rgba(255, 255, 255, 0.8);
  }
  .line{
    position: relative;
    height: 1px;
    margin: 3px 20px;
    background: rgba(0, 227, 252, .6);
    &::before{
      content: "";
      position: absolute;
      top: -3px;
      left: -20px;
      width: 15px;
      height: 6px;
      background: url('../../../assets/img/screen/split-line-dot.png') center center no-repeat;
    }
    &::after{
      content: "";
      position: absolute;
      top: -3px;
      right: -20px;
      width: 15px;
      height: 6px;
      background: url('../../../assets/img/screen/split-line-dot.png') center center no-repeat;
      transform: rotateY(180deg)
    }
    .facula{
      position: absolute;
      width: 344px;
      height: 180px;
      top: -90px;
      left: -125px;
      background: url('../../../assets/img/screen/split-line-facula.png') center center no-repeat;
      // pointer-events: none;
      z-index: -1;
    }
  }
}
</style>