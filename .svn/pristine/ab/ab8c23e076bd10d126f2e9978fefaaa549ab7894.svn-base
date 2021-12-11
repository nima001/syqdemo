<template>
  <a-form-item
    :label="property.name"
    :required="!!property.require" 
  >
    <a-select
      :value="propValue ? 1 : 0"
      :disabled="!!property.disable"
      @change="onChange"
    >
      <a-select-option :value="1">是</a-select-option>
      <a-select-option :value="0">否</a-select-option>
    </a-select>
  </a-form-item>
</template>
<script>
import { Form, Select } from "ant-design-vue";
import get from 'lodash/get';
import set from 'lodash/set';

export default {
  props: {
    property: {
      type: Object,
    },
    value:{
      type: Object,
    },
  },
  components: {
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  computed:{
    code(){
      return this.property.code;
    },
    propValue:{
      get(){
        return get(this.value, this.code);
      },
      set(value){
        set(this.value, this.code, value)
        this.$emit('change', this.code, value);
      }
    }
  },
  methods: {
    onChange(value){
      this.propValue = !!value;
    },
    validateField(obj){
      if(this.property.disable){
        return Promise.resolve();
      }else{
        set(obj, this.code, this.propValue)
        return Promise.resolve();
      }
    },
  }
};
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>