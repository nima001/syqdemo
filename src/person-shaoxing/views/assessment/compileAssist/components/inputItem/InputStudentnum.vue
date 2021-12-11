<template>
  <div>
    <a-form-item 
      label="学生数"
      :required="true" 
      :validateStatus="validateStatus"
      :label-col="itemLayout.labelCol" 
      :wrapper-col="itemLayout.wrapperCol"
      >
      <a-input-number
        style="width: 100%"
        v-model="propValue"
        @change="onChange"
        :max="9999999"
        :min="0"
        :step="1"
        >
      </a-input-number>
    </a-form-item>
  </div>
</template>

<script>
import { InputNumber, Form } from "ant-design-vue";
import set from 'lodash/set';
export default {
  props: {
    itemParams: {
      type: Object
    },
    itemLayout: {
      type: Object
    }
  },
  components: { AFormItem: Form.Item, AInputNumber: InputNumber },
  data() {
    return {
      propValue: undefined,
      validateStatus: undefined,
      key: 'studentnum'
    };
  },
  watch: {},
  computed: {},
  created() {
    if (this.itemParams[this.key]) {
      this.propValue = this.itemParams[this.key]
    }
  },
  mounted() {},
  methods: {
    validateField(obj) {
      return new Promise((resolve, reject) => {
        this.validate((error) => {
          if(error) {
            reject(error);
          }else{
            set(obj, this.key, this.propValue);
            resolve();
          }
        })
      })
    },
    validate(callback) {
      let status = undefined, error;
      if(!this.propValue) {
        status = 'error';
        error = `请填写学生数`;
      }else{
        if(this.propValue) {
          status = 'success';
        }else{
          status = 'error';
          error = `学生数格式不正确`;
        }
      }
      this.validateStatus = status;
      if(callback) {
        callback(error);
      }
    },
    onChange() {
      this.validate();
    }
  },
};
</script>
<style lang="less" scoped>
</style>