<template>
  <div class="title">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Title"
};
</script>
<style lang="less" scoped>
.title {
  color: #000;
  padding-bottom: 15px;
  font-size: 20px;
  text-align: center;
}
</style>

