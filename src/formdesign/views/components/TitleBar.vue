<template>
  <div class="title-bar" :id="code">{{name}}</div>
</template>
<script>

export default {
  title: '一级标题',
  props: {
    name: {
      type: String
    },
    code: {
      type: String
    }
  },
}
</script>
<style lang="less" scoped>
.title-bar {
  margin: 10px 0;
  line-height: 1em;
  border-left: 5px solid @primary-color;
  font-size: 18px;
  text-indent: 5px;
  color: @primary-color;
}
</style>