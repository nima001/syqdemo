<template>
  <a-form-item
    :label="property.name"
    :required="!!property.require" 
    :validateStatus="validateStatus"
  >
    <a-date-picker style="width:100%"
      :disabled="!!property.disable"
      v-model="propValue"
      :placeholder="property.hint"
      @change="onChange"
    />
  </a-form-item>
</template>
<script>
import { Form, DatePicker } from "ant-design-vue";
import moment from "moment";
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
    ADatePicker: DatePicker
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
        let d = get(this.value, this.code);
        return d && moment(d);
      },
      set(value){
        set(this.value, this.code, value);
        this.$emit('change', this.code, value);
      }
    }
  },
  methods: {
    validateField(obj){
      return new Promise((resolve, reject) => {
        this.validate((error) => {
          if(error){
            reject(error);
          }else{
            set(obj, this.code, this.propValue)
            resolve();
          }
        })
      });
    },
    validate(callback){
      let status = undefined;//error 验证失败 success成功
      let error;
      if(!this.property.disable){
        //TODO 数据格式校验
        if(this.property.require && !this.propValue){
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
    onChange(){
      this.validate();
    }
  }
};
</script>
<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>