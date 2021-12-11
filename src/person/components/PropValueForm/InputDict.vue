<template>
  <a-form-item
    :label="property.name"
    :required="!!property.require" 
    :validateStatus="validateStatus"
  >
    <dict-select :dict="property.datasource"
      v-model="propValue"
      :disabled="!!property.disable"
      :allowClear="!property.require"
      :placeholder="property.hint"
      :multiple="!!property.multi"
      :defaultValue="property.defaultvalue"
      :filter="filter"
      :getPopupContainer="getPopupContainer"
      @change="onChange"
      style="width: 100%"
    />
  </a-form-item>
</template>
<script>
import { Form } from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
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
    DictSelect
  },
  data() {
    return {
      validateStatus: undefined,
    };
  },
  computed: {
    code(){
      return this.property.code;
    },
    propValue:{
      get(){
        let data = get(this.value, this.code);
        if(data !== undefined){
          if(this.property.multi){
            if(!Array.isArray(data)){
              data = [data];
              this.propValue = data;
            }
          }else{
            if(Array.isArray(data)){
              data = data[0];
              this.propValue = data;
            }
          }
        }
        return data;
      },
      set(value){
        set(this.value, this.code, value);
        this.$emit('change', this.code, value);
      }
    },
  },
  methods: {
    validateField(obj){
      return new Promise((resolve, reject) => {
        this.validate((error) => {
          if(error){
            reject(error);
          }else{
            //值undefined时设置为null 才会序列化 需要传key 服务器识别情况数据
            set(obj, this.code, this.propValue === undefined ? null : this.propValue);
            resolve();
          }
        })
      });
    },
    validate(callback){
      let status = undefined;//error 验证失败 success成功
      let error = undefined;
      if(!this.property.disable){
        //TODO 数据格式校验
        if(this.property.require && (!this.propValue && this.propValue !== 0)){
          status = 'error';
          error = `请填写${this.property.name || this.code}`;
        }else{
          status = 'success';
        }
      }
      this.validateStatus = status;
      if(callback){
        callback(error);
      }
    },
    onChange(v){
      this.validate();
    },
    filter(item){
      if(this.property.filter){
        return this.property.filter.indexOf(item.key) >= 0;
      }
      return true;
    },
    getPopupContainer(){
      return document.body
    }
  }
};
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>