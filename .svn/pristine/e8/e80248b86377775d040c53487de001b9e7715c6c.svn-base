<template>
  <div class="title-bar" :id="code">{{title}}</div>
</template>
<script>

export default {
  title: '文档标题',
  props: {
    name: {
      type: String
    },
    code: {
      type: String
    },
    level: [Number, String],
    ordinal: String,
  },
  computed: {
    title(){
      return this.ordinal ? this.ordinal + ' ' + this.name : this.name
    }
  }
}
</script>
<style lang="less" scoped>
.title-bar {
  line-height: 2em;
  margin: 15px 0;
  font-size: 16pt;
  color: black;
  font-family: 黑体,SimHei;
  font-weight: bold;
}
</style>