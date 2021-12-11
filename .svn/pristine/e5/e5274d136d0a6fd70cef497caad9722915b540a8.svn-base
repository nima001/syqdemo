<template>
  <span class="select-box" :class="{'readonly': readOnly}">
    <dict-select :value="inputValue" 
      v-bind="$attrs" 
      :disabled="disabled || readOnly" 
    />
  </span>
</template>
<script>
import DictSelect from '@framework/components/DictSelect'
import { useForm, useField, useFieldSchema } from '@formily/vue'

export default {
  components: {
    DictSelect
  },
  props: {
    value: {
      type: [String, Number, Array],
    },
    readOnly: Boolean, //只读模式（不同禁用状态，只读状态下可以获取焦点）
    disabled: Boolean, //禁用
    readPretty: Boolean, //阅读态（暂未实现）
  },
  setup(){
    return {
      _formComponentType: 'widget',
      form: useForm(),
      schema: useFieldSchema(),
    }
  },
  computed: {
    inputValue: {
      get(){
        return this.value;
      },
      set(v){
        this.$emit('change', v);
      }
    }
  },
}
</script>
<style lang="less" scoped>
.select-box.readonly{
  /deep/.ant-select-disabled{
    color: @text-color;
    .ant-select-selection{
      background: @white;
      cursor: pointer;
      &:hover{
        border-color: @primary-color;
      }
    }
    .ant-select-selection--multiple .ant-select-selection__choice{
      color: @text-color;
      background: @background-color-light;
    }
  } 
}
.no-border .select-box{
  /deep/ .ant-select-selection{
    border: none;
    box-shadow: none;
    outline: none;
    &.ant-select-selection--single{
      height: 30px;
    }
    &.ant-select-selection--multiple{
      min-height: 30px;
    }
  }
}
</style>