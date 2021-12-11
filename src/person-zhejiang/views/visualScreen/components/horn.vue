<template>
  <div>
    <div class="image-border image-border1"></div>
    <div class="image-border image-border2"></div>
    <div class="image-border image-border3"></div>
    <div class="image-border image-border4"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.image-border {
  position: absolute;
  width: 8px;
  height: 8px;
}
.image-border1 {
  top: 0;
  left: 0;
  border-left: 2px solid #208cfb;
  border-top: 2px solid #208cfb;
}
.image-border2 {
  top: 0;
  right: -2px;
  border-right: 2px solid #208cfb;
  border-top: 2px solid #208cfb;
}
.image-border3 {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid #208cfb;
  border-left: 2px solid #208cfb;
}
.image-border4 {
  bottom: 0;
  right: -2px;
  border-right: 2px solid #208cfb;
  border-bottom: 2px solid #208cfb;
}
</style>
