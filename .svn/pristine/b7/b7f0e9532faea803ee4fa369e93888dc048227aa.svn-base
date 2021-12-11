<!-- 用户信息中心页面 -->
<template>
  <div class="body">
    <div class="header">
      <a-icon type="user" />
      <h1>您好，{{userName}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    userName(){
      return this.$store.getters.session.username
    }
  }
};
</script>
<style lang='less' scoped>
</style>