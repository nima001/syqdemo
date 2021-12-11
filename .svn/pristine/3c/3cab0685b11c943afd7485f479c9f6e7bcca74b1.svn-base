<template>
  <div>
    <p :style="index==0?'text-indent:2em':''">{{this.property.content}}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    property: {
      type: Object,
      required: true
    },
    index:{
      type:Number
    }
  },
  created() {
    this.$emit("getData", {
      code: this.property.code,
      item: this.property.content
    });
  }
};
</script>
<style lang="less" scoped>
</style>