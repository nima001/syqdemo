<template>
  <div class="screen-card">
    <div class="screen-card-header">{{title}}</div>
    <div class="screen-card-body">
      <slot/>
    </div>
    <div class="screen-card-adorn top"></div>
    <div class="screen-card-adorn bottom"></div>
  </div>
</template>
<script>

export default {
  props: {
    title: String
  }
}
</script>
<style lang="less" scoped>
.screen-card{
  position: relative;
  padding-top: 48px;
  background: fade(#30555B, 20%);
  height: 100%;
  border-right: 2px solid fade(#30555B, 30%);
}
.screen-card-header{
  height: 48px;
  margin-top: -48px;
  color: fade(#00FFEA, 80%);
  padding: 10px 20px;
  line-height: 28px;
  font-size: 18px;
  position: relative;
  &::before{
    content: ' ';
    width: 7px;
    height: 20px;
    display: inline-block;
    vertical-align: text-bottom;
    background: url('../../../assets/img/screen/title-adorn-icon.png') no-repeat;
    margin-right: 8px;
  }
}
.screen-card-body{
  height: 100%;
}
.screen-card-adorn{
  position: absolute;
  left: 3px;
  width: 6px;
  height: 6px;
  border: 1px solid #43A7B7;
  &.top{
    border-right: none;
    border-bottom: none;
    top: 3px;
  }
  &.bottom {
    border-right: none;
    border-top: none;
    bottom: 3px;
  }
}
</style>