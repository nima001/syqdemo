<template>
  <span class='switch-box'>
    <a-switch :checked="inputValue" v-bind="$attrs" @change="onChange"/>
  </span>
</template>
<script>
import { Switch } from 'ant-design-vue'
import { useForm, useField, useFieldSchema } from '@formily/vue'

export default {
  components: {
    ASwitch: Switch,
  },
  props:{
    value: {},
    readOnly: Boolean, //只读模式（不同禁用状态，只读状态下可以获取焦点）Switch没有只读状态需自定义实现
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
      inputValue: this.value,
    }
  },
  watch: {
    value(v){
      this.inputValue = v;
    }
  },
  methods: {
    onChange(v){
      if(!this.readOnly){
        this.$emit('change', v);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.switch-box{
  .ant-switch{
    vertical-align: text-top;
  }
}
</style>