<template>
  <span class="input-box">
    <Input v-model="inputValue" v-bind="$attrs"/>  
  </span>
</template>
<script>
import {Input} from 'ant-design-vue'
import { useForm, useField, useFieldSchema } from '@formily/vue'

export default {
  components: {
    Input: Input,
  },
  props: {
    value: {},
    readPretty: Boolean, //阅读态（暂未实现）
  },
  setup(){
    return {
      _formComponentType: 'widget',
      form: useForm(),
      schema: useFieldSchema(),
    }
  },
  data(){
    return {
      inputValue: this.value
    }
  },
  // created(){
  //   console.log(this)
  // },
  watch: {
    inputValue(v){
      this.$emit('change', v);
    },
    value(v){
      this.inputValue = v;
    }
  }
}
</script>
<style lang="less" scoped>
.no-border .input-box{
  /deep/ .ant-input{
    border: none;
    height: 30px;
    outline: none;
    box-shadow: none;
  }
}
</style>