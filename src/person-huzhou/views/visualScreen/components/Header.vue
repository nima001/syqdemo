<template>
  <div class="screen-header">
    <div class="logo">
      <img src="../../../assets/img/screen/logo.png">
    </div>
    <div class="title">湖州市党政机构编制运行质效评估系统</div>
    <div class="space"></div>
    <div class="nav"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.screen-header{
  height: 72px;
  // background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(84, 84, 84, 0) 100%);
  background: fade(#7E88A1, 30%);
  display: flex;
  .logo{
    flex: none;
    margin: 0 15px 0 20px;
    line-height: 72px;
    img{
      width: 32px;
      height: 32px;
      object-fit: contain;
      vertical-align: middle;
    }
  }
  .title{
    flex: none;
    font-size: 26px;
    font-weight: bold;
    line-height: 72px;
    color: #FFFFFF;
    letter-spacing: 6px;
  }
  .space{
    flex: none;
    width: 44px;
    height: 100%;
    margin-left: 30px;
    background: linear-gradient(270deg, rgba(125, 137, 164, 0) 0%, rgba(24, 49, 83, 0.42) 100%);
  }
  .nav{
    flex: auto;
  }
}
</style>