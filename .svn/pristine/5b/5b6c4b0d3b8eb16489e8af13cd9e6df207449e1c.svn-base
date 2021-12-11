<template>
  <div>
    <a-form-item v-if="formLayout != 'horizontal'" :label="name" :required="!!required" :validateStatus="validateStatus">
      <a-tooltip placement="topLeft" :title="help">
        <a-input-number :style="{width:'100%'}" :class="{notEditor:!editor}" v-model="propValue" :disabled="!!disabled" :title="propValue" />
      </a-tooltip>
    </a-form-item>
    <a-form-item v-else :required="!!required" :validateStatus="validateStatus">
    <div class="compact" :class="{notEditor:!editor}">
      <div class="title" :title="name" :class="{required}">{{name}}</div>
      <a-tooltip placement="topLeft" :title="help">
        <a-input-number :style="{width:'100%'}" v-model="propValue" :disabled="!!disabled" :title="propValue" />
      </a-tooltip>
    </div>
    </a-form-item>    
  </div>
</template>
<script>
import { Form, InputNumber } from "ant-design-vue";
import { mixins } from "@formdesign/views/mixin/index";
export default {
  title: "数字框",
  components: {
    AFormItem: Form.Item,
    AInputNumber: InputNumber
  },
  mixins: [mixins],
};
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
  /deep/ .ant-form-item-required::before{
    color: @error-color;
  }  
  .notEditor{
    position: relative;
    &::before{
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 3;
      cursor: not-allowed;
    }
    &:hover{
      border-color: @border-color-base;
    }
  }
  .compact {
    display: flex;
    padding: 4px 0px;
    .title {
      min-width: 5em;
      max-width: 10em;
      text-align: left;
      box-sizing: content-box;
      padding: 0px 11px;
      height: 30px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.75);
      font-size: 14px;
      text-align: center;
      background-color: #fafafa;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.required{
        position: relative;
        &::before{
          display: inline-block;
          color: red;
          font-size: 14px;
          font-family: SimSun, sans-serif;
          line-height: 1;
          content: '*';
          position: absolute;
          left:2px;
          top: 50%;
          transform: translateY(-50%)
        }        
      }
    }
    /deep/ .ant-input-number {
      flex: 1;
      min-width: 0px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }     
}
</style>