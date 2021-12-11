<template>
  <div class="dilaog-box" ref="dilaogBox">
    <a-modal
      :visible="value"
      :footer="null"
      :width="1206"
      :centered="true"
      :closable="false"
      :destroyOnClose="destroyOnClose"
      @cancel="onCancel"
      :bodyStyle="{padding: 0}"
      :getContainer="() => $refs.dilaogBox"
    >
      <div class="dialog-body">
        <div class="top">
          <span class="title">{{title}}</span>
          <span class="close" @click="onCancel"></span>
        </div>
        <div class="middle">
          <slot></slot>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { Modal, Button, Icon } from "ant-design-vue";

//对话框
export default {
  components: {
    AModal: Modal,
    AButton: Button,
    AIcon: Icon
  },
  props: {
    value: Boolean,
    title: String,
    destroyOnClose: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("input", false);
    }
  }
};
</script>
<style lang="less" scoped>
.dilaog-box {
  /deep/ .ant-modal-content {
    background-color: inherit;
  }
}
.dialog-body {
  width: 1206px;
  height: 684px;
  background: url("../assets/img/dialog.png") no-repeat center center;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    height: 75px;
    position: relative;
    .title {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 75px;
      text-align: center;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: 5px;
      opacity: 1;
    }
    .close {
      width: 43px;
      height: 43px;
      background: url("../assets/img/close.png") no-repeat center center;
      position: absolute;
      right: 25px;
      top: 4px;
      cursor: pointer;
    }
  }
  .middle {
    flex: 1;
    min-height: 0px;
    padding: 0px 30px 40px;
  }
}
</style>