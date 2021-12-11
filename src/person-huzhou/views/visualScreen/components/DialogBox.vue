<template>
  <div class="dilaog-box" ref="dilaogBox">
    <a-modal 
      :visible="value"
      :footer="null"
      :width="1280"
      :centered="true"
      :closable="false"
      :destroyOnClose="destroyOnClose"
      @cancel="onCancel"
      :bodyStyle="{padding: 0}"
      :getContainer="() => $refs.dilaogBox"
    >
      <div class="dialog-body">
        <a-button class="close-btn" type="link" @click="onCancel"><a-icon type="close"/></a-button>
        <div class="title">{{title}}</div>
        <slot/>
      </div>
      <div class="adorn-footer"></div>
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
    AIcon: Icon,
  },
  props: {
    value: Boolean,
    title: String,
    destroyOnClose: Boolean,
  },
  methods: {
    onCancel(){
      this.$emit('input', false);
    },
  }
}
</script>
<style lang="less" scoped>
@header-height: 78px;
@footer-height: 29px;

.adorn-footer{
  height: @footer-height;
  margin-top: -1px;
  background: url('../../../assets/img/screen/dialog-footer-bg.png');
  background-size: 100% @footer-height;
}
.dialog-body{
  background-color: fade(#060F21, 95%) ;
  clip-path: inset(0 0 0 0 round 25px 25px 0 0);
  .title{
    line-height: @header-height;
    height: @header-height;
    background: fade(#060F21, 95%) url('../../../assets/img/screen/dialog-header-bg.png');
    background-size: 100% @header-height;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 1.4em;
    letter-spacing: 4px;
  }
  .close-btn{
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 26px;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    color: #75a7de;
    &:hover{
      color: lighten(#75a7de, 10%);
    }
  }
}
.dilaog-box{
  /deep/ .ant-modal-content{
    background: unset;
  }
}
</style>