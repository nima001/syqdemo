<template>
  <div>
    <a-form-item 
      label="机构挂牌"
      :required="true" 
      :validateStatus="validateStatus"
      :label-col="itemLayout.labelCol" 
      :wrapper-col="itemLayout.wrapperCol"
      >
      <a-input
        v-model="propValue"
        >
      </a-input>
    </a-form-item>
  </div>
</template>

<script>
import { Input, Form } from "ant-design-vue";
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
  components: { AFormItem: Form.Item, AInput: Input },
  data() {
    return {
      propValue: undefined,
      validateStatus: undefined,
      key: 'orglisted'
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
      if(!this.propValue && this.propValue !== 0) {
        status = 'error';
        error = `请填写机构挂牌`;
      }else{
        if(this.propValue) {
          status = 'success';
        }else{
          status = 'error';
          error = `机构挂牌格式不正确`;
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