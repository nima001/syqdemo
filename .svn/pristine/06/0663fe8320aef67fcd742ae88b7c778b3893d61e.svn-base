<template>
  <div class="hotTip">
    <div class="hander"></div>
    <div class="dotted"></div>
    <div class="block-one"></div>
    <div class="block-two"></div>
    <div class="block-three"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
@keyframes animation {
  0% {
  }
  70% {
    width: 40px;
    height: 40px;
    opacity: 1;
  }

  100% {
    width: 60px;
    height: 60px;
    opacity: 0;
  }
}
.hotTip {
  position: relative;
}
.hander {
  width: 60px;
  height: 60px;
  background: url("../img/hander.png");
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 14px;
  margin-left: 12px;
}
.dotted {
  width: 8px;
  height: 8px;
  background-color: #248bb5;
  border-radius: 50%;
}
div[class^="block"] {
  position: absolute;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 20px #248bb5;
}
.block-one {
  animation: animation 1s linear 0s infinite;
}
.block-two {
  animation: animation 1s linear 0.4s infinite;
}
.block-three {
  animation: animation 1s linear 0.8s infinite;
}
</style>