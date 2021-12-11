<template>
  <div class="warn-icon">
    <img src="../../../assets/img/screen/icon-problems-num.png" />
    <div class="aperture"></div>
    <div class="slider"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@icon-size: 36px; 

@keyframes slider{
  to{
    transform: rotate(1turn);
  }
}
@keyframes aperture{
  0%{
    width: 0%;
    height: 0%;
    opacity: 0;
  }
  50%{
    width: 100%;
    height: 100%;
    opacity: .4;
  }
  100%{
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

.warn-icon{
  width: @icon-size;
  height: @icon-size;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .slider{
    position: absolute;
    left: 50%;
    top: -5px/2;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #F5715E;
    transform-origin: 0px (@icon-size+5)/2;
    animation: slider 2s infinite linear;
  }
  .aperture{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 50%;
    background: #F5715E;
    animation: aperture 2s infinite linear;
    // width: 150%;
    // height: 150%;
    // opacity: 1;
  }
}
</style>