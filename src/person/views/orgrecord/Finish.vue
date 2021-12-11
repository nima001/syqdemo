<template>
  <div class="main-four">
    <div class="submit-success">
      <a-icon type="check-circle" theme="filled" />
      <span class="success-text">提交成功</span>
    </div>
    <div class="type-btn">
      <span class="next-title">台账录入完成，您可以继续以下操作：</span>
      <span class="next-text" type="primary" @click="finish">
        继续录入台账
        <a-icon type="right" />
      </span>
      <span class="next-text" @click="jumpToHistory">
        查看历史台账
        <a-icon type="right" />
      </span>
    </div>
  </div>
</template>
<script>
import {Icon} from 'ant-design-vue';

export default {
  components:{
    AIcon:Icon
  },
  methods: {
    finish() {
      this.$emit('next');
    },
    jumpToHistory() {
      this.$router.push("/orgrecord/history");
    }
  }
};
</script>
<style lang="less" scoped>
.main-four {
  padding: @content-padding-v @content-padding-h;
  .submit-success {
    margin: 0 auto;
    width: 120px;
    height: 200px;
    text-align: center;
    .anticon-check-circle {
      margin: 20px;
      font-size: 80px;
      color: @primary-color;
    }
    .success-text {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .type-btn {
    width: 100%;
    height: 200px;
    background-color: #f8f8f8;
    padding: 40px;
    text-align: center;
    .next-title {
      cursor: pointer;
      display: block;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .next-text {
      cursor: pointer;
      display: block;
      color: #c2c2c2;
      margin-bottom: 10px;
      .anticon-right {
        margin: 0 5px;
      }
    }
  }
}
</style>
